import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { UserCredentialDto } from './dto/user-credential.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository,
        private jwtService: JwtService,
    ) {}

    async signup(userCredentialDto: UserCredentialDto): Promise<void> {
        return this.userRepository.signup(userCredentialDto);
    }

    async signin(userCredentialDto: UserCredentialDto): Promise<{ accessToken: string }> {
        const username = await this.userRepository.signin(userCredentialDto);

        if (!username) {
            throw new UnauthorizedException(`Invalid credentials`);
        }

        const payload = { username };
        const accessToken = this.jwtService.sign(payload);

        return { accessToken };
    }
}
