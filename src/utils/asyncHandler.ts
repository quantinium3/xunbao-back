import { type Request, type Response, type NextFunction, type RequestHandler } from "express";

type AsyncRequestHandler = (
    req: Request,
    res: Response,
    next: NextFunction
) => Promise<any>;

const asyncHandler = (fn: AsyncRequestHandler): RequestHandler => {
    return (req: Request, res: Response, next: NextFunction) => {
        Promise.resolve(fn(req, res, next)).catch((err) => {
            console.error(`Async handler error for ${req.method} ${req.path}:`, err);
            next(err)
        });
    };
};

export default asyncHandler;
