import { EMAIL_FROM } from "../app.config.js";
import transporter from "../config/nodemailer.config.js";
import ejs from "ejs";
import { resolveFromRoot } from "../utils/path.js";

async function renderEmail(templateName: string, data: any): Promise<string> {
    const filePath = resolveFromRoot(`views/templates/${templateName}.ejs`);
    return ejs.renderFile(filePath, data);
}

const sendEmail = async (to: string, subject: string, html?: string, attachments?: any[], text?: string) => {
    const result = await transporter.sendMail({
        from: EMAIL_FROM,
        to,
        subject,
        ...(html && { html }),
        ...(attachments && attachments.length > 0 && { attachments }),
        ...(text && { text })
    });
    return result;
}

export { sendEmail, renderEmail };