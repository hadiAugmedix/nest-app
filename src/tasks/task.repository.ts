import { Repository, EntityRepository } from "typeorm";
import { Task } from "./task.entity";
import { CreateTaskDto } from "./dto/create-task.dto";
import { TaskStatus } from "./task-status.enum";
import { FilterTaskDto } from "./dto/filter-task.dto";

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {
    async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
        const { title, description } = createTaskDto;

        const task = new Task();
        task.title = title;
        task.description = description;
        task.status = TaskStatus.OPEN;
        await task.save();

        return task;
    }

    async getAll(): Promise<Task[]> {
        const query = this.createQueryBuilder('task');
        const tasks = await query.getMany();

        return tasks;
    }

    async search(filterTaskDto: FilterTaskDto): Promise<Task[]> {
        const { status, q } = filterTaskDto;

        const query = this.createQueryBuilder('task');

        if (status) {
            query.andWhere('task.status = :status', { status });
        }

        if (q) {
            query.andWhere('task.title LIKE :search OR task.description LIKE :search', { search: `%${q}%` });
        }

        const tasks = await query.getMany();

        return tasks;
    }
}
