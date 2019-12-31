import { IsDefined, IsString } from "class-validator";

export class AuthDTO {
    @IsDefined()
    @IsString()
    userName: string

    @IsDefined()
    @IsString()
    password: string

}