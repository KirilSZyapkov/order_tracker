import { Response, NextFunction } from "express";

export function errorHandlingMiddleware( err: unknown, res: Response, next: NextFunction ) {
  console.error("Error occurred:", err);

  if(res.headersSent){
    return next(err);
  };

  if(err instanceof Error){
  const status = 500;
  const message = err.message || "Internal Server Error";
    
  res.status(status).json({ error: message });
  }
}