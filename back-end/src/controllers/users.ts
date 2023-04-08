import { RequestHandler } from "express";
import createHttpError from "http-errors";
import UserModel from '../models/user';
import bcrypt from 'bcrypt';

export const getAuthenticatedUser: RequestHandler = async (req, res, next) => {
    const authenticatedUser = req.session.userId;
    console.log("session -> ", authenticatedUser);
    try {
        console.log("this is the session we trying to get ", req.session.userId);
        const user = await UserModel.findById(req.session.userId).select("+email").exec();
        console.log("backend ->", user);
        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
}

interface singUpBody {
    username?: string,
    password?: string,
    email?: string, 
}

export const singUp: RequestHandler<unknown, unknown, singUpBody, unknown> = async (req, res, next) => {
    const username = req.body.username;
    const email = req.body.email;
    const passwordRaw = req.body.password;
    
    try {
        
        if(!username) {
            throw createHttpError(400, 'username missing');
        }
        if(!email) {
            throw createHttpError(400, "email missing");
        }
        if(!passwordRaw) {
            throw createHttpError(400, "paswword missing");
        }
        const existingUsername = await UserModel.findOne({ username: username}).exec();
        if (existingUsername) {
            throw createHttpError(409, "Username already taken. Please choose another one or log in instead.");
        }
        const existingEmail = await UserModel.findOne({ email: email}).exec();
        if(existingEmail) {
            throw createHttpError(409, "A user with that email address already exists. Please log in instead.");
        }
        const passwordHashed = await bcrypt.hash(passwordRaw, 10);

        const newUser = await UserModel.create({
            username: username,
            email: email,
            password: passwordHashed,
        });

        req.session.userId = newUser._id;
        // res.status(201).json({User: newUser, sessionInfo: req.session.userId});
        res.status(201).json(username);
    } catch (error) {
        next(error); 
    }
};

interface LoginBody {
    username?: string,
    password?: string,
}

export const login: RequestHandler<unknown, unknown, LoginBody, unknown> =async (req, res, next) => {
    
    const username = req.body.username;
    const password = req.body.password;

    try {
        if(!username || !password) {
            throw createHttpError(400, "Parameters missing")
        }
        const user = await UserModel.findOne({username: username}).select("+password +email").exec();
        //.select is because we put condtion that go send password and email (setter and getter like stuff)
        // so we are chceking it with that
        if(!user) {
            throw createHttpError(401, "Invailid Credentials");
        }
        
        const passwordMatch = await bcrypt.compare(password, user.password);
        if(!passwordMatch) {
            throw createHttpError(401, "Invailid Credentials");
        }
        // setting session 
        req.session.userId = user._id;
        console.log("session set up ", req.session.userId);
        // res.status(201).json({User: user, sessionInfo: req.session.userId});
        res.status(201).json(user);

    } catch (error) {
        next(error);
    }
};

export const logout: RequestHandler = (req, res, next) => {

    console.log("reading session -> ", req.session);
    req.session.destroy(error => {
        if(error) {
            next(error);
        } else {
            res.sendStatus(200);
        }
    });
};