import express, { Router } from "express";
import emailRouter from "./email.routes.js";
import authRouter from "./auth.routes.js";

const mainRouter = () => {
    const indexRouter: Router = express.Router();
    indexRouter.use('/', emailRouter);
    indexRouter.use('/', authRouter);
    return indexRouter;
};

export default mainRouter;