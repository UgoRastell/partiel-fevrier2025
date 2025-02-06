import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../services/dashboard.service';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
    totalOrders: number | undefined;
    topSellingProducts: any[] = [];
    stockLevels: any[] = [];

    constructor(private dashboardService: DashboardService) { }

    ngOnInit(): void {
        this.dashboardService.getDashboardStats().subscribe(stats => {
            this.totalOrders = stats.totalOrders;
            this.topSellingProducts = stats.topSellingProducts;
            this.stockLevels = stats.stockLevels;
        });
    }
}
