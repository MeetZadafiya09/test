import express, { type Router } from 'express'
import otpController from '../controllers/otp.controller.js';

const otpRouter: Router = express.Router();

otpRouter
    .post('/send-otp', otpController.sendOTP)


export default otpRouter;
