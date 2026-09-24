import express, { type Router } from 'express'
import emailController from '../controllers/email.controller.js';
const emailRouter: Router = express.Router();

emailRouter
    .post('/emails', emailController.addEmails)
    .get('/emails',emailController.receiveEmail)


export default emailRouter;
