import { Job, Worker } from "bullmq";
import { BULLMQ_PREFIX, EMAIL_QUEUE, EMAIL_SUBJECT } from "../constants/bullmq.constants.js";
import redis from "../config/redis.config.js";
import { renderEjsTemplate, sendEmail } from "../helpers/email.helper.js";
import { resolveFromRoot } from "../utils/path.js";

const emailWorker = new Worker(EMAIL_QUEUE, async (job: Job) => {
    const { email } = job.data;
    const html = await renderEjsTemplate(resolveFromRoot('../../views/account.ejs'), { email })
   
    await sendEmail({
        to: email,
        subject: EMAIL_SUBJECT.ACCOUNT_EMAIL,
        html
    })
}, {
    connection: redis,
    prefix: BULLMQ_PREFIX
})

emailWorker.on('completed', () => {
    console.log("Job completed")
})
emailWorker.on('failed', (_, err: Error) => {
    console.log("Failed", err)
})

emailWorker.on('error', err => {
    console.error(err);
});

export default emailWorker;