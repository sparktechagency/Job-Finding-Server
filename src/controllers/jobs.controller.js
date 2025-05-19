const httpStatus = require("http-status");
const jobsService = require("../services/jobs.service");
const response = require("../config/response");
const catchAsync = require("../utils/catchAsync");

const createJob = catchAsync(async (req, res) => {

    const body = req.body;

    if (body.jobTitle == '' || body.employmentType == '' || body.location == '' || body.status == '') {

        return res.status(httpStatus.BAD_REQUEST).json(
            response({
                message: "All fields is required",
                status: "FAILED",
                statusCode: httpStatus.BAD_REQUEST,
            })
        );
    }

    const job = await jobsService.createJob(req.body);

    res.status(httpStatus.CREATED).json(
        response({
            message: "Job Created Successfully",
            status: "OK",
            statusCode: httpStatus.CREATED,
            data: job,
        })
    );
});

const getJobs = catchAsync(async (req, res) => {

    const jobs = await jobsService.getJobs();

    res.status(httpStatus.OK).json(
        response({
            message: "All Jobs",
            status: "OK",
            statusCode: httpStatus.OK,
            data: jobs,
        })
    );
});

const getJobById = catchAsync(async (req, res) => {
    const { id } = req.params;
    const job = await jobsService.getJobById(id);

    console.log(job);

    if (!job) {
        return res.status(httpStatus.NOT_FOUND).json(
            response({
                message: "Job not found",
                status: "FAILED",
                statusCode: httpStatus.NOT_FOUND,
            })
        );
    }

    res.status(httpStatus.OK).json(
        response({
            message: "Job",
            status: "OK",
            statusCode: httpStatus.OK,
            data: job,
        })
    );
});

const createApplication = catchAsync(async (req, res) => {
    const body = req.body;
    console.log("createApplication", body);
    if (body.jobPostId == '' || body.userId == '') {
        return res.status(httpStatus.BAD_REQUEST).json(
            response({
                message: "All fields is required",
                status: "FAILED",
                statusCode: httpStatus.BAD_REQUEST,
            })
        );
    }
    if (req.files.cv) {
        req.body.cv = `/uploads/users/${req.files.cv[0].filename}`;
    }
    if (req.files.coverLetter) {
        req.body.coverLetter = `/uploads/users/${req.files.coverLetter[0].filename}`;
    }
    if (req.files.sortVideo) {
        req.body.sortVideo = `/uploads/users/${req.files.sortVideo[0].filename}`;
    }

    console.log(body);

    const application = await jobsService.createApplication(body);

    res.status(httpStatus.CREATED).json(
        response({
            message: "Application Created Successfully",
            status: "OK",
            statusCode: httpStatus.CREATED,
            data: application,
        })
    );
});
const bookmarkJob = catchAsync(async (req, res) => {
    const { jobId } = req.body;
    const { _id: id } = req.user;

    const job = await jobsService.bookmarkJob(id, jobId);

    if (!job) {
        return res.status(httpStatus.NOT_FOUND).json(
            response({
                message: "Job not found",
                status: "FAILED",
                statusCode: httpStatus.NOT_FOUND,
            })
        );
    }

    res.status(httpStatus.OK).json(
        response({
            message: "Job bookmarked successfully",
            status: "OK",
            statusCode: httpStatus.OK,
            // data: job,
        })
    );
});


module.exports = {
    createJob,
    getJobs,
    getJobById,
    createApplication,
    bookmarkJob
};