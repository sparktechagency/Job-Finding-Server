const Application = require("../models/application.model");
const Jobs = require("../models/jobs.model");

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


module.exports = {
    createJob,
    getJobs,
    getJobById,
    createApplication
};