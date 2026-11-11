import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { ProductsModule } from './products/products.module.js';
import { ConfigModule } from '@nestjs/config';
@Module({
  imports: [ProductsModule,
  ConfigModule.forRoot({
      isGlobal: true,
}),],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
