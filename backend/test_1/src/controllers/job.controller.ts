import { type Response, type Request } from "express"
import { jobQueue } from "../config/bullmq.config.js";
import { JOB_QUEUE } from "../constants/bullmq.constants.js";
import { STATUS_CODE } from "../constants/http.constants.js";
import ApiResponse from "../utils/response.js";

const addJob = async (req: Request, res: Response): Promise<Response> => {
    const { job_id } = req.body;
    await jobQueue.add(JOB_QUEUE, {
        job_id: job_id
    }, {
        removeOnComplete: true
    })
    return res.status(STATUS_CODE.SUCCESS).json(ApiResponse.send('Job Added Successfully', STATUS_CODE.SUCCESS))
}

export default {
    addJob
}