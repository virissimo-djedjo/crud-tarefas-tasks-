import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto.ts/create-task.dto.ts';
import { UpdateTaskDto } from './dto/upadate-task.dto.ts/upadate-task.dto';

@Controller('tasks')
export class TasksController {
    constructor(private readonly tasksServices: TasksService){}

    @Get()
    findAll(){
        return this.tasksServices.findAll()
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number){
        return this.tasksServices.findOne(id);
    }

    @Post()
    create(@Body() createTaskDto: CreateTaskDto){

        return this.tasksServices.create(createTaskDto);
    }

    @Patch(':id')
    update(
        @Param('id', ParseIntPipe) id: number, 
        @Body() updateTaskDto: UpdateTaskDto){

            return this.tasksServices.update(id, updateTaskDto);

    }

    @Delete(':id')
    delete(@Param('id', ParseIntPipe) id: number){
        return this.tasksServices.delete(id);
    }
}
