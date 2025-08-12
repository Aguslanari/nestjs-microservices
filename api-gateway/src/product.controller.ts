import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  Inject,
  Query,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Controller('products')
export class ProductController {
  constructor(@Inject('PRODUCT_SERVICE') private productClient: ClientProxy) {}

  @Get()
  getProducts(@Query('category') category?: string) {
    if (category) {
      console.log('get_products_by_category');
      return this.productClient.send('get_products_by_category', { category });
    }
    return this.productClient.send('get_products', {});
  }

  @Get(':id')
  getProduct(@Param('id') id: string) {
    return this.productClient.send('get_product', { id: parseInt(id) });
  }

  @Post()
  createProduct(
    @Body() productData: { name: string; price: number; category: string },
  ) {
    console.log('create_product');
    return this.productClient.send('create_product', productData);
  }

  @Put(':id')
  updateProduct(
    @Param('id') id: string,
    @Body()
    productData: { name?: string; price?: number; category?: string },
  ) {
    console.log('update_product');
    return this.productClient.send('update_product', {
      id: parseInt(id),
      ...productData,
    });
  }

  @Delete(':id')
  deleteProduct(@Param('id') id: string) {
    console.log('delete_product');
    return this.productClient.send('delete_product', { id: parseInt(id) });
  }
}