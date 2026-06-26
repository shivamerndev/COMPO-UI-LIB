import { useRazorpay } from "react-razorpay";
import paymentService from "../service/payment.service";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { setUser } from "../../auth/auth.slice";


const usePayment = () => {

    const dispatch = useDispatch()

    const loggedInUser = useSelector(state => state.auth.user)
    const { Razorpay } = useRazorpay();
    const [planDetail, setPlanDetail] = useState(null)


    const handleCheckoutDetail = async (plan) => {

        let { data } = await paymentService.checkoutService(plan)

        setPlanDetail(data)
    }


    const handlePayment = async (plan) => {

        const subscriber = {
            name: loggedInUser.fullName,
            email: loggedInUser.email
        }

        const options = await paymentService.paymentService(subscriber, plan, (user) => {
            dispatch(setUser(user))
            alert("Payment Successful!");
        })

        const razorpayInstance = new Razorpay(options);
        razorpayInstance.open();
    }


    return { handlePayment, handleCheckoutDetail, planDetail }
}

export default usePayment