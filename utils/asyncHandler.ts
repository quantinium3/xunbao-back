import { Request, Response, NextFunction, RequestHandler } from "express";

const asyncHandler = (fn: RequestHandler) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    Promise.resolve(fn(req, res, next)).catch((err: unknown) => next(err));
  };
};

export default asyncHandler;
