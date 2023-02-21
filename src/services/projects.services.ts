import { QueryResult } from "pg";
import { format } from "node-pg-format";
import { iGetProjects } from "../interfaces/projects.interfaces";
import { connection } from "../database/database.config";

export namespace projectsService {
  export const getProjectsByStack = async (stackName: string) => {
    const queryString = `
    SELECT 
    id,
    "name", 
    url, 
    stack_name
    FROM projects
    WHERE p.stack_name = %L
    `;

    const formattedQuery = format(queryString, stackName);

    const queryResult: QueryResult<iGetProjects> = await connection.query(
      formattedQuery
    );

    const foundProjects = queryResult.rows;

    return foundProjects;
  };

  export const getTechnologiesFromProject = async (projectId: number) => {
    const queryString = `
    SELECT t."name", t.img
    FROM technologies t
    JOIN projects_technologies pt
    ON pt.technology_id = t.id
    WHERE pt.project_id = %L
    `
          
    const formattedQuery = format(queryString, projectId);

    const queryResult: QueryResult<any> = await connection.query(formattedQuery);

    const foundTechnologies = queryResult.rows;

    return foundTechnologies;
  }
}
