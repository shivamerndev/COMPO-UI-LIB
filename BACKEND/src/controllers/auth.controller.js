import authValidator from "../validator/auth.validator.js"
import authService from "../services/auth.service.js";
import { AppError, asyncHandler } from "../utils/error.utils.js"
import { verifyRefreshToken } from "../utils/token.utils.js";


class AuthController {


    googleAuth = asyncHandler(async (req, res) => {

        const { idToken } = req.body;

        let { accessToken, refreshToken, httpOnly } = await authService.googleService(idToken)
        res.cookie("refresh_token", refreshToken, httpOnly)

        res.success(200, "Authentication Successfully.", {accessToken})
    })

    register = asyncHandler(async (req, res) => {

        const userData = req.body;
        const { register: { error } } = authValidator(userData)

        if (error) throw new AppError(400, error.details[0].message)

        let { accessToken, refreshToken, httpOnly } = await authService.register(req.body)

        res.cookie("refresh_token", refreshToken, httpOnly)

        res.success(201, "Registered Successfully.", { accessToken })
    })

    login = asyncHandler(async (req, res) => {

        const { email, password } = req.body;

        if (!email || !password) throw new AppError(400, "Email and password are required.");

        let { accessToken, refreshToken, httpOnly } = await authService.login(req.body)

        res.cookie("refresh_token", refreshToken, httpOnly)
        res.success(200, "LoggedIn Successfully.", { accessToken })
    })

    getUser = asyncHandler(async (req, res) => {

        let user = await authService.getUser(req.user.id)

        res.success(200, "User Fetched Successfully", user)
    })

    updateUser = asyncHandler(async (req, res) => {

        const userId = req.user.id;
        const updates = req.body;

        let user = await authService.updateUser(userId, updates)

        res.success(200, "Updated Successfully", user)
    })

    logout = asyncHandler(async (req, res) => {

        // const userId = req.user.id;
        const refresh_token = req.refresh_token;

        // if (!userId) throw new AppError(400, "Bad Request.")

        await authService.logout(refresh_token);

        res.clearCookie("refresh_token", {
            httpOnly: true,
            secure: true,
            sameSite: "strict"
        })

        res.success(200, "Logged Out Successfully.")
    });

    refreshAccessToken = asyncHandler(async (req, res) => {

        const refresh_token = req.cookies.refresh_token
        if (!refresh_token) throw new AppError(400, "Refresh Token Must be Provided.")

        const decoded = verifyRefreshToken(refresh_token)

        const { newAccessToken, newRefreshToken, httpOnly } = await authService.refresh_token(refresh_token, decoded.id)

        res.cookie("refresh_token", newRefreshToken, httpOnly)

        res.success(200, "Token Refreshed Successfully.", { accessToken: newAccessToken })
    })

}

export default new AuthController();