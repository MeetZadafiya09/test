import express, { type Router } from 'express'
import redisController from '../controllers/redis.controller.js';

const redisRouter: Router = express.Router();

redisRouter
    .get('/banner', redisController.getRedis)
    .post('/banner', redisController.addRedis)
    .delete('/banner',redisController.deleteRedis)


export default redisRouter;
