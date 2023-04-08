import express from 'express';
import * as UserController from '../controllers/users';

const route = express.Router();

route.get('/', UserController.getAuthenticatedUser);
route.post('/signup', UserController.singUp);
route.post('/login', UserController.login);
route.post('/logout', UserController.logout);

export default route;