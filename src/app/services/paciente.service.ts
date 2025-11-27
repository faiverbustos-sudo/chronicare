import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PacienteRiesgoDTO } from '../models/paciente-riesgo';

export interface Paciente {
  idPaciente: string;
  nombre: string;
  identificacion: string;
  telefono: string;
  email: string;
  direccion: string;
  estado: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class PacienteService {
  private apiUrl = 'https://localhost:7046/api/chronicare/Paciente';

  constructor(private http: HttpClient) {}

  getAll(): Observable<any> {
    return this.http.get(`${this.apiUrl}/All`);
  }

  create(data: Partial<Paciente>): Observable<Paciente> {
    return this.http.post<Paciente>(this.apiUrl, data);
  }

  update(id: string, data: Partial<Paciente>): Observable<Paciente> {
    return this.http.put<Paciente>(`${this.apiUrl}/${id}`, data);
  }

  activate(id: string): Observable<void> {
    return this.http.patch<void>(`${this.apiUrl}/${id}/activar`, {});
  }

  deactivate(id: string): Observable<void> {
    return this.http.patch<void>(`${this.apiUrl}/${id}/desactivar`, {});
  }

  getPacientesRiesgo(): Observable<PacienteRiesgoDTO[]> {
    return this.http.get<PacienteRiesgoDTO[]>(`${this.apiUrl}/PacientesRiesgo`);
  }
}
