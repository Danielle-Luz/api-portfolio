import { Router } from "express";
import { projectController } from "../controllers/projects.controllers";
import { middlewares } from "../middlewares/index.middlewares";
import { projectSchema } from "../schemas/projects.schemas";

export const projectsRouter: Router = Router();

projectsRouter.post(
  "",
  middlewares.validateBody(projectSchema.insertSchema),
  projectController.insertProject
);

projectsRouter.patch(
  "/:id",
  middlewares.validateId,
  middlewares.validateBody(projectSchema.insertSchema),
  projectController.updateProject
);

projectsRouter.get("/highlights", projectController.getHighlightProjects);
projectsRouter.get(
  "/:stack",
  middlewares.validateStack,
  projectController.getProjectsByStack
);

projectsRouter.delete(
  "/:id",
  middlewares.validateId,
  projectController.deleteProject
);
