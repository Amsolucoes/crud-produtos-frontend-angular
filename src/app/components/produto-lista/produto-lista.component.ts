import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Produto } from '../../models/produto';
import { ProdutoService } from '../../services/produto.service';

@Component({
  selector: 'app-produto-lista',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './produto-lista.component.html',
  styleUrl: './produto-lista.component.css'
})
export class ProdutoListaComponent implements OnInit {
  produtos: Produto[] = [];

  constructor(private produtoService: ProdutoService) {}

  ngOnInit(): void {
    this.carregarProdutos();
  }

  carregarProdutos(): void {
    this.produtoService.listar().subscribe({
      next: (dados) => (this.produtos = dados),
      error: (erro) => console.error('Erro ao carregar produtos:', erro)
    });
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
}
