import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto/create-task.dto.ts.js';
import { UpdateTaskDto } from './dto/upadate-task.dto/upadate-task.dto.js';
import { Task } from './models/task.model.js';
import { InjectModel } from '@nestjs/sequelize';
import { User } from '../users/models/user.model.js';

@Injectable()
export class TasksService {
  constructor(
    @InjectModel(Task) private readonly taskModel: typeof Task, 
    @InjectModel(User) private readonly userModel: typeof User,) {}

  async findAll(): Promise<Task[]> {
    const tasks = await this.taskModel.findAll({
      include: User
    });

    if (tasks.length === 0) {
      throw new NotFoundException('Nenhuma tarefa encontrada');
    }

    return tasks;
  }

  async findOne(id: number) {
    const task = await this.taskModel.findByPk(id, {
      include: User
    });

    if (!task) {
      throw new NotFoundException(`Tarefa com ID ${id} não encontrada`);
    }

    return task;
  }

  async create(createTaskDto: CreateTaskDto) {
    return await this.taskModel.create({
      title: createTaskDto.title,
      completed: createTaskDto.completed ?? false,
      description: createTaskDto.description ?? null,
      userId: createTaskDto.userId ?? null
    });
  }

  async update(id: number, updateTaskDto: UpdateTaskDto) {
    const task = await this.findOne(id);

    if (updateTaskDto.title !== undefined) {
      task.title = updateTaskDto.title;
    }

    if (updateTaskDto.completed !== undefined) {
      task.completed = updateTaskDto.completed;
    }

    if (updateTaskDto.description !== undefined) {
      task.description = updateTaskDto.description;
    }

    if(updateTaskDto.userId !== undefined){
      if(updateTaskDto.userId === null){
        task.userId = updateTaskDto.userId;
      }else{
        const user = await this.userModel.findByPk(updateTaskDto.userId);
        
        if(!user){
          throw new NotFoundException(`Usuário com ${updateTaskDto.userId} não encontrado.`)
        }

        task.userId = user.id;
      }

    }

    await task.save();

    return await this.findOne(id);
  }

  async delete(id: number) {
    const task = await this.findOne(id);

    await task.destroy();

    return task;
  }

  async findNull() {
    return this.taskModel.findAll({
      where: {
        description: null,
      },
    });
  }
}
