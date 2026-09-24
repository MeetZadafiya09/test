import ejs, { type Data } from 'ejs'
import type { Attachment } from 'nodemailer'
import emailTransporter from '../config/email.config.js'

const renderEjsTemplate = (filePath: string, data: Data) => {
    return ejs.renderFile(filePath, data)
}

export interface sendEmailType {
    to: string,
    subject: string,
    html?: string
    attachments?: Attachment[],
    text?: string
}

const sendEmail = async ({ to, subject, html, attachments, text }: sendEmailType) => {
    const result = await emailTransporter.sendMail({
        to,
        subject,
        ...(html && { html }),
        ...(text && { text }),
        ...(attachments && attachments.length > 0 ? { attachments } : {})
    })
    return result;
}

export { renderEjsTemplate, sendEmail }