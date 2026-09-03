import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProdutoService } from '../../services/produto.service';

@Component({
  selector: 'app-produto-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './produto-form.component.html',
  styleUrl: './produto-form.component.css'
})
export class ProdutoFormComponent implements OnInit {
  form: FormGroup;
  produtoId: number | null = null;
  modoEdicao = false;

  constructor(
    private fb: FormBuilder,
    private produtoService: ProdutoService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.form = this.fb.group({
      nome: ['', Validators.required],
      descricao: [''],
      preco: [0, [Validators.required, Validators.min(0)]],
      quantidade_estoque: [0, Validators.min(0)]
    });
  }

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');

    if (idParam) {
      this.modoEdicao = true;
      this.produtoId = Number(idParam);
      this.carregarProduto(this.produtoId);
    }
  }

  carregarProduto(id: number): void {
    this.produtoService.buscarPorId(id).subscribe({
      next: (produto) => this.form.patchValue(produto),
      error: (erro) => console.error('Erro ao carregar produto:', erro)
    });
  }

  salvar(): void {
    if (this.form.invalid) {
      return;
    }

    const produto = this.form.value;

    const operacao = this.modoEdicao
      ? this.produtoService.atualizar(this.produtoId!, produto)
      : this.produtoService.criar(produto);

    operacao.subscribe({
      next: () => this.router.navigate(['/']),
      error: (erro) => console.error('Erro ao salvar produto:', erro)
    });
  }

  cancelar(): void {
    this.router.navigate(['/']);
  }
}
