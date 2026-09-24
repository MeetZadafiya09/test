import { Redis } from "ioredis";
import { REDIS_URL } from "../app.config.js";

const redis = new Redis(REDIS_URL, {
    maxRetriesPerRequest: null
})

redis.on('connect', () => {
    console.log("Redis Connecting")
})

redis.on('ready', () => {
    console.log('Redis is Ready')
})

redis.on('error', (error) => {
    console.log(error)
})

redis.on("reconnecting", () => {
    console.log("Redis reconnecting...");
});

export default redis;