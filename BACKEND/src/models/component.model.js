import { Schema, model } from "mongoose";

const componentSchema = new Schema({

    prompt: {
        type: String,
        trim: true
    },
    name: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        // index: true
    },
    code: {
        type: String,
        required: true,
        trim: true
    },
    props: [{
        type: String,
        trim: true,
        default: "",
        required: true
    }],
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    visibility: {
        type: String,
        enum: ["private", "public"],
        default: "private"
    },
    npmPackage: {
        type: String,
        trim: true,
    }

}, { timestamps: true })


export default model("Component", componentSchema)