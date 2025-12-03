import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'https://localhost:7046/api/chronicare/Auth/Login';

  constructor(private http: HttpClient, private router: Router) {}

  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post(this.apiUrl, credentials).pipe(
      tap((response: any) => {
        if (response?.token) {
          localStorage.setItem('token', response.token);

          // Obtener rol desde el token
          const role = this.getRole();
          console.log('Rol del usuario:', role);

          // Redirección
          if (role === 'Admin' || role === 'Medico') {
            this.router.navigate(['/dashboard']);
          } else if (role === 'Paciente') {
            console.log('Navegando al paciente dashboard');
            this.router.navigate(['/paciente-dashboard']);
          } else {
            // Perfil desconocido → cerrar sesión
            localStorage.removeItem('token');
            this.router.navigate(['/login']);
          }
        }
      })
    );
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getRole(): string | null {
    const token = localStorage.getItem('token');
    if (!token) return null;

    const decoded: any = jwtDecode(token);
    console.log('Token decodificado:', decoded);
    return decoded.roles ?? decoded.perfil ?? null; 
  }
}
