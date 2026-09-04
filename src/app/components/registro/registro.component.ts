import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css'
})
export class RegistroComponent {
  form: FormGroup;
  erro = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      password_confirmation: ['', Validators.required]
    });
  }

  cadastrar(): void {
    if (this.form.invalid) {
      return;
    }

    if (this.form.value.password !== this.form.value.password_confirmation) {
      this.erro = 'As senhas não coincidem.';
      return;
    }

    this.erro = '';

    this.authService.registrar(this.form.value).subscribe({
      next: () => this.router.navigate(['/']),
      error: (erro) => (this.erro = erro.error?.message || 'Erro ao cadastrar. Tente novamente.')
    });
  }
}
