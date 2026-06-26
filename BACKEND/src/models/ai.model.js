import mongoose from "mongoose"

const aiSchema = new mongoose.Schema({


    prompt: {
        type: String,
        required: [true, "Prompt is required"],
        trim: true,
        minlength: [5, "Prompt must be at least 5 characters"],
        maxlength: [2000, "Prompt cannot exceed 2000 characters"],
    },
    generatedCode: {
        type: String,
        default: null,
    }

})
const aiModel = mongoose.model("ai", aiSchema);

export default aiModel ;
