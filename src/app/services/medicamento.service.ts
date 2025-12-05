import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Medicamento {
    idMedicamento: string;
    idPaciente: string;
    nombre: string;
    dosis?: string | null;
    frecuencia?: string | null;
    via?: string | null;
    fechaInicio?: string | Date | null;
    fechaFin?: string | Date | null;
    activo: boolean;
    fechaCreacion: string | Date;
}

@Injectable({
  providedIn: 'root',
})
export class MedicamentoService {
  private apiUrl = 'https://localhost:7046/api/chronicare/Medicamento';

  constructor(private _http: HttpClient) {}

  getAllByPaciente(idPaciente: string): Observable<any> {
    return this._http.get(`${this.apiUrl}/GetAllByPaciente/${idPaciente}`);
  }

  getById(id: string): Observable<any> {
    return this._http.get<Medicamento>(`${this.apiUrl}/GetById/${id}`);
  }
  
  create(data: Partial<Medicamento>): Observable<any> {
    console.log('Creating medicamento with data:', data);
    return this._http.post<Medicamento>(`${this.apiUrl}/Create`, data);
  }

  update(data: Partial<Medicamento>): Observable<any> {
    return this._http.put<Medicamento>(`${this.apiUrl}/Update`, data);
  }

  activate(id: string): Observable<void> {
    return this._http.patch<void>(`${this.apiUrl}/Activar/${id}`, {});
  }

  deactivate(id: string): Observable<void> {
    return this._http.patch<void>(`${this.apiUrl}/Inactivar/${id}`, {});
  }
}
