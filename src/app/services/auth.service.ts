import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

interface AuthResponse {
  user: { id: number; name: string; email: string };
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://127.0.0.1:8000/api';
  private tokenKey = 'auth_token';

  usuarioLogado = signal<boolean>(!!localStorage.getItem(this.tokenKey));

  constructor(private http: HttpClient) {}

  registrar(dados: { name: string; email: string; password: string; password_confirmation: string }): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/register`, dados).pipe(
      tap((resposta) => this.salvarToken(resposta.token))
    );
  }

  login(dados: { email: string; password: string }): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, dados).pipe(
      tap((resposta) => this.salvarToken(resposta.token))
    );
  }

  logout(): void {
    this.http.post(`${this.apiUrl}/logout`, {}).subscribe({
      complete: () => this.removerToken(),
      error: () => this.removerToken()
    });
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  private salvarToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
    this.usuarioLogado.set(true);
  }

  private removerToken(): void {
    localStorage.removeItem(this.tokenKey);
    this.usuarioLogado.set(false);
  }
}
