import { IsNotEmpty } from 'class-validator';

export class UpdateSaleDto {
  @IsNotEmpty()
  completedAt: string;
}
