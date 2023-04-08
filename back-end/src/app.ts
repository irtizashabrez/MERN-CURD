import 'dotenv/config';
import express, { NextFunction, Request, Response } from 'express';
import notesRoutes from './routes/notes';
import userRoutes from './routes/users';
import morgan from 'morgan';
import createHttpError, { isHttpError } from 'http-errors';
import cors from 'cors';
import session from 'express-session';
import env from './util/validateEnv';
import MongoStore from 'connect-mongo';

const app = express();

//use to log the endpoints 
app.use(morgan('dev'));

// set express so that we send and receive josn endponits to the server
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173', 
}));
// this is to set up session for auth
app.use(session({
    secret: env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 60 * 1000,
        // httpOnly: true,
        // sameSite: 'strict'
        httpOnly: true,
    },
    rolling: true,
    store: MongoStore.create({
        mongoUrl: env.MONGO_CONNECTION_STRING
    }),
}));



app.use('/api/users', userRoutes);
app.use('/api/notes', notesRoutes); 

//this is we hit routes that does not exits and it has to to on top of error catch
app.use((req, res, next) => {
    // next(Error("Endpoint not found"));
    next(createHttpError(404, "Endpoint not found"));
});

//this is so that we don't have to write catch block again and again
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
    console.log(error);
    let errorMessage = "An unknow error occurs";
    let statusCode = 500;
    if(isHttpError(error)) {
        statusCode = error.status;
        errorMessage = error.message;
    }
    res.status(statusCode).json({error: errorMessage});
});

export default app;