import joi from "joi"

function componentValidator(compoData) {

    const createComponentSchema = joi.object({
        prompt: joi.string().optional().trim(),
        name: joi.string().required().trim(),
        code: joi.string().required().trim(),
        props: joi.array().optional().items(joi.string().trim()).default([]),
        owner: joi.string().required().trim(),
        visibility: joi.string().optional().trim().default("private"),
        npmPackage: joi.string().optional().trim()
    })

    return createComponentSchema.validate(compoData)
}

export default componentValidator;