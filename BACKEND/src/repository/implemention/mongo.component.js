import IComponentRepository from "../contract/component.contract.js";
import Component from "../../models/component.model.js";

class MongoComponent extends IComponentRepository {

    async createComponent(componentData) {
        const component = new Component(componentData)
        return await component.save()
    }

    async findOne(data) {
        return await Component.findOne(data)
    }

    async findComponents(owner,select) {
        if (owner) return await Component.find({ owner }).select(select)
        return await Component.find({ visibility: "public" }).select("name")
    }

    async findComponentById(id) {
        return await Component.findById(id)
    }

    async deleteComponent(id) {
        return await Component.findByIdAndDelete(id)
    }

    async updateComponent(id, componentData) {
        return await Component.findByIdAndUpdate(id, componentData, {new : true}).select("name code")
    }

}

export default new MongoComponent()