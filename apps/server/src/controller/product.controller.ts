import { Controller, Get } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

@Controller('product')
export class ProductController {
  constructor(
    @InjectDataSource() private readonly dataSource: DataSource) { }

  @Get('')
  async getProducts() {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();

    const products = await queryRunner.query('SELECT * FROM product WHERE status = $1', ['active']);
    const count = await queryRunner.query('SELECT COUNT(*) FROM product WHERE status = $1', ['active']);

    return {
      count,
      items: products,
    };
  }
}
