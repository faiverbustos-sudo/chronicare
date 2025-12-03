import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PacienteRiesgoDTO } from '../models/paciente-riesgo';

export interface Paciente {
  idPaciente: string;
  nombre: string;
  tipoDocumento: string;
  documento: string;
  telefono: string;
  email: string;
  direccion: string;
  eps: string;
  estado: boolean;
}

export interface PacienteDashboardDto {
  idPaciente: string;
  nombre: string;
  proximaCita: string;
  proximoControl: string;
  alertaDescripcion: string;
  tareas: string[];
  medicamentos: { nombre: string; dosis: string }[];
}

@Injectable({
  providedIn: 'root',
})
export class PacienteService {
  private apiUrl = 'https://localhost:7046/api/chronicare/Paciente';

  constructor(private http: HttpClient) {}

  getAll(): Observable<any> {
    return this.http.get(`${this.apiUrl}/GetAll`);
  }

  getById(id: string): Observable<Paciente> {
    return this.http.get<Paciente>(`${this.apiUrl}/GetById/${id}`);
  }

  create(data: Partial<Paciente>): Observable<Paciente> {
      return this.http.post<Paciente>(`${this.apiUrl}/Create`, data);
    }

  update(data: Partial<Paciente>): Observable<Paciente> {
    return this.http.put<Paciente>(`${this.apiUrl}/Update`, data);
  }

  activate(id: string): Observable<void> {
    return this.http.patch<void>(`${this.apiUrl}/Activar/${id}`, {});
  }

  deactivate(id: string): Observable<void> {
    return this.http.patch<void>(`${this.apiUrl}/Inactivar/${id}`, {});
  }

  getPacientesRiesgo(): Observable<PacienteRiesgoDTO[]> {
    return this.http.get<PacienteRiesgoDTO[]>(`${this.apiUrl}/PacientesRiesgo`);
  }

  getPacienteDashboard(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/PacienteDashboard`);
  }
}
