import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
import "express-async-errors";

class AppError {
  statusCode: number;
  message: string;

  constructor(statusCode: number, message: string) {
    this.statusCode = statusCode;
    this.message = message;
  }
}

export class InvalidValues extends AppError {
  constructor(statusCode: number, message: string) {
    super(statusCode, message);
  }
}

export const errorHandler = (error: Error, req: Request, res: Response, next: NextFunction) => {
  let statusCode = 500;
  const errorMessage = { message: "There was a internal server error" };

  console.error(error.stack);

  if (error instanceof AppError) {
    errorMessage.message = error.message;
    statusCode = error.statusCode;
  } else if (error instanceof ZodError) {
    return res.status(400).send(error.flatten().fieldErrors);
  }

  return res.status(statusCode).send(errorMessage);
};
