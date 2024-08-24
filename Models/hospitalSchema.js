import mongoose from "mongoose";

const hospitalSchema = new mongoose.Schema({
    License_number: {
        type: String,
        required: true
    },
    Hospital_name: {
        type: String,
        required: true
    },
    Email: {
        type: String,
        required: true
    },
    Phone_Number: {
        type: Number,
        required: true
    },
    Address: {
        type: String,
        required: true
    },
    City: {
        type: String,
        required: true
    },
    District: {
        type: String,
        required: true
    },
    State: {
        type: String,
        required: true
    },
    Pincode: {
        type: Number,
        required: true
    },
    Image: {
        type: String,
        required: true
    },
    Password: {
        type: String,
        required: true
    },
    booking: [{

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

const hospitals = mongoose.model("hospitals", hospitalSchema);

export default hospitals;