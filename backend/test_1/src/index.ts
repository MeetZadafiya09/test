import express, { type Application, type Request, type Response } from 'express'
import redis from './config/redis.config.js';
import mainRouter from './routes/main.routes.js';
import { errorMiddleware } from './middlewares/error.middleware.js';

import './lib/main.worker.js'


const app: Application = express();


app.use(express.json())

app.get('/redis-test', async (_req: Request, res: Response) => {
    const reply = redis.ping();
    res.json({
        redis: reply
    })
})

app.use('/api/v1', mainRouter)


app.use(errorMiddleware)

app.listen(4000, () => {
    console.log(`http://localhost:4000`)
})


