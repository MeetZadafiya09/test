import express, { Router } from "express";
import { getAllPositions, getEmailSubjects, getEmailTemplates, sendEmails } from "../controllers/email.controller.js";
import endpoints from "../lib/endpoints.js";;
import { sendEmailSchema } from "../validations/email.schema.js";
import validate from "../middleware/validation.middleware.js";
import { checkAuth } from "../middleware/auth.middleware.js";

const emailRouter: Router = express.Router();

emailRouter
.get(endpoints.EMAIL.GET_ALL_POSITIONS, checkAuth(), getAllPositions)
.get(endpoints.EMAIL.GET_ALL_TEMPLATES, checkAuth(), getEmailTemplates)
.get(endpoints.EMAIL.GET_ALL_SUBJECTS, checkAuth(), getEmailSubjects)
.post(endpoints.EMAIL.SEND, checkAuth(), validate(sendEmailSchema), sendEmails);

export default emailRouter;