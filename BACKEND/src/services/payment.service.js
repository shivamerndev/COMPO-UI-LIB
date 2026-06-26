import Razorpay from "razorpay";
import { validatePaymentVerification } from 'razorpay/dist/utils/razorpay-utils.js'
import { RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET } from "../configs/env.config.js"
import { AppError } from "../utils/error.utils.js";
import mongoPayment from "../repository/implemention/mongo.payment.js";
import MongoUserRepository from "../repository/implemention/mongo.user.js";
import paymentValidator from "../validator/payment.validator.js";

class PaymentService {

    constructor() {

        this.planDetail = (plan) => {

            let totalAmount = 0;
            let tokens = 0;

            if (plan === "basic") {
                totalAmount = 199;
                tokens = 10
            } else if (plan === "medium") {
                totalAmount = 399;
                tokens = 50
            } else if (plan === "premium") {
                totalAmount = 699;
                tokens = 100
            } else {
                throw new AppError(400, "Invalid Plan", plan)
            }

            return {
                name: plan,
                price: totalAmount,
                tokens: `${tokens}K / month`
            };
        }

        this.razorpay = new Razorpay({
            key_id: RAZORPAY_KEY_ID,
            key_secret: RAZORPAY_KEY_SECRET
        });


        this.userRepo = new MongoUserRepository()
    }


    getDetail = async (plan) => {

        if (!plan) {
            throw new AppError(400, "Please choose a plan first")
        }

        return this.planDetail(plan)
    }


    createOrder = async (plan) => {


        const planDetail = this.planDetail(plan);

        const orderOptions = {
            amount: planDetail.price * 100,
            currency: "INR"
        };

        const order = await this.razorpay.orders.create(orderOptions);

        let payload = {
            razorpayOrderId: order.id,
            plan: planDetail.name,
            price: {
                amount: order.amount,
                currency: order.currency
            },
            status: "pending"
        }

        const { error } = paymentValidator().createPaymentSchema.validate(payload)

        if (error) throw new AppError(400, error.details[0].message)

        await mongoPayment.createPayment(payload)

        return order
    }


    verifyPayment = async ({ razorpayPaymentId, razorpayOrderId, razorpaySignature, plan }, userId) => {

        const isPaymentValid = validatePaymentVerification({
            order_id: razorpayOrderId,
            payment_id: razorpayPaymentId
        }, razorpaySignature, RAZORPAY_KEY_SECRET);

        if (!isPaymentValid) {
            await mongoPayment.updatePayment(razorpayOrderId, { status: "failed" });
            throw new AppError(400, "Payment verification failed.");
        }

        await mongoPayment.updatePayment(razorpayOrderId, { status: "completed", razorpayPaymentId, razorpaySignature });

        let user = await this.userRepo.findUserById(userId)
        if (!user) {
            throw new AppError(404, "User not found")
        }

        let tokens = this.planDetail(plan).tokens
        tokens = tokens.split("K")[0] * 1000

        let updatedCredits = await this.userRepo.updateUser(userId, { aiCredits: user.aiCredits + tokens })

        return updatedCredits;
    }

}

export default new PaymentService();
