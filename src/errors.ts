import { Request, Response } from "express";

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

export const errorHandler = (error: Error, req: Request, res: Response) => {
  let statusCode = 500;
  const errorMessage = { message: "There was a internal server error" };

  if (error instanceof AppError) {
    errorMessage.message = error.message;
    statusCode = error.statusCode;
  }

  res.status(statusCode).send(errorMessage);
};
