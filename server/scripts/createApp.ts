import fs from 'fs';
import path from 'path';
import { string } from '../src/utils';

// Function to create the application structure
function createAppStructure(appName: string): void {
    const version = process.env.API_VERSION || 'v1';
    const baseDir = path.join('src', 'api', version, appName);

    // Create main directories and subdirectories
    const dirs = ['entities', 'middlewares', 'model'];
    dirs.forEach((dir) => {
        const dirPath = path.join(baseDir, dir);
        if (!fs.existsSync(dirPath)) {
            fs.mkdirSync(dirPath, { recursive: true });
            console.log(`${dir} directory created`);
        }
    });
    //create entity.ts file
    const entityPath = path.join(baseDir, 'entities', `${appName}Entity.ts`);
    const entityContent = `
    export type ${string.capitalizeFirstLetter(appName)} = {
    name: string;
    age: number;
}
    `;
    fs.writeFileSync(entityPath, entityContent);
    // create middleware.ts file
    const middlewarePath = path.join(baseDir, 'middlewares', `${appName}Middleware.ts`);
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
    fs.writeFileSync(middlewarePath, middlewareContent);
    //create model.ts file
    const modelPath = path.join(baseDir, 'model', `${appName}Model.ts`);
    const modelContent = `
    import mongoose from 'mongoose';

export interface I${string.capitalizeFirstLetter(appName)}Model extends mongoose.Document {
    name: string;
}

const ${string.capitalizeFirstLetter(appName)}Schema = new mongoose.Schema<I${string.capitalizeFirstLetter(appName)}Model>({
    name: { type: String, required: true },
});

const ${string.capitalizeFirstLetter(appName)}Model = mongoose.model<I${string.capitalizeFirstLetter(appName)}Model>('${string.capitalizeFirstLetter(appName)}', ${string.capitalizeFirstLetter(appName)}Schema);

export default ${string.capitalizeFirstLetter(appName)}Model;

    `;
    fs.writeFileSync(modelPath, modelContent);
    // Create controller.ts file
    const controllerPath = path.join(baseDir, 'controller.ts');
    const controllerContent = `
import { Response, Request } from 'express';
import ${appName}Service from './service';

class ${appName}Controller {
    async create${string.capitalizeFirstLetter(appName)}(req: Request, res: Response) {
        const ${appName} = await ${appName}Service.create${string.capitalizeFirstLetter(appName)}();
        res.send(${appName});
    }
}
export default new ${appName}Controller();
`;
    fs.writeFileSync(controllerPath, controllerContent);
    console.log('controller.ts file created');

    // Create routes.ts file
    const routesPath = path.join(baseDir, 'routes.ts');
    const routesContent = `

    import express from 'express';
    import ${appName}Controller from './controller';
    
    const router = express.Router();
    
    router.get('/', ${appName}Controller.create${string.capitalizeFirstLetter(appName)}.bind(${appName}Controller));
    
    export default router;
        `;
    fs.writeFileSync(routesPath, routesContent);
    console.log('routes.ts file created');

    // Create service.ts file
    const servicePath = path.join(baseDir, 'service.ts');
    const serviceContent = `
class ${appName}Service {
    async create${string.capitalizeFirstLetter(appName)}() {
        return '${appName}';
    }
}

export default new ${appName}Service();
`;
    fs.writeFileSync(servicePath, serviceContent);
    console.log('service.ts file created');
}

// Get the app name from command line arguments
const appName: string = process.argv[2];

if (!appName) {
    console.log('Please provide an application name.');
    process.exit(1);
}

createAppStructure(appName);
