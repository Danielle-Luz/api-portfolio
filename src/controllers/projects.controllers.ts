import { Request, Response } from "express";
import { services } from "../services/index.services";

export namespace projectController {
  const selectedProjectFields = ["id", "name", "url", "stack_name"];

  export const getProjectsByStack = async (req: Request, res: Response) => {
    const searchedStack = req.params.stack;

    const foundProjects = await services.selectDataWithWhere(
      "projects",
      "stack_name",
      searchedStack,
      selectedProjectFields
    );

    return res.status(200).send(foundProjects);
  };

  export const getHighlightProjects = async (req: Request, res: Response) => {
    const highlightProjects = await services.selectDataWithWhere(
      "projects",
      "highlight",
      "true",
      selectedProjectFields
    );

    return res.status(200).send(highlightProjects);
  };

  export const insertProject = async (req: Request, res: Response) => {
    const insertedProject = await services.insertData(req.body, "projects");

    return res.status(201).send(insertedProject);
  };
}
