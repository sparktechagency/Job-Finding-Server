const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  jobTitle: { type: String, required: true },
  employmentType: { type: String, required: true },
  status: { type: String, enum: ['expired', 'active'], required: true },
  location: { type: String, required: true },
  isAdmin: { type: Boolean, default: false },
  company: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  salaryRange: { type: Number },
  experienceLevel: { type: String },
  applicationLastDate: { type: Date },
  seniority: { type: String },
  skills: [{ type: String }], // array of strings
  jobDescription: { type: String },
  yourScope: { type: String },
  jobResponsibilities: { type: String },
  positionRequirements: { type: String },
  whatInForYou: { type: String },
  deliverables: { type: String },
  meetTheTeamImage: { type: String }, // URL or filename
  allApplicants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Application' }],  // Assuming Applicant model
  shortlistedApplicants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Application' }],
  totalNumberOfApplicants: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('Job', jobSchema);
