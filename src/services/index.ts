import { format } from "node-pg-format";
import { QueryResult } from "pg";
import { connection } from "../database/database.config";

export namespace services {
  export const insertData = async (data: any, table: string) => {
    const columns = Object.keys(data);
    const values = Object.values(data);

    const queryString = `
    INSERT INTO %I (%I)
    VALUES (%L)
    RETURNING *
    `;

    const formattedQuery = format(queryString, table, columns, values);

    const queryResult: QueryResult<any> = await connection.query(
      formattedQuery
    );

    const insertedData = queryResult.rows[0];
    
    return insertedData;
  };
}
