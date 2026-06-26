import { api } from "../../../utils/axios.utils"


const handler = async (response, plan, onSuccess) => {

    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = response;

    let verify = await api.post('/payment/verify', {
        razorpayOrderId: razorpay_order_id,
        razorpayPaymentId: razorpay_payment_id,
        razorpaySignature: razorpay_signature,
        plan
    })

    onSuccess(verify.data.data)

}

const paymentService = {

    paymentService: async (subscriber, plan, onSuccess) => {

        const response = await api.post('/payment/order', { plan })
        const order = response.data.data;

        const options = {
            key: "rzp_test_TdsyB6VuIxFT5s",
            amount: order.amount,
            currency: order.currency,
            name: "CompoLab",
            description: "CompoLab Test Transaction",
            order_id: order.orderId,
            handler: (response) => handler(response, plan, onSuccess),
            prefill: subscriber,
            theme: { color: "#7700ffff" }
        };

        return options;
    },

    checkoutService: async (plan) => {
        const res = await api.get("/payment/checkout?plan=" + plan)
        return res.data
    }
}

export default paymentService;