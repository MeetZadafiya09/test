import { renderEmail } from "../helpers/email.helper.js";
import { API_STATUS, EMAIL_QUEUE, EMAIL_SUBJECTS, EMAIL_TEMPLATES, JOB_POSITIONS, ROLE_DESCRIPTION, RoleDescription } from "../lib/constants.js";
import { responseMessages } from "../lib/messages.js";
import { ServiceResponse } from "../types/common.types.js";
import { sendEmail as sendEmailHelper } from "../helpers/email.helper.js";
import { resolveFromRoot } from "../utils/path.js";
import { emailQueue } from "../config/bullmq.config.js";

const sendEmail = async (data: any): Promise<ServiceResponse> => {
    const { to, experience, position, company_name, person_name, subject, template, send_resume = true } = data;

    const subjectText = subject + " " + position;
    const description = ROLE_DESCRIPTION[position as RoleDescription] || ROLE_DESCRIPTION['Full Stack Developer']
    const html = await renderEmail(template, { experience, position, company_name, person_name, description });
    await emailQueue.add(EMAIL_QUEUE, {
        to, subjectText, html, send_resume 
    }, {
        removeOnComplete: true,
        removeOnFail: true
    })

    // if (to && Array.isArray(to) && to.length > 0) {
    //     for (const email of to) {
    //         await sendEmailHelper(email, subjectText, html, send_resume ? [
    //             {
    //                 filename: 'Meet Zadafiya CV.pdf',
    //                 path: resolveFromRoot(UPLOAD_PATH, 'Meet Zadafiya - CV.pdf')
    //             }
    //         ] : []);
    //     }
    // } else {
    //     await sendEmailHelper(to, subjectText, html, send_resume ? [
    //         {
    //             filename: 'Meet Zadafiya CV.pdf',
    //             path: resolveFromRoot(UPLOAD_PATH, 'Meet Zadafiya - CV.pdf')
    //         }
    //     ] : []);
    // }
    return {
        message: responseMessages.EMAIL.SEND_EMAIL_SUCCESS,
        status: API_STATUS.SUCCESS
    };
}

const getAllPositions = async (): Promise<ServiceResponse> => {
    const positions = Object.values(JOB_POSITIONS).map((position) => ({
        label: position,
        value: position
    }));
    return {
        message: responseMessages.EMAIL.GET_ALL_POSITIONS_SUCCESS,
        status: API_STATUS.SUCCESS,
        data: positions
    };
}

const getEmailTemplates = async (): Promise<ServiceResponse> => {
    const templates = Object.values(EMAIL_TEMPLATES).map((template) => ({
        label: template.replace('_', ' ').replace(/\b\w/g, char => char.toUpperCase()),
        value: template
    }));
    return {
        message: responseMessages.EMAIL.GET_ALL_TEMPLATES_SUCCESS,
        status: API_STATUS.SUCCESS,
        data: templates
    };
}

const getEmailSubjects = async (): Promise<ServiceResponse> => {
    const subjects = Object.values(EMAIL_SUBJECTS).map((subject) => ({
        label: subject,
        value: subject
    }));
    return {
        message: responseMessages.EMAIL.GET_ALL_SUBJECTS_SUCCESS,
        status: API_STATUS.SUCCESS,
        data: subjects
    };
}

export default { sendEmail, getAllPositions, getEmailTemplates, getEmailSubjects };