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
    const job = await Jobs.findById({ _id: id });
    console.log(job);
    return job;
}


module.exports = {
    createJob,
    getJobs,
    getJobById
};