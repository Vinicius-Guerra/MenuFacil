import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { AppError } from "../errors/appError";

export class VerifyToken {
    static execute(req: Request, res: Response, next: NextFunction) {
        const authorization = req.headers.authorization;

        const token = authorization?.replace("Bearer", "").trim();

        if(!token) {
            throw new AppError("Token is required", 401);
        };

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
            res.locals.decode = decoded;

            console.log("Token verificado, payload decodificado:", decoded);

            next();
        } catch(error) {
            console.error("Erro ao verificar token:", error);
            throw new AppError("Invalid token", 401);
        };
    };
};
