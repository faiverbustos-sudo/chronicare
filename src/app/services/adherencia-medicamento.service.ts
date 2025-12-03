import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface AdherenciaMedicamento {
  idAdherencia: string;
  idMedicamento: string;  
  idPaciente: string;
  tomado: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class AdherenciaMedicamentoService {
  private apiUrl = 'https://localhost:7046/api/chronicare/AdherenciaMedicamento';

  constructor(private http: HttpClient) {}

  getAll(): Observable<any> {
      return this.http.get(`${this.apiUrl}/GetAll`);
    }
  
    getById(id: string): Observable<AdherenciaMedicamento> {
      return this.http.get<AdherenciaMedicamento>(`${this.apiUrl}/GetById/${id}`);
    }
  
    create(data: Partial<AdherenciaMedicamento>): Observable<AdherenciaMedicamento> {
      return this.http.post<AdherenciaMedicamento>(`${this.apiUrl}/Create`, data);
    }
  
    update(data: Partial<AdherenciaMedicamento>): Observable<AdherenciaMedicamento> {
      return this.http.put<AdherenciaMedicamento>(`${this.apiUrl}/Update`, data);
    }
}
