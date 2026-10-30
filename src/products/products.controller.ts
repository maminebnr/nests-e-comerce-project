import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, ParseIntPipe, Query } from '@nestjs/common';
import { ProductsService } from './products.service.js';
import { CreateProductDto } from './dto/create-product.dto.js';
import { UpdateProductDto } from './dto/update-product.dto.js';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) { }

  @Get()
  findAll(
    @Query("category") category?: string,
    @Query("search") search?: string,
  ) {
    return this.productsService.findAll(category, search);
  }
  @Get("stats")
  stats() {
    return this.productsService.stats();
  }
  @Get(":id")
  findOne(@Param("id", ParseIntPipe) id: number) {
    return this.productsService.findOne(id);
  }
  @Post()
  create(@Body() dto: CreateProductDto) {
    return this.productsService.create(dto);
  }
  @Patch(":id")
  update(
    @Param("id", ParseIntPipe) id: number,
    @Body() dto: UpdateProductDto,
  ) {
    return this.productsService.update(id, dto);
  }
  @Delete(":id")
  @HttpCode(204)
  remove(@Param("id", ParseIntPipe) id: number): void {
    this.productsService.remove(id);
  }

}
