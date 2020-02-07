import { IsDefined, IsString, IsEmail } from "class-validator";
export class EmailDTO {
  @IsDefined()
  @IsString()
  message: string;

  @IsDefined()
  @IsString()
  subject: string;

  @IsDefined()
  @IsEmail()
  to;
}
