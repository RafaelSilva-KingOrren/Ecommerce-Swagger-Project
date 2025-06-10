import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

//Middleware reutilizable pero que no es global
@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log(
      `Ejecutando un metodo middleware ${req.method} en la ruta ${req.url} a las ${new Date().toLocaleTimeString()}`,
    );
    next();
  }
}

//Middleware global que ira a main.ts
export function loggerGlobal(req: Request, res: Response, next: NextFunction) {
  console.log(
    `Accediendo al E-commerce de Rafael usando el metodo ${req.method} en la ruta ${req.url} a las ${new Date().toLocaleTimeString()}`,
  );
  next();
}
