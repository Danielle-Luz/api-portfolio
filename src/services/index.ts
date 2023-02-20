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

  export const updateData = async (data: any, table: string, identifierColumn: string, identifierValue: string) => {
    const columns = Object.keys(data);
    const values = Object.keys(data);

    const queryString = `
    UPDATE %I
    SET (%L) = ROW (%L)
    WHERE %I = %L
    RETUNING *
    `

    const formattedQuery = format(queryString, table, columns, values, identifierColumn, identifierValue);

    const queryResult: QueryResult<any> = await connection.query(formattedQuery);

    const updatedData = queryResult.rows[0];

    return updatedData
  }
}
