import { Router } from "express";
import paymentController from "../controllers/payment.controller.js";
import { userAuth } from "../middlewares/auth.middleware.js";

const router = Router()

router.get("/checkout", userAuth, paymentController.checkOutDetail)
router.post("/order", userAuth, paymentController.createOrder)
router.post("/verify", userAuth, paymentController.verifyPayment)

export default router;