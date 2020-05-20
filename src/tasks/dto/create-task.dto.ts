// ref https://github.com/typestack/class-validator
import { IsNotEmpty } from 'class-validator';

export class CreateTaskDto {
    @IsNotEmpty()
    title: string;

    @IsNotEmpty()
    description: string;
}