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

  export const updateData = async (
    data: any,
    table: string,
    identifierColumn: string,
    identifierValue: string
  ) => {
    const columns = Object.keys(data);
    const values = Object.keys(data);

    const queryString = `
    UPDATE %I
    SET (%L) = ROW (%L)
    WHERE %I = %L
    RETUNING *
    `;

    const formattedQuery = format(
      queryString,
      table,
      columns,
      values,
      identifierColumn,
      identifierValue
    );

    const queryResult: QueryResult<any> = await connection.query(
      formattedQuery
    );

    const updatedData = queryResult.rows[0];

    return updatedData;
  };

  export const deleteData = async (
    table: string,
    identifierColumn: string,
    identifierValue: string
  ) => {
    const queryString = `
    DELETE FROM %I
    WHERE %I = %L
    `;

    const formattedQuery = format(
      queryString,
      table,
      identifierColumn,
      identifierValue
    );

    await connection.query(formattedQuery);
  };

  export const selectDataWithWhere = async (
    table: string,
    identifierColumn: string,
    identifierValue: string,
    selectedColumns?: string[]
  ) => {
    let formattedQuery: string;

    if (selectedColumns) {
      const queryString = `
      SELECT %I
      FROM %I
      WHERE %I = %L
      `;

      formattedQuery = format(
        queryString,
        selectedColumns,
        table,
        identifierColumn,
        identifierValue
      );
    } else {
      const queryString = `
      SELECT *
      FROM %I
      WHERE %I = %L
      `;

      formattedQuery = format(
        queryString,
        table,
        identifierColumn,
        identifierValue
      );
    }

    const queryResult: QueryResult<any> = await connection.query(
      formattedQuery
    );

    const foundData = queryResult.rows[0];

    return foundData;
  };

  export const selectDataWithoutWhere = async (
    table: string,
    selectedColumns?: string[]
  ) => {
    let formattedQuery: string;

    if (selectedColumns) {
      const queryString = `
      SELECT %I
      FROM %I
      `;

      formattedQuery = format(queryString, selectedColumns, table);
    } else {
      const queryString = `
      SELECT *
      FROM %I
      `;

      formattedQuery = format(queryString, table);
    }

    const queryResult: QueryResult<any> = await connection.query(
      formattedQuery
    );

    const foundData = queryResult.rows[0];

    return foundData;
  };
}
