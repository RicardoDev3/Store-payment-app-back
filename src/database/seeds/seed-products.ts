/* eslint-disable prettier/prettier */
import { Product } from 'src/domain/entities/product.entity';
import { DataSource } from 'typeorm';


const seedProducts = async (dataSource: DataSource) => {
  const productRepository = dataSource.getRepository(Product);

  // Datos ficticios para poblar la tabla products
  const products = [
    {
      name: "ASUS ROG ZEPHYRUS G16",
      price: 6383376,
      stock: 17,
    },
    {
      name: "ASUS ZENBOOK DUO",
      price: 6513737,
      stock: 15,
    },
    {
      name: "MSI KATANA GF76",
      price: 5814130,
      stock: 8,
    },
    {
      name: "ALIENWARE M17R5",
      price: 8065041,
      stock: 3,
    },
  ];

  console.log('Seeding products...');
  for (const product of products) {
    const existingProduct = await productRepository.findOneBy({ name: product.name });
    if (!existingProduct) {
      await productRepository.save(product);
      console.log(`Product ${product.name} added.`);
    } else {
      console.log(`Product ${product.name} already exists.`);
    }
  }
  console.log('Seeding completed.');
};

export default seedProducts;
