/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';

@Injectable()
export class CreateTransactionUseCase {
  execute(data: any): string {
    // Implementar lógica aquí
    return 'Transacción pendiente creada';
  }
}
