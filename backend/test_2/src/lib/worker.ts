import { Job, Worker } from "bullmq";
import redis from "../config/redis.config.js";
import { BULLMQ_PREFIX, EMAIL_QUEUE, UPLOAD_PATH } from "./constants.js";
import { resolveFromRoot } from "../utils/path.js";
import { sendEmail } from "../helpers/email.helper.js";


const jobWorker = new Worker(EMAIL_QUEUE, async (job: Job) => {
    const { to, subjectText, html, send_resume } = job.data;
    await sendEmail(to, subjectText, html, send_resume ? [
        {
            filename: 'Meet Zadafiya CV.pdf',
            path: resolveFromRoot(UPLOAD_PATH, 'Meet Zadafiya - CV.pdf')
        }
    ] : []);
}, {
    connection: redis,
    prefix: BULLMQ_PREFIX
})

jobWorker.on('completed', () => {
    console.log("Job completed")
})
jobWorker.on('failed', (_, err: Error) => {
    console.log("Failed", err)
})

jobWorker.on('error', err => {
    console.error(err);
});

export default jobWorker;