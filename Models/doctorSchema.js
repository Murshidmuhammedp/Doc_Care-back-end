import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema({
    doctor_ID: {
        type: String,
        required: true
    },
    full_Name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone_Number: {
        type: Number,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    DOB: {
        type: String,
        required: true
    },
    specialization: {
        type: String,
        required: true
    },
    experience: {
        type: Number,
        required: true
    },
    consultation_Fee: {
        type: Number,
        required: true
    },
    consultation_Address: {
        type: String,
        required: true
    },
    district: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    pincode: {
        type: Number,
        required: true
    },
    Image: {
        type: String,
        required: true
    },
    startTime: {
        type: String,
        required: true
    },
    endTime: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    booking: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "booking"
    }],
    accountCreatedDate: {
        type: Date,
        required: true,
        default: () => {
            const now = new Date();
            now.setHours(now.getHours() + 5);
            now.setMinutes(now.getMinutes() + 30);
            return now;
        }
    },
    approve: {
        type: Boolean,
        default: false
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
});

const doctors = mongoose.model("doctors", doctorSchema);

export default doctors;