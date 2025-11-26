import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { DrawerModule } from 'primeng/drawer';
import { MenuModule } from 'primeng/menu';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ButtonModule, DrawerModule, MenuModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  sidebarVisible: boolean = false;
  
  menuItems = [
    { label: 'Dashboard', icon: 'pi pi-home', routerLink: '/' },
    { label: 'Pacientes', icon: 'pi pi-users', routerLink: '/pacientes' },
    { label: 'Reportes', icon: 'pi pi-chart-line', routerLink: '/reports' },
    { label: 'Configuración', icon: 'pi pi-cog', routerLink: '/settings' }
  ];

  protected readonly title = signal('ChronicareWebApp');

  constructor() {
    this.sidebarVisible = false;
  }
}
