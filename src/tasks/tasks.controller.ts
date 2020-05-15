import { Controller, Get, Post, Body, Param, Delete, Patch, Query } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task, TaskStatus } from './tasks.model';
import { CreateTaskDto } from './dto/create-task.dto';
import { FilterTaskDto } from './dto/filter-task.dto';

@Controller('tasks')
export class TasksController {
    constructor(private taskService: TasksService) {}

    @Get()
    index(): Task[] {
        return this.taskService.getAll();
    }

    @Get('/search')
    search(@Query() filterTaskDto: FilterTaskDto) {
        return this.taskService.search(filterTaskDto);
    }

    @Post()
    create(@Body() createTaskDto: CreateTaskDto): Task {
        return this.taskService.create(createTaskDto);
    }

    store() {
        //
    }

    @Get('/:id')
    show(@Param('id') id: string): Task {
        return this.taskService.find(id);
    }

    edit() {
        //
    }

    update() {
        //
    }

    @Patch('/:id/status')
    updateStatus(@Param('id') id: string, @Body('status') status: TaskStatus): Task {
        return this.taskService.updateStatus(id, status);
    }

    @Delete('/:id')
    destroy(@Param('id') id: string): void {
        this.taskService.destroy(id);
    }
}
