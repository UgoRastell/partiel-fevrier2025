import { Controller, Get, Post, Put, Delete, Param, Body, UseGuards } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { Order } from './entities/order.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

@Controller('orders')
@UseGuards(JwtAuthGuard) // Protège toutes les routes par défaut
export class OrdersController {
    constructor(private readonly ordersService: OrdersService) { }

    @Get()
    @UseGuards(RolesGuard)
    @Roles('admin') // Seuls les admins peuvent voir toutes les commandes
    findAll(): Promise<Order[]> {
        return this.ordersService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string): Promise<Order> {
        return this.ordersService.findOne(+id);
    }

    @Post()
    create(@Body() orderData: { products: number[], quantities: { [key: number]: number } }): Promise<Order> {
        return this.ordersService.create(orderData);
    }

    @Put(':id/status')
    @UseGuards(RolesGuard)
    @Roles('admin') // Seuls les admins peuvent modifier le statut des commandes
    updateStatus(@Param('id') id: string, @Body() body: { status: string }) {
        return this.ordersService.updateStatus(+id, body.status);
    }

    @Delete(':id')
    @UseGuards(RolesGuard)
    @Roles('admin') // Seuls les admins peuvent annuler une commande
    remove(@Param('id') id: string) {
        return this.ordersService.remove(+id);
    }
}
