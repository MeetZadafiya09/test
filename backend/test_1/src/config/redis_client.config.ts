import { createClient } from "redis";

const redisClient = createClient({
    url: 'redis://localhost:6379'
})

redisClient.on('error', (error) => {
    console.log(error)
})

try {
    await redisClient.connect();
    console.log("Redi Client Connected")
} catch (error) {
    console.log(error)
}


export default redisClient;