import {
  createParamDecorator,
  ExecutionContext
} from '@nestjs/common'

// context is a wrapper around the incoming request
// Its an execution context rather than request because it can be used to abstract
// a web socket, grpc request, http request etc. Rather than specifically caling it request
// which implies we're using http, we're going to refer to it as execution context
export const CurrentUser = createParamDecorator((data: never, context: ExecutionContext) => {

  const request = context.switchToHttp().getRequest();
  return request.currentUser;
})