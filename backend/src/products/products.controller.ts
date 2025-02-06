import { Controller, Get, Post, Put, Delete, Param, Body, UseGuards } from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product } from './entities/product.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) { }

  @Get()
  findAll(): Promise<Product[]> {
    return this.productsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Product> {
    return this.productsService.findOne(+id);
  }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin') // Seuls les admins peuvent ajouter un produit
  create(@Body() product: Product): Promise<Product> {
    return this.productsService.create(product);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin') // Seuls les admins peuvent modifier un produit
  update(@Param('id') id: string, @Body() product: Partial<Product>) {
    return this.productsService.update(+id, product);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin') // Seuls les admins peuvent supprimer un produit
  remove(@Param('id') id: string) {
    return this.productsService.remove(+id);
  }
}
