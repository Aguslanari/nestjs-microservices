import { Injectable } from '@nestjs/common';

export interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  stock: number;
  createdAt: Date;
}

@Injectable()
export class ProductService {
  private products: Product[] = [
    {
      id: 1,
      name: 'Laptop',
      price: 999.99,
      category: 'Electronics',
      stock: 10,
      createdAt: new Date(),
    },
    {
      id: 2,
      name: 'Smartphone',
      price: 599.99,
      category: 'Electronics',
      stock: 25,
      createdAt: new Date(),
    },
    {
      id: 3,
      name: 'Libro de Programación',
      price: 29.99,
      category: 'Books',
      stock: 50,
      createdAt: new Date(),
    },
  ];

  getProducts(): Product[] {
    return this.products;
  }

  getProduct(id: number): Product | null {
    const product = this.products.find((product) => product.id === id);
    return product || null;
  }

  createProduct(productData: {
    name: string;
    price: number;
    category: string;
  }): Product {
    const newProduct: Product = {
      id: this.products.length + 1,
      name: productData.name,
      price: productData.price,
      category: productData.category,
      stock: 0,
      createdAt: new Date(),
    };
    this.products.push(newProduct);
    return newProduct;
  }

  updateProduct(
    id: number,
    productData: { name?: string; price?: number; category?: string },
  ): Product | null {
    const productIndex = this.products.findIndex((product) => product.id === id);
    if (productIndex === -1) return null;

    this.products[productIndex] = {
      ...this.products[productIndex],
      ...productData,
    };
    return this.products[productIndex];
  }

  deleteProduct(id: number): boolean {
    const productIndex = this.products.findIndex((product) => product.id === id);
    if (productIndex === -1) return false;

    this.products.splice(productIndex, 1);
    return true;
  }

  getProductsByCategory(category: string): Product[] {
    return this.products.filter((product) => product.category === category);
  }
}