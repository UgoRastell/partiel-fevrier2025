import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms'; // ✅ Importation nécessaire
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { routes } from './app.routes'; // ✅ Importation des routes depuis app.route.ts

import { AppComponent } from './app.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { RegisterComponent } from './pages/auth/register/register.component';
import { ProductsComponent } from './pages/products/products.component';
import { OrdersComponent } from './pages/orders/orders.component';
import { UsersComponent } from './pages/users/users.component';

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        RegisterComponent,
        ProductsComponent,
        OrdersComponent,
        UsersComponent
    ],
    imports: [
        BrowserModule,
        ReactiveFormsModule, // ✅ Importation nécessaire pour Reactive Forms
        HttpClientModule,
        RouterModule.forRoot(routes) // ✅ Utilisation correcte des routes
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
