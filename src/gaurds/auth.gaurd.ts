import {
  CanActivate,
  ExecutionContext
} from '@nestjs/common'

export class AuthGaurd implements CanActivate {
  // This is a method that will be called automatically by NestJS
  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    // If the user is logged in, the request will have a userid property
    return request.session.userId; 
    // If this returns true, then the user can access route we applied gaurd to
    // Otherwise, falsy value, and will prevent access to a handler or controller
  }
}