import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cliente } from '../models/cliente';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private baseEndpoint='http://localhost:8080/client';
  
  private cabeceras: HttpHeaders = new HttpHeaders({
  'Content-Type': 'application/json'
})
  constructor(private http: HttpClient) { }

  public listar(): Observable<Cliente[]>{
    return this.http.get<Cliente[]>(this.baseEndpoint);
 }

 public ver(id: number): Observable<Cliente>{
  return this.http.get<Cliente>(`${this.baseEndpoint}/${id}`)
}

public crear(cliente: Cliente): Observable<Cliente>{
  return this.http.post<Cliente>(this.baseEndpoint, cliente, {headers: this.cabeceras});
}

public editar(cliente: Cliente): Observable<Cliente>{
  return this.http.put<Cliente>(`${this.baseEndpoint}/${cliente.id}`, cliente, {headers: this.cabeceras});
}

public eliminar(id: number): Observable<void>{
  return this.http.delete<void>(`${this.baseEndpoint}/${id}`);
}
}
