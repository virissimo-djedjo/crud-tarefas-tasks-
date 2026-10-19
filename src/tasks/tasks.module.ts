import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Task } from './models/task.model';
import { User } from '../users/models/user.model';

@Module({
  imports: [SequelizeModule.forFeature([Task, User])],
  controllers: [TasksController],
  providers: [TasksService]
})
export class TasksModule {}
