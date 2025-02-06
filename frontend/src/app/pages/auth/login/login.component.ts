import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  template: `
    <div class="auth-container">
      <h2>Connexion</h2>
      <form [formGroup]="loginForm" (ngSubmit)="login()">
        <label>Email</label>
        <input type="email" formControlName="email">
        <div *ngIf="loginForm.get('email')?.invalid && loginForm.get('email')?.touched" class="error">
          Un email valide est requis.
        </div>

        <label>Mot de passe</label>
        <input type="password" formControlName="password">
        <div *ngIf="loginForm.get('password')?.invalid && loginForm.get('password')?.touched" class="error">
          Le mot de passe doit contenir au moins 6 caractères.
        </div>

        <button type="submit" [disabled]="loginForm.invalid">Se connecter</button>
        <p *ngIf="errorMessage" class="error">{{ errorMessage }}</p>
      </form>
      <p>Pas encore de compte ? <a routerLink="/register">Créer un compte</a></p>
    </div>
  `
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string = '';

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  login(): void {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value.email, this.loginForm.value.password).subscribe({
        next: (response) => {
          this.authService.saveToken(response.access_token);
          this.router.navigate(['/products']);
        },
        error: () => {
          this.errorMessage = 'Email ou mot de passe incorrect';
        }
      });
    }
  }
}
