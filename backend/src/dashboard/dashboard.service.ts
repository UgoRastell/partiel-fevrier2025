import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from '../orders/entities/order.entity';
import { Product } from '../products/entities/product.entity';

@Injectable()
export class DashboardService {
    constructor(
        @InjectRepository(Order)
        private orderRepository: Repository<Order>,
        @InjectRepository(Product)
        private productRepository: Repository<Product>,
    ) { }

    async getTotalOrders(): Promise<number> {
        return this.orderRepository.count();
    }

    async getTopSellingProducts(): Promise<{ name: string; sold: number }[]> {
        const orders = await this.orderRepository.find();
        const productSales = {};

        orders.forEach(order => {
            Object.keys(order.quantities).forEach(productId => {
                if (!productSales[productId]) {
                    productSales[productId] = 0;
                }
                productSales[productId] += order.quantities[productId];
            });
        });

        const productList = await this.productRepository.findByIds(Object.keys(productSales).map(id => parseInt(id)));

        return productList
            .map(product => ({
                name: product.name,
                sold: productSales[product.id] || 0,
            }))
            .sort((a, b) => b.sold - a.sold)
            .slice(0, 5); // Retourne les 5 meilleurs produits
    }

    async getStockLevels(): Promise<{ name: string; stock: number }[]> {
        const products = await this.productRepository.find();
        return products.map(product => ({
            name: product.name,
            stock: product.stock,
        }));
    }

    async getDashboardStats() {
        const totalOrders = await this.getTotalOrders();
        const topSellingProducts = await this.getTopSellingProducts();
        const stockLevels = await this.getStockLevels();

        return {
            totalOrders,
            topSellingProducts,
            stockLevels,
        };
    }
}
