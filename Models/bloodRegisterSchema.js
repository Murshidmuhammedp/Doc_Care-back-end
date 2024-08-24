import mongoose from "mongoose";

const bloodSchema = new mongoose.Schema({
    Name: {
        type: String,
        required: true
    },
    Blood_group: {
        type: String,
        required: true
    },
    Gender: {
        type: String,
        required: true
    },
    Age: {
        type: Number,
        required: true
    },
    Email: {
        type: String,
        required: true
    },
    Phone_number: {
        type: Number,
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
    created_at: {
        type: Date,
        required: true,
        default: () => {
            const now = new Date();
            now.setHours(now.getHours() + 5);
            now.setMinutes(now.getMinutes() + 30);
            return now;
        }
    }
});

const Blood = mongoose.model('Blood', bloodSchema);

export default Blood;