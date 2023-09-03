import {
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  UseInterceptors
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs';
import { plainToClass } from 'class-transformer';

// Interface that means any class
interface ClassContructor {
  new(...args: any[]): {}
}

// Behind the scenes, decorators are just plain functions
export function Serialize(dto: ClassContructor) {
  return UseInterceptors(new SerializeInterceptor(dto))
}

// Right now, the DTO that we use is hardcoded to the interceptor
// I.e, we can only use this interceptor for UserDto
// But we'll fix this later
export class SerializeInterceptor implements NestInterceptor {
  constructor(private dto: any) { }

intercept(context: ExecutionContext, handler: CallHandler): Observable<any> {
    // Run code after a request is handled
    return handler.handle().pipe(
      map((data: any)=> {
        // Run something before the response is sent out
        // Take incoming user entity and convert it to a DTO
        // we want to turn data into userDTO
        return plainToClass(this.dto, data, { 
          excludeExtraneousValues: true // if there are any extra properties on the data object, ignore them
          // only expose properties that are SPECIFICALLY marked with expose directive
          // Without excludeExtraneousValues, any other properties in user entity will be exposed
        })
      })
    )
  }
}