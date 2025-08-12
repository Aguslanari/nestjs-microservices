import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { ProductService } from './product.service';

@Controller()
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @MessagePattern('get_products')
  getProducts() {
    console.log('get_products');
    return this.productService.getProducts();
  }

  @MessagePattern('get_product')
  getProduct(data: { id: number }) {
    console.log('get_product');
    return this.productService.getProduct(data.id);
  }

  @MessagePattern('create_product')
  createProduct(data: { name: string; price: number; category: string }) {
    console.log('create_product');
    return this.productService.createProduct(data);
  }

  @MessagePattern('update_product')
  updateProduct(data: {
    id: number;
    name?: string;
    price?: number;
    category?: string;
  }) {
    console.log('update_product');
    return this.productService.updateProduct(data.id, data);
  }

  @MessagePattern('delete_product')
  deleteProduct(data: { id: number }) {
    console.log('delete_product');
    return this.productService.deleteProduct(data.id);
  }

  @MessagePattern('get_products_by_category')
  getProductsByCategory(data: { category: string }) {
    console.log('get_products_by_category');
    return this.productService.getProductsByCategory(data.category);
  }
}