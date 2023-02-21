import { stack } from "./../interfaces/index.interfaces";
import { NextFunction, Request, Response } from "express";
import { ZodTypeAny } from "zod";

export namespace middlewares {
  export const validateId = (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const id = req.params.id;
    const idAsNumber = Number(id);

    const isFloat = idAsNumber % 1 !== 0;
    const isNotANumber = isNaN(idAsNumber);

    if (isNotANumber || isFloat) {
      const errorMessage = {
        message: "The id should be a integer number",
      };

      return res.status(401).send(errorMessage);
    }

    return next();
  };

  export const validateBody =
    (schema: ZodTypeAny) =>
    (req: Request, res: Response, next: NextFunction) => {
      const validatedBody = schema.parse(schema);

      req.body = validatedBody;

      return next();
    };

  export const validateStack = (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const stack = req.params.stack;
    const stackValidValues = Object.values(stack);

    const isNotAValidStack = !stackValidValues.includes(stack);

    if (isNotAValidStack) {
      const errorMessage = {
        message: `The stack should have one of these values: ${stackValidValues.join(
          ", "
        )}`,
      };

      return res.status(401).send(errorMessage);
    }

    return next();
  };
}
