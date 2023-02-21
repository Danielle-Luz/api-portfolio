import { NextFunction, Request, Response } from "express";

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
}
