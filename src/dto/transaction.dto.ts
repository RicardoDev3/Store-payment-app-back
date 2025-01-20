/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsEmail, IsString, IsArray, ArrayNotEmpty } from 'class-validator';

export class CreateTransactionDto {
  @IsNotEmpty()
  @IsString()
  customerName: string;

  @IsNotEmpty()
  @IsEmail()
  customerEmail: string;

  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  productIds: string[];
}

export class UpdateTransactionStatusDto {
  @IsNotEmpty()
  @IsString()
  status: 'COMPLETED' | 'FAILED';
}
