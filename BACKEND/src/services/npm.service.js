import MongoComponent from "../repository/implemention/mongo.component.js";
import MongoUserRepository from "../repository/implemention/mongo.user.js";
import { AppError } from "../utils/error.utils.js";
import path from "path"
import fs from "fs"
import { execSync } from "child_process";

let userRepo = new MongoUserRepository()


class NpmService {

    async publishToNPM(componentId, userId) {

        const user = await userRepo.findUserById(userId)
        if (!user) throw new AppError(404, "User not found.")

        if (!user && user.role !== "admin") {
            throw new AppError(403, "Only admin can publish")
        }

        const component = await MongoComponent.findComponentById(componentId);
        if (!component) throw new AppError(404, "Component not found")

        if (component.visibility === "public") {
            throw new AppError(400, "Component is already published!")
        }
        
        if (component.owner.toString() !== userId) throw new AppError(403, "You are not authorized to publish this component")

        const libPath = path.join(process.cwd(), "../PACKAGE")
        const componentDir = path.join(libPath, "src/components", component.name)
        const componentFile = path.join(componentDir, `${component.name}.jsx`)
        const indexJs = path.join(libPath, "/src/index.js")

        if (!fs.existsSync(componentDir)) {
            fs.mkdirSync(componentDir, { recursive: true })
        }

        fs.writeFileSync(componentFile, component.code)

        let indexContent = fs.readFileSync(indexJs, "utf-8")
        const exportLine = `export {${component.name} } from "./components/${component.name}/${component.name}.jsx" `

        if (!indexContent.includes(exportLine)) {
            fs.appendFileSync(indexJs, `\n${exportLine}`)
        }

        console.log("Cleaning Old Build")

        const distPath = path.join(libPath, "dist")

        if (fs.existsSync(distPath)) {
            fs.rmSync(distPath, { recursive: true, force: true })
        }

        try {
            console.log("Building Library.")
            execSync("npm run build", {
                cwd: libPath,
                stdio: "inherit"
            })

            console.log("Updating Version.")
            execSync("npm version patch --no-git-tag-version", {
                cwd: libPath,
                stdio: "inherit",
            });

            console.log("Publishing to NPM.")
            execSync("npm publish --access public", {
                cwd: libPath,
                stdio: "inherit"
            })
        } catch (error) {
            console.error("NPM operation failed:", error);
            throw new AppError(500, `NPM build/publish failed: ${error.message}`);
        }

        component.visibility = "public"
        component.npmPackage = "compo-ui-lib"

        await component.save()
        return true
    }

}


export default new NpmService();