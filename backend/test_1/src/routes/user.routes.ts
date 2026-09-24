import express, { type Router } from 'express'
import userController from '../controllers/user.controller.js';

const userRouter: Router = express.Router();

userRouter
    .get('/user/:id', userController.getUser)
    .post('/user/:id', userController.addUser)
    .patch('/user/:id', userController.updateUser)
    .delete('/user/:id', userController.deleteUserField)


export default userRouter;
