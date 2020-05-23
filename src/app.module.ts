import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';

const typeOrmConfig: TypeOrmModuleOptions = {
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '',
    database: 'taskmanagement',
    entities: [__dirname + '/../**/*.entity.js'],
    synchronize: true,
    // logging: true,
}

@Module({
    imports: [
        TypeOrmModule.forRoot(typeOrmConfig),
        TasksModule,
        AuthModule
    ],
})
export class AppModule {}
