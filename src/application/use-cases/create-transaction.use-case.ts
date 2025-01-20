/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import axios from 'axios';
import { Product } from 'src/domain/entities/product.entity';
import { Transaction } from 'src/domain/entities/transaction.entity';
import { In, Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class CreateTransactionUseCase {
  private readonly WompiApiUrl =
    'https://api-sandbox.co.uat.wompi.dev/v1/transactions';
  private readonly WompiPublicKey =
    'pub_stagtest_g2u0HQd3ZMh05hsSgTS2lUV8t3s4mOt7';
  private readonly WompiPrivateKey =
    'prv_stagtest_5i0ZGIGiFcDQifYsXxvsny7Y37tKqFWg';

  constructor(
    @InjectRepository(Transaction)
    private readonly transactionRepository: Repository<Transaction>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async createTransaction(payload: any) {
    const { customerName, customerEmail, productIds, cardToken } = payload;

    console.log('Product IDs:', productIds);
    const products = await this.productRepository.find({
      where: {
        id: In(productIds),
      },
    });
    if (products.length === 0) {
      throw new Error('No products found');
    }

    // Calcula el monto total en centavos
    const totalAmount = products.reduce(
      (sum, product) => sum + product.price,
      0,
    );
    const amountInCents = totalAmount * 100; // Convierte a centavos

    // Genera un código de referencia único para la transacción
    const referenceCode = `order-${Date.now()}-${uuidv4()}`;
    console.log('reference',referenceCode)
    try {
      // Crea la transacción en Wompi
      const response = await axios.post(
        this.WompiApiUrl,
        {
          customer_name: customerName,
          customer_email: customerEmail,
          amount_in_cents: amountInCents,
          currency: 'COP',
          payment_method: {
            type: 'CARD',
            token: cardToken, // Este token debe ser generado y enviado desde el frontend
          },
          reference_code: referenceCode,
          redirect_url: 'http://localhost:5173/',
          extra_data: {
            product_ids: productIds, // Enviar todos los IDs de productos asociados
          },
        },
        {
          headers: {
            Authorization: `Bearer ${this.WompiPrivateKey}`,
          },
        },
      );

      console.log('Wompi response:', response.data);

      // Guarda la transacción en la base de datos
      const transaction = new Transaction();
      transaction.customerName = customerName;
      transaction.customerEmail = customerEmail;
      transaction.totalAmount = totalAmount;
      transaction.status = 'PENDING';
      transaction.products = products; // Relaciona los productos con la transacción
      await this.transactionRepository.save(transaction);

      // Devuelve el estado de la transacción y el URL de redirección de Wompi
      return {
        status: 'PENDING',
        transactionId: response.data.id,
        redirectUrl: response.data.url,
      };
    } catch (error) {
      console.error(
        'Error creating transaction with Wompi:',
        error.response?.data
      );
      throw new Error('Transaction creation failed');
    }
  }

  async updateTransactionStatus(
    transactionId: string,
    status: 'COMPLETED' | 'FAILED',
  ) {
    const transaction = await this.transactionRepository.findOne({
      where: { id: transactionId },
    });
    if (!transaction) {
      throw new Error('Transaction not found');
    }

    transaction.status = status;
    await this.transactionRepository.save(transaction);
    return transaction;
  }
}
