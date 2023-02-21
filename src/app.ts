import { projectsRouter } from './routes/projects.routes';
import express, { Application } from "express";
import { errorHandler } from "./errors";

export const api: Application = express();

api.use(express.json());

api.use("/projects", projectsRouter);

api.use(errorHandler);