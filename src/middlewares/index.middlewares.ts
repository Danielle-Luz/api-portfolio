import { NextFunction, Request, Response } from "express";
import { ZodTypeAny } from "zod";
import { InvalidValues } from "../errors";

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
      throw new InvalidValues(400, "The id should be a integer number");
    }

    return next();
  };

  export const validateBody =
    (schema: ZodTypeAny) =>
    (req: Request, res: Response, next: NextFunction) => {
      const validatedBody = schema.parse(req.body);

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
      throw new InvalidValues(
        400,
        `The stack should have one of these values: ${stackValidValues.join(
          ", "
        )}`
      );
    }

    return next();
  };
}
