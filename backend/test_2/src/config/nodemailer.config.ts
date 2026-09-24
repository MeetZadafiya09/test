import nodemailer from "nodemailer";
import { EMAIL_USER, EMAIL_PASSWORD, EMAIL_HOST } from "../app.config.js";


const transporter = nodemailer.createTransport({
    host: EMAIL_HOST,
    port: 587,
    secure: false,
    auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASSWORD
    },
    tls: {
        rejectUnauthorized: false,
    }
});



export default transporter;