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
}
