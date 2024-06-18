import { NextFunction, Request, Response } from "express";
import { ZodSchema } from "zod";

export class ValidateBody {
    static execute(schema: ZodSchema) {
        return (req: Request, res: Response, next: NextFunction) => {
            try {
                req.body = schema.parse(req.body);
    
                next();
            } catch (error) {
                next(error);
            }
        };
    };
};