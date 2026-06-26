import MongoComponent from "../repository/implemention/mongo.component.js";
import MongoUserRepository from "../repository/implemention/mongo.user.js";
import { AppError } from "../utils/error.utils.js";


let userRepo = new MongoUserRepository()


class ComponentService {

    async createComponent(componentData, userId) {

        const user = await userRepo.findUserById(userId)
        if (!user) throw new AppError(404, "User not found.")

        if (user.role === "admin") {
            const existing = await MongoComponent.findOne({ name: componentData.name, visibility: "public" })
            if (existing) throw new AppError(400, "Component already exists");
        } else {
            const existing = await MongoComponent.findOne({ name: componentData.name, owner: userId })
            if (existing) {
                throw new AppError(400, "Component name already exist in your library")
            }
        }

        let newComponent = await MongoComponent.createComponent({ ...componentData, owner: userId })
        if (!newComponent) throw new AppError(500, "Creation Failed.")

        return newComponent;
    }


    async getAllComponents(owner,select) {
        const components = await MongoComponent.findComponents(owner,select);
        return components;
    }


    async getComponentById(id) {
        const component = await MongoComponent.findComponentById(id);
        if (!component) throw new AppError(404, "Component not found.");
        return component;
    }

    async deleteComponent(id) {
        const component = await MongoComponent.deleteComponent(id);
        if (!component) throw new AppError(404, "Component not found.");
        return component;
    }

    async updateComponent(id, componentData) {
        const component = await MongoComponent.updateComponent(id, componentData);
        if (!component) throw new AppError(404, "Component not found.");
        return component;
    }

}

export default new ComponentService();