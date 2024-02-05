import express from 'express';
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";
import { createServer } from 'http';

import usersRouter from '../users/routes.js';
import projectsRouter from '../projects/routes.js';


export class Server {
    createDoc() {
        const options = {
            definition: {
              openapi: '3.0.0', 
              info: {
                title: 'ESPL Hub'
              },
            },
            apis: ['./users/routes.js', './projects/routes.js']
        };
        const specsDeploy = swaggerJsdoc(options);
        this.app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specsDeploy));
    }

    constructor() {
        this.app = express();
        this.app.use(express.json());
        this.createDoc();
        this.app.use('/users', usersRouter);
        this.app.use('/projects', projectsRouter);

        this.server = createServer(this.app);
    }

    start() {
        this.server.listen(process.env.PORT, async () => {
            console.info(`Server is running on port ${process.env.PORT}`);
        });
    }
}
