import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Produto } from '../models/produto';
import { Pagina } from '../models/pagina';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {
  private apiUrl = 'http://127.0.0.1:8000/api/produtos';

  constructor(private http: HttpClient) {}

  listar(pagina: number = 1): Observable<Pagina<Produto>> {
    return this.http.get<Pagina<Produto>>(`${this.apiUrl}?page=${pagina}`);
  }

  buscarPorId(id: number): Observable<Produto> {
    return this.http.get<Produto>(`${this.apiUrl}/${id}`);
  }

  criar(produto: Produto): Observable<Produto> {
    return this.http.post<Produto>(this.apiUrl, produto);
  }

  atualizar(id: number, produto: Produto): Observable<Produto> {
    return this.http.put<Produto>(`${this.apiUrl}/${id}`, produto);
  }

  remover(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
