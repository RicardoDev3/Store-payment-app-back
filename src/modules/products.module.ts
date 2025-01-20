/* eslint-disable prettier/prettier */
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProductsController } from "src/controllers/products.controller";
import { Product } from "src/domain/entities/product.entity";
import { ProductsService } from "src/service/products.service";

@Module({
    imports: [TypeOrmModule.forFeature([Product])],
    controllers: [ProductsController],
    providers: [ProductsService],
  })
  export class ProductsModule {}