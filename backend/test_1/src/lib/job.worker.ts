import { Job, Worker } from "bullmq";
import { BULLMQ_PREFIX, EMAIL_QUEUE, JOB_QUEUE } from "../constants/bullmq.constants.js";
import redis from "../config/redis.config.js";
import { getJobEmail } from "../data/jobs.js";
import { emailQueue } from "../config/bullmq.config.js";

const jobWorker = new Worker(JOB_QUEUE, async (job: Job) => {
    const { job_id } = job.data
    const emails = await getJobEmail(job_id)
    for (const email of emails) {
        await emailQueue.add(EMAIL_QUEUE, {
            email
        }, {
            removeOnComplete: true,
            removeOnFail: true
        })
    }
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