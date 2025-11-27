import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MessageModule } from 'primeng/message';
import { Button, ButtonModule } from 'primeng/button';
import { InputText } from 'primeng/inputtext';
import { Password, PasswordModule } from 'primeng/password';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [FormsModule, MessageModule, ButtonModule, InputText, PasswordModule, CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  username = '';
  password = '';
  error = false;

  constructor(private auth: AuthService, private router: Router) {}

  onSubmit() {
    this.auth.login({ usuario: this.username, password: this.password })
      .subscribe({
        next: () => {
          this.error = false;
          this.router.navigate(['/dashboard']);
        },
        error: () => {
          this.error = true;
        }
      });
  }
}
