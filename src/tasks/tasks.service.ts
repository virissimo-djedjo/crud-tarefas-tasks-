import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto.ts/create-task.dto.ts';
import { UpdateTaskDto } from './dto/upadate-task.dto.ts/upadate-task.dto.js';
import { Task } from './models/task.model.js';
import { InjectModel } from '@nestjs/sequelize';


@Injectable()
export class TasksService {

    constructor(@InjectModel(Task) private readonly taskModel: typeof Task){}

    async findAll(){
        const tasks = await this.taskModel.findAll();
        
        if(tasks.length === 0){
            throw new NotFoundException('Nenhuma tarefa encontrada')
        }
        return tasks;
    }

    async findOne(id: number){
        const task = await this.taskModel.findByPk(id);

        if(!task){
            throw new NotFoundException(
                `Tarefa com ID ${id} não encontrada`
            );
        }

        return task;
    }

    async create(createTaskDto: CreateTaskDto){
        return await this.taskModel.create({
            title: createTaskDto.title,
            completed: createTaskDto.completed ?? false,
            description: createTaskDto.description ?? null
        });
    }

    async update(id: number, updateTaskDto: UpdateTaskDto){
        const task = await this.findOne(id);

        if(updateTaskDto.title !== undefined){
            task.title = updateTaskDto.title
        }

        if (updateTaskDto.completed !== undefined) {
            task.completed = updateTaskDto.completed;
        }

        if(updateTaskDto.description !== undefined){
            task.description = updateTaskDto.description
        }
        
        await task.save()

        return task;
    }

    async delete(id: number){
        const task =  await this.findOne(id);

        await task.destroy()

        return task;
    }

}
