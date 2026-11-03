import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto/create-task.dto.ts';
import { UpdateTaskDto } from './dto/upadate-task.dto/upadate-task.dto';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksServices: TasksService) {}

  @Get()
  findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(5), ParseIntPipe) limit: number
  ) {
    return this.tasksServices.findAll(page, limit);
  }

  @Get('concluidas')
  trueTasks() {
    return this.tasksServices.trueTasks();
  }

  @Get('pendentes')
  falseTasks() {
    return this.tasksServices.falseTasks();
  }

  @Get('sem-descricao')
  finNull() {
    return this.tasksServices.findNull();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.tasksServices.findOne(id);
  }

  @Post()
  create(@Body() createTaskDto: CreateTaskDto) {
    return this.tasksServices.create(createTaskDto);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTaskDto: UpdateTaskDto,
  ) {
    return this.tasksServices.update(id, updateTaskDto);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.tasksServices.delete(id);
  }
}
