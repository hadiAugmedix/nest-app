import { Repository, EntityRepository } from "typeorm";
import { Task } from "./task.entity";
import { CreateTaskDto } from "./dto/create-task.dto";
import { TaskStatus } from "./task-status.enum";
import { FilterTaskDto } from "./dto/filter-task.dto";
import { User } from "src/auth/user.entity";

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {
    async createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
        const { title, description } = createTaskDto;

        const task = new Task();
        task.title = title;
        task.description = description;
        task.status = TaskStatus.OPEN;
        task.user = user;
        await task.save();

        delete task.user;

        return task;
    }

    async getAll(user: User): Promise<Task[]> {
        const query = this.createQueryBuilder('task');
        query.where("task.userId = :userId", { userId: user.id });
        const tasks = await query.getMany();

        return tasks;
    }

    async search(filterTaskDto: FilterTaskDto, user: User): Promise<Task[]> {
        const { status, q } = filterTaskDto;

        const query = this.createQueryBuilder('task');

        query.where("task.userId = :userId", { userId: user.id });

        if (status) {
            query.andWhere('task.status = :status', { status });
        }

        if (q) {
            query.andWhere('(task.title LIKE :search OR task.description LIKE :search)', { search: `%${q}%` });
        }

        const tasks = await query.getMany();

        return tasks;
    }
}
