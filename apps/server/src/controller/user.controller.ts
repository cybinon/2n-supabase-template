import { Body, Controller, Get, Logger, Post, Query, Request, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UserService } from '../service/user.service';
import { UserJWTGuard } from '../middleware/user_jwt.guard';
import { OrderService } from '../service/order.service';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource, In } from 'typeorm';

const logger = new Logger('UserController');
@ApiBearerAuth('user-jwt-token')
@ApiTags('User')
@UseGuards(UserJWTGuard)
@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly orderService: OrderService,
    @InjectDataSource() private readonly dataSource: DataSource
  ) {}


  @Get("orders")
  async getOrders(@Request() req: any, @Query() query: any) {
    const { user } = req;
    const { page, limit } = query;
    const orders = await this.orderService.getOrders(user.sub, page, limit);
    return orders;
  }
  
  @Post("order/create")
  async createOrder(@Body() body: any, @Request() req: any) {
    const { user } = req;
    const { address, products } = body;

    const repoProduct = this.dataSource.getRepository('product');
    const prs = await repoProduct.find({
      where: {
        id: In(products.map((item) => item.id)),
      }
    });
    const filteredProducts = prs.filter((pr) => {
      const item = products.find((r) => r.id === pr.id);
      return pr.quantity >= item.quantity;
    });
    const order = await this.orderService.createOrder(user.sub, address, filteredProducts.map((item) => ({
      id: item.id,
      price: item.price,
      quantity: products.find((p) => p.id === item.id).quantity
    })));
    // return order;    
  }
  
  @Get("info")
  async getUserInfo(@Request() req: any) {
    const { user } = req;
    const initedUser = await this.userService.initUser(user.sub);
    return initedUser;
  }

  @Post("info/update")
  async updateInfo(@Body() body: any, @Request() req: any) {
     const { city, district, address, phone } = body;
     const { user } = req;
     const updatedUser = await this.userService.updateUser(user.sub, { city, district, address, phone });
    return updatedUser;
  }
}
