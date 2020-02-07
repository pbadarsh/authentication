import { IsDefined, IsString, IsMobilePhone } from "class-validator";
export class MessageDTO {
  @IsDefined()
  @IsString()
  message: string;

  @IsDefined()
  @IsString()
  mobileNumber;
}
