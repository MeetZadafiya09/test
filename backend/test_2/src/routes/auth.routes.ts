import express, { Router } from "express";
import { loginUser, logoutUser } from "../controllers/auth.controller.js";
import endpoints from "../lib/endpoints.js";
import validate from "../middleware/validation.middleware.js";
import { loginSchema } from "../validations/auth.schema.js";

const authRouter: Router = express.Router();

authRouter
.post(endpoints.AUTH.LOGIN, validate(loginSchema), loginUser)
.post(endpoints.AUTH.LOGOUT, logoutUser);

export default authRouter;