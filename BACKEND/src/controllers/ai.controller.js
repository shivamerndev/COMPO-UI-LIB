import { ComponentGenerator } from "../services/ai.service.js";
import { AppError, asyncHandler } from "../utils/error.utils.js";
import MongoUserRepository from "../repository/implemention/mongo.user.js";


class AiController {

    constructor() {
        this.userRepo = new MongoUserRepository()
    }

    generateComponent = asyncHandler(async (req, res) => {

        const { prompt } = req.body;
        const userId = req.user.id;


        let user = await this.userRepo.findUserById(userId)

        if (!user) {
            throw new AppError(404, "User not found");
        }

        if (user.role === "user" && user.aiCredits < 50) {
            throw new AppError(402, "Insufficient credits");
        }

        res.setHeader("Content-Type", "text/event-stream")
        res.setHeader("Cache-Control", "no-cache")
        res.setHeader("Connection", "keep-alive")

        let usage = {}

        const { stream } = await ComponentGenerator({ prompt })

        for await (const chunk of stream) {
            res.write(`chunk: ${JSON.stringify({ response: chunk[0].contentBlocks[0].text })}\n\n`);
            usage = chunk[0].usage_metadata
        }

        let deductToken = Math.round((usage.total_tokens - 4600) / 10)

        console.log("Deducted Token : ", deductToken)

        if (user.role === "user") {
            if (user.aiCredits < deductToken) {
                user.aiCredits = 0;
            } else {
                user.aiCredits -= deductToken;
            }
            await user.save();
        }

        res.write(`data: ${JSON.stringify({ type: "done" })}\n\n`)
        res.end()
    })

}

export default new AiController()