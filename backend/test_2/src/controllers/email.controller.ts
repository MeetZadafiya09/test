import asyncHandler from "express-async-handler";
import { Request, Response } from "express";
import ApiResponse from "../helpers/response.helper.js";
import emailService from "../services/email.service.js";
import { dataFilter } from "../helpers/data.helper.js";

export const sendEmails = asyncHandler(async (req: Request, res: Response): Promise<any> => {;
  const data = dataFilter(req.body, ['to', 'experience', 'position', 'company_name', 'person_name', 'subject', 'template', 'send_resume']);
  const result = await emailService.sendEmail(data);
  return res.status(result.status).json(ApiResponse.success(result.message, result.data));
});


export const getAllPositions = asyncHandler(async (req: Request, res: Response): Promise<any> => {
  const result = await emailService.getAllPositions();
  return res.status(result.status).json(ApiResponse.success(result.message, result.data));
});

export const getEmailTemplates = asyncHandler(async (req: Request, res: Response): Promise<any> => {
  const result = await emailService.getEmailTemplates();
  return res.status(result.status).json(ApiResponse.success(result.message, result.data));
}); 

export const getEmailSubjects = asyncHandler(async (req: Request, res: Response): Promise<any> => {
  const result = await emailService.getEmailSubjects();
  return res.status(result.status).json(ApiResponse.success(result.message, result.data));
});