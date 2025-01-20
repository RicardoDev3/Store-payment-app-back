/* eslint-disable prettier/prettier */
import axios from 'axios';

export class WompiService {
  private apiUrl: string;
  private publicKey: string;
  private privateKey: string;

  constructor() {
    this.apiUrl = process.env.WOMPI_API_URL || 'https://api-sandbox.co.uat.wompi.dev/v1';
    this.publicKey = process.env.WOMPI_PUBLIC_KEY || '';
    this.privateKey = process.env.WOMPI_PRIVATE_KEY || '';
  }

  async createTransaction(transactionData: any) {
    try {
      const response = await axios.post(
        `${this.apiUrl}/transactions`,
        {
          ...transactionData,
          // Asegúrate de agregar los datos necesarios para la transacción
        },
        {
          headers: {
            Authorization: `Bearer ${this.privateKey}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error('Error creating transaction with Wompi:', error);
      throw new Error('Error creating transaction with Wompi');
    }
  }
}
