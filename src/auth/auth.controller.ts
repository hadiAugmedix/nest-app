import { Controller, ValidationPipe, Post, UsePipes, Body, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserCredentialDto } from './dto/user-credential.dto';
// import { AuthGuard } from '@nestjs/passport';
// import { GetUser } from './get-user.decorator';
// import { User } from './user.entity';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('/signup')
    @UsePipes(ValidationPipe)
    create(@Body() userCredentialDto: UserCredentialDto): Promise<void> {
        return this.authService.signup(userCredentialDto);
    }

    @Post('/signin')
    find(@Body() userCredentialDto: UserCredentialDto): Promise<{ accessToken: string }> {
        return this.authService.signin(userCredentialDto);
    }

    // @Post('/test')
    // @UseGuards(AuthGuard())
    // test(@GetUser() user: User) {
    //     console.log(user);
    // }
}
