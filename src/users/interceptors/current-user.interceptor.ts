import { Observable } from 'rxjs'
import { UsersService } from '../users.service'
import {
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Injectable
} from '@nestjs/common'

@Injectable() // to be part of DI
export class CurrentUserInterceptor implements NestInterceptor {
  constructor(private usersService: UsersService) { }

  // context = wrapper around request
  // handler = reference to route handler that will run at some point in time
  async intercept(context: ExecutionContext, handler: CallHandler<any>) {
    const request = context.switchToHttp().getRequest();
    const { userId } = request.session;
    if(userId) {
      const user = await this.usersService.findOne(userId);
      // we need to communicate this user down into the decorator
      // we can do this by attaching it to the request object
      request.currentUser = user; // so when our decorator runs, we can take request object and return
      // from it request.currentUser
    }
    return handler.handle(); // just go ahead and run route handler
  }


}