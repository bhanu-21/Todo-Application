import mongoose from "mongoose";

const todoSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    title: {
        type: String,
        required: true,
    },
    desc: {
        type: String,
        required: true,
    },
    isCompleted: {
        type: Boolean,
        default: false,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    updateDate: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.model("Todos", todoSchema);