import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { Produto } from '../../models/produto';
import { ProdutoService } from '../../services/produto.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-produto-lista',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './produto-lista.component.html',
  styleUrl: './produto-lista.component.css'
})
export class ProdutoListaComponent implements OnInit {
  produtos: Produto[] = [];
  paginaAtual = 1;
  ultimaPagina = 1;
  total = 0;

  constructor(
    private produtoService: ProdutoService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.carregarProdutos();
  }

  carregarProdutos(): void {
    this.produtoService.listar(this.paginaAtual).subscribe({
      next: (resposta) => {
        this.produtos = resposta.data;
        this.paginaAtual = resposta.current_page;
        this.ultimaPagina = resposta.last_page;
        this.total = resposta.total;
      },
      error: (erro) => console.error('Erro ao carregar produtos:', erro)
    });
  }

  paginaAnterior(): void {
    if (this.paginaAtual > 1) {
      this.paginaAtual--;
      this.carregarProdutos();
    }
  }

  proximaPagina(): void {
    if (this.paginaAtual < this.ultimaPagina) {
      this.paginaAtual++;
      this.carregarProdutos();
    }
  }

  remover(id: number): void {
    if (!confirm('Tem certeza que deseja remover este produto?')) {
      return;
    }

    this.produtoService.remover(id).subscribe({
      next: () => this.carregarProdutos(),
      error: (erro) => console.error('Erro ao remover produto:', erro)
    });
  }

  sair(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
