import componentValidator from "../validator/component.validator.js";
import { AppError, asyncHandler } from "../utils/error.utils.js"
import componentService from "../services/component.service.js";
import npmService from "../services/npm.service.js";

class ComponentController {

    saveComponent = asyncHandler(async (req, res) => {

        const userId = req.user.id;

        const { error } = componentValidator(req.body)
        if (error) throw new AppError(400, error.details[0].message)

        const createdComponent = await componentService.createComponent(req.body, userId);
        return res.success(201, "Component created successfully", createdComponent);
    })


    publishComponent = asyncHandler(async (req, res) => {

        const userId = req.user.id;

        const response = await npmService.publishToNPM(req.params.cid, userId);

        return res.success(200, "Component published successfully", response);
    })


    getSavedComponents = asyncHandler(async (req, res) => {
        const userId = req.user.id;

        const components = await componentService.getAllComponents(userId,"name visibility code");
        return res.success(200, "Components fetched successfully", components);
    })

    getMyComponents = asyncHandler(async (req, res) => {
        const userId = req.user.id;

        const components = await componentService.getAllComponents(userId,"name");
        return res.success(200, "Components fetched successfully", components);
    })

    getAllComponents = asyncHandler(async (req, res) => {

        const components = await componentService.getAllComponents();
        return res.success(200, "Components fetched successfully", components);

    })

    getComponentById = asyncHandler(async (req, res) => {
        const component = await componentService.getComponentById(req.params.id);
        return res.success(200, "Component fetched successfully", component);

    })

    deleteComponent = asyncHandler(async (req, res) => {
        const component = await componentService.deleteComponent(req.params.id);
        return res.success(200, "Component deleted successfully", component);
    })

    updateComponent = asyncHandler(async (req, res) => {
        const component = await componentService.updateComponent(req.params.id, req.body);
        return res.success(200, "Component updated successfully");
    })

}

export default new ComponentController();