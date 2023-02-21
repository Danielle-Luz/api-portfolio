import { z } from "zod";
import { projectSchema } from "../schemas/projects.schemas";

export type iProject = z.infer<typeof projectSchema.schema>;
export type iGetProjects = Omit<iProject, "highlight">;