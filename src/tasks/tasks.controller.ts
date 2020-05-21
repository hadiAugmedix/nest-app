import { Controller, Get, Post, Body, Param, Delete, Patch, Query, UsePipes, ValidationPipe, ParseIntPipe, UseGuards } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { FilterTaskDto } from './dto/filter-task.dto';
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe';
import { Task } from './task.entity';
import { DeleteResult } from 'typeorm';
import { TaskStatus } from './task-status.enum';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
    constructor(private taskService: TasksService) {}

    @Get()
    async index(): Promise<Task[]> {
        return await this.taskService.getAll();
    }

    @Get('/search')
    search(@Query(ValidationPipe) filterTaskDto: FilterTaskDto) {
        return this.taskService.search(filterTaskDto);
    }

    @Post()
    @UsePipes(ValidationPipe)
    create(
        @Body() createTaskDto: CreateTaskDto,
        @GetUser() user: User,
    ): Promise<Task> {
        return this.taskService.create(createTaskDto, user);
    }

    // store() {
    //     //
    // }

    @Get('/:id')
    show(@Param('id', ParseIntPipe) id: number): Promise<Task> {
        return this.taskService.find(id);
    }

    // edit() {
    //     //
    // }

    // update() {
    //     //
    // }

    @Patch('/:id/status')
    updateStatus(
        @Param('id', ParseIntPipe) id: number,
        @Body('status', TaskStatusValidationPipe) status: TaskStatus
    ): Promise<Task> {
        return this.taskService.updateStatus(id, status);
    }

    @Delete('/:id')
    destroy(@Param('id') id: number): Promise<DeleteResult> {
        return this.taskService.destroy(id);
    }
}
