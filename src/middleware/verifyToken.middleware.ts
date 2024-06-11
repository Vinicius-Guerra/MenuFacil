import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { AppError } from "../errors/appError";

export class VerifyToken {
    static execute(req: Request, res: Response, next: NextFunction) {
        const authorization = req.headers.authorization;

        const token = authorization?.replace("Bearer", "");

        if(!token) {
            throw new AppError("Token is required", 401);
        };

        jwt.verify(token, process.env.JWT_SECRET as string);

        res.locals.decode = jwt.decode(token);

        next();
    };
};