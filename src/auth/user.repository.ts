import { Repository, EntityRepository } from "typeorm";
import { User } from "./user.entity";
import { UserCredentialDto } from "./dto/user-credential.dto";
import { ConflictException } from "@nestjs/common";
import * as bcrypt from 'bcrypt';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
    async signup(userCredentialDto: UserCredentialDto): Promise<void> {
        const { username, password } = userCredentialDto;

        const salt = await bcrypt.genSalt();
        const user = new User();
        user.username = username;
        user.password = await this.hashPassword(password, salt);
        user.salt = salt;

        try {
            await user.save();
        } catch (e) {
            throw new ConflictException(`Username already exists!`);
        }
    }

    private async hashPassword(password: string, salt: string): Promise<string> {
        return bcrypt.hash(password, salt);
    }

    async signin(userCredentialDto: UserCredentialDto): Promise<string> {
        const { username, password } = userCredentialDto;
        const user = await this.findOne({ username });

        if (user && await user.validatePassword(password)) {
            return user.username;
        } else {
            return null;
        }
    }
}
