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
}
