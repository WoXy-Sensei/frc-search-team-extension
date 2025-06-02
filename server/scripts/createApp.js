"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const utils_1 = require("../src/utils");
// Function to create the application structure
function createAppStructure(appName) {
    const version = process.env.API_VERSION || 'v1';
    const baseDir = path_1.default.join('src', 'api', version, appName);
    // Create main directories and subdirectories
    const dirs = ['entities', 'middlewares', 'model'];
    dirs.forEach((dir) => {
        const dirPath = path_1.default.join(baseDir, dir);
        if (!fs_1.default.existsSync(dirPath)) {
            fs_1.default.mkdirSync(dirPath, { recursive: true });
            console.log(`${dir} directory created`);
        }
    });
    //create entity.ts file
    const entityPath = path_1.default.join(baseDir, 'entities', `${appName}Entity.ts`);
    const entityContent = `
    export type ${utils_1.string.capitalizeFirstLetter(appName)} = {
    name: string;
    age: number;
}
    `;
    fs_1.default.writeFileSync(entityPath, entityContent);
    // create middleware.ts file
    const middlewarePath = path_1.default.join(baseDir, 'middlewares', `${appName}Middleware.ts`);
    const middlewareContent = `
    import { Request, Response, NextFunction } from 'express';

class ${appName}Middlewares {
    static async ${appName}Middleware(req: Request, res: Response, next: NextFunction) {
        console.log('${appName}Middleware');
        next();
    }
}

export default ${appName}Middlewares;

    `;
    fs_1.default.writeFileSync(middlewarePath, middlewareContent);
    //create model.ts file
    const modelPath = path_1.default.join(baseDir, 'model', `${appName}Model.ts`);
    const modelContent = `
    import mongoose from 'mongoose';

export interface I${utils_1.string.capitalizeFirstLetter(appName)}Model extends mongoose.Document {
    name: string;
}

const ${utils_1.string.capitalizeFirstLetter(appName)}Schema = new mongoose.Schema<I${utils_1.string.capitalizeFirstLetter(appName)}Model>({
    name: { type: String, required: true },
});

const ${utils_1.string.capitalizeFirstLetter(appName)}Model = mongoose.model<I${utils_1.string.capitalizeFirstLetter(appName)}Model>('${utils_1.string.capitalizeFirstLetter(appName)}', ${utils_1.string.capitalizeFirstLetter(appName)}Schema);

export default ${utils_1.string.capitalizeFirstLetter(appName)}Model;

    `;
    fs_1.default.writeFileSync(modelPath, modelContent);
    // Create controller.ts file
    const controllerPath = path_1.default.join(baseDir, 'controller.ts');
    const controllerContent = `
import { Response, Request } from 'express';
import ${appName}Service from './service';

class ${appName}Controller {
    async create${utils_1.string.capitalizeFirstLetter(appName)}(req: Request, res: Response) {
        const ${appName} = await ${appName}Service.create${utils_1.string.capitalizeFirstLetter(appName)}();
        res.send(${appName});
    }
}
export default new ${appName}Controller();
`;
    fs_1.default.writeFileSync(controllerPath, controllerContent);
    console.log('controller.ts file created');
    // Create routes.ts file
    const routesPath = path_1.default.join(baseDir, 'routes.ts');
    const routesContent = `

    import express from 'express';
    import ${appName}Controller from './controller';
    
    const router = express.Router();
    
    router.get('/', ${appName}Controller.create${utils_1.string.capitalizeFirstLetter(appName)}.bind(${appName}Controller));
    
    export default router;
        `;
    fs_1.default.writeFileSync(routesPath, routesContent);
    console.log('routes.ts file created');
    // Create service.ts file
    const servicePath = path_1.default.join(baseDir, 'service.ts');
    const serviceContent = `
class ${appName}Service {
    async create${utils_1.string.capitalizeFirstLetter(appName)}() {
        return '${appName}';
    }
}

export default new ${appName}Service();
`;
    fs_1.default.writeFileSync(servicePath, serviceContent);
    console.log('service.ts file created');
}
// Get the app name from command line arguments
const appName = process.argv[2];
if (!appName) {
    console.log('Please provide an application name.');
    process.exit(1);
}
createAppStructure(appName);
