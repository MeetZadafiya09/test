import express from 'express'
import redisRouter from './redis.routes.js'
import otpRouter from './otp.routes.js'
import userRouter from './user.routes.js'
import productRouter from './product.routes.js'
import emailRouter from './email.routes.js'
import jobRouter from './job.routes.js'

const mainRouter = express.Router()

mainRouter.use('/', redisRouter) // Simple set and get
mainRouter.use('/', otpRouter) // Set expiry
mainRouter.use('/', userRouter) // hash object
mainRouter.use('/', productRouter) // Native JSON
mainRouter.use('/', emailRouter) // Email Queue with Manually
mainRouter.use('/',jobRouter) // Bullmq Queue


export default mainRouter;