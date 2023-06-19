import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TodoModule } from './todos/todo.module';

@Module({
  imports: [
    // what happens here is funny, the env service isn't ready yet so you need to connect to mongoose asynchronously
    // hence why I have to import and inject the configService manually
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('DB_URI')
      })
    }),
    ConfigModule.forRoot(),
    TodoModule
  ]
})
export class AppModule {}
