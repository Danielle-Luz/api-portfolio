import { Router } from "express";
import { projectController } from "../controllers/projects.controllers";
import { middlewares } from "../middlewares/index.middlewares";
import { projectSchema } from "../schemas/projects.schemas";

export const projectsRouter: Router = Router();

projectsRouter.post(
  "",
  middlewares.validateBody(projectSchema.schema),
  projectController.insertProject
);

projectsRouter.get(
  "/:stack",
  middlewares.validateStack,
  projectController.getProjectsByStack
);
projectsRouter.get("/highlights", projectController.getHighlightProjects);

projectsRouter.delete(
  "/:id",
  middlewares.validateId,
  projectController.deleteProject
);
