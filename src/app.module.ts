import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TasksModule } from './tasks/tasks.module';
import { ConfigModule, ConfigService } from "@nestjs/config";
import { SequelizeModule } from '@nestjs/sequelize';
import { usersModule } from './users/users.module';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true}), 

    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService)=>({
        dialect: 'postgres',
        host: config.getOrThrow<string>('DB_HOST'),
        port: Number(config.getOrThrow<string>('DB_PORT')),
        database: config.getOrThrow<string>('DB_NAME'),
        username: config.getOrThrow<string>('DB_USER'),
        password: config.getOrThrow<string>('DB_PASSWORD'),
        autoLoadModels: true,
        synchronize: false,
      }),
    }),
  
  TasksModule, usersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
