/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { databaseConfig } from './config/database.config';
import { Product } from './domain/entities/product.entity';
import { Transaction } from './domain/entities/transaction.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot(databaseConfig),
    TypeOrmModule.forFeature([Product, Transaction]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
