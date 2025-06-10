import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

function validateRequest(request: Request) {
  const token = request.headers['token'];
  return token === '123456';
}

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    return validateRequest(request);
  }
}
