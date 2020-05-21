import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { FilterTaskDto } from './dto/filter-task.dto';
import { TaskRepository } from './task.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { DeleteResult } from 'typeorm';
import { TaskStatus } from './task-status.enum';
import { User } from 'src/auth/user.entity';

@Injectable()
export class TasksService {
    constructor(
        @InjectRepository(TaskRepository)
        private taskRepository: TaskRepository
    ) {}

    async getAll(): Promise<Task[]> {
        return this.taskRepository.getAll();
    }

    async search(filterTaskDto: FilterTaskDto): Promise<Task[]> {
        return this.taskRepository.search(filterTaskDto);
    }

    async create(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
        return await this.taskRepository.createTask(createTaskDto, user);
    }

    async find(id: number): Promise<Task> {
        const task = await this.taskRepository.findOne(id);

        if (!task) {
            throw new NotFoundException(`Task with id ${id} not found`);
        }

        return task;
    }

    async destroy(id: number): Promise<DeleteResult> {
        const result = await this.taskRepository.delete(id);

        if (result.affected === 0) {
            throw new NotFoundException(`Task with id ${id} not found`);
        }

        return result;
    }

    async updateStatus(id: number, status: TaskStatus): Promise<Task> {
        const task = await this.find(id);
        task.status = status;
        await task.save();

        return task;
    }
}
