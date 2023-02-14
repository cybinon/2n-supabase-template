import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Deposit {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  userId: string;

  @Column()
  code: string;

  @Column()
  amount: number;

  @Column()
  status: string;

  @Column()
  createdAt: Date; // Creation date

  @Column()
  updatedAt: Date; // Last updated date
}
