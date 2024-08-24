import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    phone_number: {
        type: Number,
        required: true
    },
    email: {
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
    isDeleted: {
        type: Boolean,
        default: false
    }
});

const Users = mongoose.model('Users', userSchema);

export default Users;