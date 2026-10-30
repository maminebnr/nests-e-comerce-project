import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto.js';
import { UpdateProductDto } from './dto/update-product.dto.js';
import { Product } from './entities/product.entity.js';

@Injectable()
export class ProductsService {
  private products: Product[] = [
    {
      id: 1, name: "Clavier", price: 80, stock: 12,
      category: "Informatique", isActive: true
    },
    {
      id: 2, name: "Souris", price: 35, stock: 0,
      category: "Informatique", isActive: true
    },
    {
      id: 3, name: "Bureau", price: 420, stock: 5,
      category: "Mobilier", isActive: false
    },
  ];
  private nextId = 4;
  findAll(category?: string, search?: string): Product[] {
    return this.products.filter((product) => {
      const categoryOk = !category ||
        product.category.toLowerCase() === category.toLowerCase();
      const searchOk = !search ||
        product.name.toLowerCase().includes(search.toLowerCase());
      return categoryOk && searchOk;
    });
  }

  findOne(id: number): Product {
    const product = this.products.find((p) => p.id === id);
    if (!product) {
      throw new NotFoundException(`Produit ${id} introuvable`);
    }
    return product;
  }
  stats() {
    return {
      total: this.products.length,
      active: this.products.filter((p) => p.isActive).length,
      outOfStock: this.products.filter((p) => p.stock === 0).length,
      totalStock: this.products.reduce((sum, p) => sum + p.stock, 0),
    };

  }
  create(dto: CreateProductDto): Product {
    const duplicate = this.products.some((p) =>
      p.name.toLowerCase() === dto.name.toLowerCase());
    if (duplicate) {
      throw new ConflictException("Nom de produit déjà utilisé");
    }
    const product: Product = { id: this.nextId++, ...dto };
    this.products.push(product);
    return product;
  }
  update(id: number, dto: UpdateProductDto): Product {
    const product = this.findOne(id);
    if (dto.name !== undefined) {
      const duplicate = this.products.some((p) =>
        p.id !== id &&
        p.name.toLowerCase() === dto.name!.toLowerCase());
      if (duplicate) {
        throw new ConflictException("Nom de produit déjà utilisé");
      }
    }
    Object.assign(product, dto);
    return product;
  }
  remove(id: number): void {
    this.findOne(id);
    this.products = this.products.filter((p) => p.id !== id);
  }

}
