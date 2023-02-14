import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryColumn,
} from 'typeorm';
import { Order } from './order';
import { Wallet } from './wallet.model';

@Entity()
export class User {
  @PrimaryColumn()
  id: string;

  @Column({nullable:true})
  full_name: string;

  @Column({nullable:true})
  email: string;

  @Column({ nullable: true })
  phone: string;

  @Column({ nullable: true })
  city: string;

  @Column({ nullable: true })
  district: string;

  @Column({ nullable: true })
  address: string;

  @Column({ default: 'auth' })
  profileLvl: string;

  @Column({nullable:true})
  refer: string;

  @OneToOne(() => Wallet)
  @JoinColumn()
  wallet: Wallet;

  @OneToMany(() => Order, (order) => order.user)
  orders: Order;

  @CreateDateColumn({ default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @CreateDateColumn({ default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}
