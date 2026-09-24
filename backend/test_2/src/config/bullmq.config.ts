import { Queue } from "bullmq";
import redis from "./redis.config.js";
import { BULLMQ_PREFIX, EMAIL_QUEUE } from "../lib/constants.js";

const emailQueue = new Queue(EMAIL_QUEUE, {
    connection: redis,
    prefix: BULLMQ_PREFIX
})

export { emailQueue }