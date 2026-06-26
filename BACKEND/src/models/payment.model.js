import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
    razorpayOrderId: {
        type: String,
        required: true,
        unique: true
    },
    razorpayPaymentId: {
        type: String,
    },
    razorpaySignature: {
        type: String,
    },
    price: {
        amount: {
            type: Number,
            required: true
        },
        currency: {
            type: String,
            required: true,
            enum: ["INR", "USD", "EUR"], // Add more currencies as needed
            default: "INR"
        }
    },
    status: {
        type: String,
        required: true,
        enum: ["pending", "failed", "completed"],
        default: "pending"
    },
    plan: {
        type: String,
        enum: ["basic", "medium", "premium"],
        required: true
    }

})


export default mongoose.model("Payment", paymentSchema);