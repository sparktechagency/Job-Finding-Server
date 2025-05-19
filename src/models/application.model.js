const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
  jobPostId: { type: mongoose.Schema.Types.ObjectId, ref: 'Job', required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  cv: { type: String, required: true },           // Could be a URL or file path
  coverLetter: { type: String, required: false },
  sortVideo: { type: String, required: false }    // Assuming you meant "shortVideo"
}, { timestamps: true });

module.exports = mongoose.model('Application', applicationSchema);
