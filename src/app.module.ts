import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ReportsModule } from './reports/reports.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/users.entity';
import { Report } from './reports/reports.entity';
import { ValidationPipe } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';
import { ConfigModule, ConfigService } from '@nestjs/config'
// ConfigModule: Specify which .env file we want to read
// ConfigService: Expose info in files to rest of app
import cookieSession = require('cookie-session');
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Make this module available to rest of app
      envFilePath: `.env.${process.env.NODE_ENV}`, // Specify which .env file we want to read
    }),
    UsersModule,
    ReportsModule,
    TypeOrmModule.forRootAsync({
      inject: [ConfigService], // Inject ConfigService into this module
      useFactory: (config: ConfigService) => {
        return {
          type: 'sqlite',
          database: config.get<string>('DB_NAME'),
          entities: [User, Report], 
          synchronize: true,
        }
      }
    }),
  ],
  controllers: [AppController],
  // Whenever we create an instance of our app module,
  // automatically make use of this and apply it into every single
  // request that is coming into our application - run it through
  // this instance of a class
  providers: [AppService, {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        whitelist: true
      })
    }
  ],
})
export class AppModule {

  configure(consumer: MiddlewareConsumer) {
    consumer.apply(
      cookieSession({
        keys: ['seriesofrandomnumbers'], // used to encrypt info inside cookie
      }),
    ).forRoutes('*'); // Make use of this middleware in EVERY single request that flows into our app
  }
}
