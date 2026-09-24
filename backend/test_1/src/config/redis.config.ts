import { Redis } from "ioredis";

const redis = new Redis('redis://localhost:6379', {
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