import { TaskStatus } from "../tasks.model";

export class FilterTaskDto {
    status: TaskStatus;
    q: string;
}