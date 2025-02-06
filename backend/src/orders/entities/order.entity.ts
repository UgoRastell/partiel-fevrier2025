import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, CreateDateColumn } from 'typeorm';
import { Product } from '../../products/entities/product.entity';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToMany(() => Product)
  @JoinTable()
  products: Product[];

  @Column('json')
  quantities: { [productId: number]: number };  // Stocke les quantités commandées

  @Column({ default: 'En cours' }) // Statut par défaut
  status: string;

  @CreateDateColumn()
  createdAt: Date;
}
