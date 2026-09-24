import { createTransport } from 'nodemailer';
import { EMAIL_HOST, EMAIL_PASSWORD, EMAIL_PORT, EMAIL_USER } from '../app.config.js';

const emailTransporter = createTransport({
    host: EMAIL_HOST,
    port: EMAIL_PORT,
    secure: true,
    auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASSWORD
    }
})

try {
    await emailTransporter.verify()
    console.log("Email service is running")
} catch(error) {
    console.log(error)
}

export default emailTransporter;