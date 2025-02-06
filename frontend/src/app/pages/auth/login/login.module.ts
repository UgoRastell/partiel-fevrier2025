import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms'; // ✅ Importation nécessaire
import { LoginComponent } from './login.component';
import { RegisterComponent } from '../register/register.component';

@NgModule({
    declarations: [
        LoginComponent,
        RegisterComponent
    ],
    imports: [
        CommonModule,
        FormGroup,
        FormsModule,
        ReactiveFormsModule // ✅ Ajout de ReactiveFormsModule
    ]
})
export class AuthModule { }
