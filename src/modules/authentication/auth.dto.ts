import { IsDefined, IsString, IsOptional } from "class-validator";

export class AuthDTO {
  @IsDefined()
  @IsString()
  userName: string;

  @IsDefined()
  @IsString()
  password: string;
}

export class userDTO {
  @IsString()
  @IsOptional()
  userId?: string
}