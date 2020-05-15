import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './tasks.model';
import { v1 as uuidv1 } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { FilterTaskDto } from './dto/filter-task.dto';

@Injectable()
export class TasksService {
    private tasks: Task[] = [];

    getAll(): Task[] {
        return this.tasks;
    }

    search(filterTaskDto: FilterTaskDto): Task[] {
        const { status, q } = filterTaskDto;

        let tasks = this.getAll();

        if (status) {
            tasks = tasks.filter(task => task.status === status);
        }

        if (q) {
            tasks = tasks.filter(task => task.title.includes(q) || task.description.includes(q));
        }

        return tasks;
    }

    create(createTaskDto: CreateTaskDto): Task {
        const { title, description } = createTaskDto;

        const task: Task = {
            id: uuidv1(),
            title,
            description,
            status: TaskStatus.OPEN,
        };

        this.tasks.push(task);

        return task;
    }

    find(id: string): Task {
        return this.tasks.find(task => task.id === id);
    }

    destroy(id: string): void {
        this.tasks = [...this.tasks.filter(task => task.id !== id)];
    }

    updateStatus(id: string, status: TaskStatus): Task {
        const task = this.find(id);

        if (task) {
            task.status = status;
        }
        
        return task;
    }
}
