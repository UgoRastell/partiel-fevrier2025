import { Controller, Get, UseGuards } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

@Controller('dashboard')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('admin') // Seuls les admins ont accès aux statistiques
export class DashboardController {
    constructor(private readonly dashboardService: DashboardService) { }

    @Get()
    getStats() {
        return this.dashboardService.getDashboardStats();
    }
}
