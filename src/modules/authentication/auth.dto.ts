import { IsDefined, IsString, IsOptional, IsEmail } from "class-validator";

export class AuthDTO {
  @IsDefined()
  @IsString()
  userName: string;

  @IsDefined()
  @IsString()
  password: string;

  mobileNumber?: string;

  @IsEmail()
  emailAddress?: string;
}

export class userDTO {
  @IsString()
  @IsOptional()
  userId?: string;
}
