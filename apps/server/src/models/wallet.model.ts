import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Wallet {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  address: string;

  @Column({
    type: 'decimal',
    default: 0,
  })
  balance: number;

  @Column({ nullable: true })
  userId: string;
}
