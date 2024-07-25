import { NextFunction, Request, Response } from "express";
import { ZodSchema } from "zod";

export class ValidateBody {
    static execute(schema: ZodSchema) {
        return (req: Request, res: Response, next: NextFunction) => {
            try {
                // console.log("Validando corpo da requisição:", req.body);
                req.body = schema.parse(req.body);
                next();
            } catch (error) {
                // console.error("Erro de validação:", error);
                next(error);
            }
        };
    };
};
