/* eslint-disable prettier/prettier */
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CreateTransactionUseCase } from "src/application/use-cases/create-transaction.use-case";
import { TransactionController } from "src/controllers/transaction.controller";
import { Product } from "src/domain/entities/product.entity";
import { Transaction } from "src/domain/entities/transaction.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Transaction, Product])],
    providers: [CreateTransactionUseCase],
    controllers: [TransactionController],
  })
  export class TransactionModule {}