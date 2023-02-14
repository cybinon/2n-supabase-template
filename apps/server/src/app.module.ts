import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TerminusModule } from '@nestjs/terminus';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { controllers } from './controller/inext';
import { HealthController } from './health.controller';
import { Product } from './models/product.model';
import { Transaction } from './models/transaction.model';
import { User } from './models/user.model';
import { OrderItem } from './models/order_item';
import { Wallet } from './models/wallet.model';
import { Order } from './models/order';
import { UserService } from './service/user.service';
import { OrderService } from './service/order.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.local'],
    }),
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'postgres',
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT || 5432),
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        autoLoadEntities: true,
        synchronize: process.env.DB_SYNC === 'true',
        entities: [User, Wallet, Transaction, Product, Order, OrderItem],
      }),
    }),
    TerminusModule,
  ],
  providers: [UserService, OrderService],
  controllers: [AppController, HealthController, ...controllers],
})
export class AppModule {}
