import { Router } from "express";
import { userAuth } from "../middlewares/auth.middleware.js";
import componentController from "../controllers/component.controller.js";
import aiController from "../controllers/ai.controller.js";

const router = Router()

router.post("/generate", userAuth, aiController.generateComponent);
router.post("/npm/:cid",userAuth,componentController.publishComponent)
router.post("/", userAuth, componentController.saveComponent)
router.get("/", userAuth, componentController.getAllComponents)
router.get("/saved",userAuth,componentController.getSavedComponents)
router.get("/my-projects",userAuth,componentController.getMyComponents)
router.get("/:id", userAuth, componentController.getComponentById)
router.delete("/:id", userAuth, componentController.deleteComponent)
router.patch("/:id", userAuth, componentController.updateComponent)

export default router;
