import { Router } from "express";
import { projectController } from "../controllers/projects.controllers";

export const projectsRouter: Router = Router();

projectsRouter.post("", projectController.insertProject);
