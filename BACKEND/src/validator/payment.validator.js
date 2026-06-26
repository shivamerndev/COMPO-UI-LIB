import joi from "joi"

function paymentValidator() {

    const createPaymentSchema = joi.object({
        plan: joi.string().required().trim().valid("basic", "medium", "premium"),
        razorpayOrderId: joi.string().required().trim(),
        razorpayPaymentId: joi.string().optional().trim(),
        razorpaySignature: joi.string().optional().trim(),
        price: joi.object({
            amount: joi.number().required(),
            currency: joi.string().trim().required(),
        }).required(),
        status: joi.string().required().trim(),

    })

    const verifyPaymentSchema = joi.object({
        razorpayOrderId: joi.string().required().trim(),
        razorpayPaymentId: joi.string().required().trim(),
        razorpaySignature: joi.string().required().trim(),
        plan: joi.string().required().trim().valid("basic", "medium", "premium")
    })

    return { createPaymentSchema, verifyPaymentSchema }
}

export default paymentValidator;