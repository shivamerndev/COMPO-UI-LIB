import paymentValidator from "../validator/payment.validator.js"
import paymentService from "../services/payment.service.js";
import { AppError, asyncHandler } from "../utils/error.utils.js"


class PaymentController {


    checkOutDetail = asyncHandler(async (req, res) => {
        const plan = req.query.plan
        const detail = await paymentService.getDetail(plan)
        res.success(200, "Checkout Data Fetched.", detail)
    })


    createOrder = asyncHandler(async (req, res) => {

        const { plan } = req.body;

        let order = await paymentService.createOrder(plan)
        res.success(201, "Order created successfully.", { orderId: order.id, amount: order.amount, currency: order.currency ,plan });
    });


    verifyPayment = asyncHandler(async (req, res) => {

        const userId = req.user.id;

        const { verifyPaymentSchema } = paymentValidator()
        const { error } = verifyPaymentSchema.validate(req.body)
        if (error) throw new AppError(400, error.details[0].message)

        const verify = await paymentService.verifyPayment(req.body, userId)

        res.success(200, "Payment verified successfully.", verify)
    })


}

export default new PaymentController();