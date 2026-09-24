import { Queue } from "bullmq";
import { BULLMQ_PREFIX, EMAIL_QUEUE, JOB_QUEUE } from "../constants/bullmq.constants.js";
import redis from "./redis.config.js";

const jobQueue = new Queue(JOB_QUEUE, {
    connection: redis,
    prefix: BULLMQ_PREFIX
})

const emailQueue = new Queue(EMAIL_QUEUE, {
    connection: redis,
    prefix: BULLMQ_PREFIX
})

export { jobQueue, emailQueue }