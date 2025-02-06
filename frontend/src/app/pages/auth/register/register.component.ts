import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  template: `
    <div class="auth-container">
      <h2>Inscription</h2>
      <form [formGroup]="registerForm" (ngSubmit)="register()">
        <label>Email</label>
        <input type="email" formControlName="email">
        <div *ngIf="registerForm.get('email')?.invalid && registerForm.get('email')?.touched" class="error">
          Un email valide est requis.
        </div>

        <label>Mot de passe</label>
        <input type="password" formControlName="password">
        <div *ngIf="registerForm.get('password')?.invalid && registerForm.get('password')?.touched" class="error">
          Le mot de passe doit contenir au moins 6 caractères.
        </div>

        <button type="submit" [disabled]="registerForm.invalid">S'inscrire</button>
        <p *ngIf="successMessage" class="success">{{ successMessage }}</p>
        <p *ngIf="errorMessage" class="error">{{ errorMessage }}</p>
      </form>
      <p>Déjà un compte ? <a routerLink="/login">Se connecter</a></p>
    </div>
  `
})
export class RegisterComponent {
  registerForm: FormGroup;
  successMessage: string = '';
  errorMessage: string = '';

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  register(): void {
    if (this.registerForm.valid) {
      this.authService.register(this.registerForm.value.email, this.registerForm.value.password).subscribe({
        next: () => {
          this.successMessage = 'Compte créé avec succès !';
          setTimeout(() => this.router.navigate(['/login']), 2000);
        },
        error: () => {
          this.errorMessage = 'Une erreur est survenue';
        }
      });
    }
  }
}
