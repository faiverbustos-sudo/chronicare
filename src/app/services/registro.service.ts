import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Registro {
  idPaciente: string;
  idMedico?: string;
  tipoRegistro: string;
  valorNumerico? : number;
  valorSistolica?: number;
  valorDiastolica?: number;
  unidad?: string;
  observaciones?: string;
}

@Injectable({
  providedIn: 'root',
})
export class RegistroService {
  private apiUrl = 'https://localhost:7046/api/chronicare/Registro';

  constructor(private http: HttpClient) {}

  getById(id: string): Observable<Registro> {
    return this.http.get<Registro>(`${this.apiUrl}/GetById/${id}`);
  }

  create(data: Partial<Registro>): Observable<Registro> {
    return this.http.post<Registro>(`${this.apiUrl}/Create`, data);
  }

  update(data: Partial<Registro>): Observable<Registro> {
    return this.http.put<Registro>(`${this.apiUrl}/Update`, data);
  }
}
