/* eslint-disable prettier/prettier */
import { Controller, Post, Body, Put, Param } from '@nestjs/common';
import { CreateTransactionUseCase } from 'src/application/use-cases/create-transaction.use-case';
import { CreateTransactionDto, UpdateTransactionStatusDto } from 'src/dto/transaction.dto';


@Controller('transactions')
export class TransactionController {
  constructor(private readonly transactionUseCase: CreateTransactionUseCase) {}

  @Post()
  async createTransaction(@Body() createTransactionDto: CreateTransactionDto) {
    return await this.transactionUseCase.createTransaction(createTransactionDto);
  }

  @Put(':id/status')
  async updateTransactionStatus(
    @Param('id') id: string,
    @Body() updateTransactionStatusDto: UpdateTransactionStatusDto,
  ) {
    return await this.transactionUseCase.updateTransactionStatus(id, updateTransactionStatusDto.status);
  }
}
