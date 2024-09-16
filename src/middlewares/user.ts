import { NextFunction, Request, Response } from "express";
import authServiceClient from "../services/auth";

export const isExistUser = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const {
    user: { email },
  } = request.body;
  const allow: any = () =>
    new Promise((resolve, reject) => {
      authServiceClient.IsExistUser({ email }, (err: any, res: any) => {
        if (err) {
          resolve(false);
        }
        if (res.exist) {
          resolve(false);
        }
        resolve(true);
      });
    });
  if (!(await allow())) {
    return response.json("User is existing").status(400);
  }
  next();
};
