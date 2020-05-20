import { IsString, MinLength, MaxLength, Matches } from "class-validator";

export class UserCredentialDto {
    @IsString()
    @MinLength(4)
    @MaxLength(20)
    username: string;

    @IsString()
    @MinLength(6)
    @MaxLength(30)
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
        message: `Passwords must contain at least 1 upper case letter, 1 lower case letter and 1 number or special character`
    })
    password: string;
}
