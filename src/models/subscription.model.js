const mongoose = require('mongoose');

const subscriptionSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true, default: 0 },
    subType: { type: String, enum: ['weekly', 'monthly', 'yearly'], required: true },
    features: [{ type: String }]  // note: spelling kept as 'featurs' to match your JSON
}, { timestamps: true });

module.exports = mongoose.model('Subscription', subscriptionSchema);
