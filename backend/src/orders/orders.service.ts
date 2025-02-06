import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './entities/order.entity';
import { Product } from '../products/entities/product.entity';

@Injectable()
export class OrdersService {
    constructor(
        @InjectRepository(Order)
        private orderRepository: Repository<Order>,
        @InjectRepository(Product)
        private productRepository: Repository<Product>,
    ) { }

    async create(orderData: { products: number[], quantities: { [key: number]: number } }): Promise<Order> {
        const { products, quantities } = orderData;

        const orderedProducts = await this.productRepository.findByIds(products);
        if (orderedProducts.length !== products.length) {
            throw new NotFoundException('Certains produits ne sont pas disponibles.');
        }

        // Vérification et mise à jour du stock
        for (const product of orderedProducts) {
            if (product.stock < quantities[product.id]) {
                throw new BadRequestException(`Stock insuffisant pour ${product.name}`);
            }
        }

        // Déduire le stock
        for (const product of orderedProducts) {
            product.stock -= quantities[product.id];
            await this.productRepository.save(product);
        }

        const order = this.orderRepository.create({
            products: orderedProducts,
            quantities,
            status: 'En cours',
        });

        return this.orderRepository.save(order);
    }

    async findAll(): Promise<Order[]> {
        return this.orderRepository.find({ relations: ['products'] });
    }

    async findOne(id: number): Promise<Order> {
        return this.orderRepository.findOne({ where: { id }, relations: ['products'] });
    }

    async updateStatus(id: number, status: string): Promise<void> {
        const order = await this.orderRepository.findOne({ where: { id } });
        if (!order) throw new NotFoundException('Commande non trouvée');
        order.status = status;
        await this.orderRepository.save(order);
    }

    async remove(id: number): Promise<void> {
        const order = await this.orderRepository.findOne({ where: { id } });
        if (!order) throw new NotFoundException('Commande non trouvée');

        // Rétablir le stock si la commande est annulée
        if (order.status === 'En cours') {
            for (const product of order.products) {
                product.stock += order.quantities[product.id];
                await this.productRepository.save(product);
            }
        }

        await this.orderRepository.delete(id);
    }
}
