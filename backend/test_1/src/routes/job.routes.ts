import express, { type Router } from 'express'
import jobController from '../controllers/job.controller.js';

const jobRouter: Router = express.Router();

jobRouter
    .post('/jobs', jobController.addJob)

export default jobRouter;
