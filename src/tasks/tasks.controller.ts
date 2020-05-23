import { Controller, Get, Post, Body, Param, Delete, Patch, Query, UsePipes, ValidationPipe, ParseIntPipe, UseGuards } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { FilterTaskDto } from './dto/filter-task.dto';
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe';
import { Task } from './task.entity';
import { DeleteResult } from 'typeorm';
import { TaskStatus } from './task-status.enum';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../auth/get-user.decorator';
import { User } from '../auth/user.entity';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
    constructor(private taskService: TasksService) {}

    @Get()
    async index(@GetUser() user: User): Promise<Task[]> {
        return await this.taskService.getAll(user);
    }

    @Get('/search')
    search(@Query(ValidationPipe) filterTaskDto: FilterTaskDto, @GetUser() user: User) {
        return this.taskService.search(filterTaskDto, user);
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
    show(@Param('id', ParseIntPipe) id: number, @GetUser() user: User): Promise<Task> {
        return this.taskService.find(id, user);
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
        @Body('status', TaskStatusValidationPipe) status: TaskStatus,
        @GetUser() user: User,
    ): Promise<Task> {
        console.log(user.id);
        return this.taskService.updateStatus(id, status, user);
    }

    @Delete('/:id')
    destroy(@Param('id') id: number, @GetUser() user: User): Promise<DeleteResult> {
        return this.taskService.destroy(id, user);
    }
}
