import { IsNotEmpty, IsUUID } from 'class-validator';

export class ReturnSaleDto {
  @IsNotEmpty()
  @IsUUID()
  employee: string;
}
