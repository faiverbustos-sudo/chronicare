import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MessageModule } from 'primeng/message';
import { ButtonModule } from 'primeng/button';
import { InputText } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-login',
  imports: [FormsModule, MessageModule, ButtonModule, InputText, PasswordModule, CommonModule, CardModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  username = '';
  password = '';
  error = false;

  constructor(private auth: AuthService, private router: Router) {}

  onSubmit() {
    this.auth.login({ email: this.username, password: this.password })
      .subscribe({
        next: () => {
          this.error = false;
        },
        error: () => {
          this.error = true;
        }
      });
  }
}
