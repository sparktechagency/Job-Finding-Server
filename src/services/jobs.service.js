const httpStatus = require("http-status");
const Application = require("../models/application.model");
const Jobs = require("../models/jobs.model");
const User = require("../models/user.model");
const ApiError = require("../utils/ApiError");

const createJob = (data) => {
    const create = Jobs.create(data);
    return create;
}
const getJobs = async () => {
    const jobs = await Jobs.find();
    return jobs;
}
const getJobById = async (id) => {
    const job = await Jobs.findById({ _id: id }).populate("allApplicants").populate("shortlistedApplicants");
    // Check if the job exists
    if (!job) throw new Error("Job not found");
    // Populate the applications field with the Application model

    return job;
}
const createApplication = async (data) => {
    const application = await Application.create(data);
    const job = await Jobs.findById(data.jobPostId);
    if (!job) throw new Error("Job not found");
    // Initialize the array if undefined
    if (!Array.isArray(job.applications)) {
        job.applications = [];
    }
    job.allApplicants.push(application._id);
    job.totalNumberOfApplicants = job.allApplicants.length;

    await job.save();

    return application;
};

const bookmarkJob = async (userId, jobId) => {
    const job = await Jobs.findById(jobId);
    const user = await User.findById(userId);

    if (!job) throw new ApiError(httpStatus.NOT_FOUND, "Job not found");
    if (!user) throw new ApiError(httpStatus.NOT_FOUND, "User not found");

    // Check if the job is already bookmarked
    if (user.bookmarkedJobs.includes(job._id)) {
        throw new ApiError(httpStatus.BAD_REQUEST, "Job already bookmarked");
    }

    user.bookmarkedJobs.push(job._id);
    await user.save();

    return job;
};


module.exports = {
    createJob,
    getJobs,
    getJobById,
    createApplication,
    bookmarkJob
};