// CareerEvent model

const mongoose = require("mongoose");
const { Schema } = mongoose;

const careerEventSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        image: {
            type: String,
            required: true,
        },
        titleofBlog: {
            type: String,
            required: true,
        },
        blogImage: {
            type: String,
            required: true,
        },
        details: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("CareerEvent", careerEventSchema);  