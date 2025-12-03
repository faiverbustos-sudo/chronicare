import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { DrawerModule } from 'primeng/drawer';
import { MenuModule } from 'primeng/menu';
import { AuthService } from './services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ButtonModule, DrawerModule, MenuModule, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  sidebarVisible: boolean = false;
  
  menuItems = [
    { label: 'Dashboard', icon: 'pi pi-home', routerLink: '/' },
    { label: 'Pacientes', icon: 'pi pi-users', routerLink: '/pacientes' },
    { label: 'Panel de riesgo', icon: 'pi pi-users', routerLink: '/panel-riesgo' },
    { label: 'Reportes', icon: 'pi pi-chart-line', routerLink: '/reports' },
    { label: 'Configuración', icon: 'pi pi-cog', routerLink: '/settings' }
  ];

  protected readonly title = signal('ChronicareWebApp');

  constructor(private auth: AuthService) {
    this.sidebarVisible = false;
  }

  logout() {
    this.auth.logout();
  }

  isAuthenticated(): boolean {
    return this.auth.isAuthenticated();
  }

  getRole(): string {
    return this.auth.getRole() || '';
  }
}
