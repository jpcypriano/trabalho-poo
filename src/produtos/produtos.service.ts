import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Produto } from './produto.entity';

@Injectable()
export class ProdutosService {
  constructor(
    @InjectRepository(Produto)
    private repo: Repository<Produto>,
  ) {}

  listar() {
    return this.repo.find();
  }

  async buscar(id: number) {
    const produto = await this.repo.findOneBy({ id });
    if (!produto) {
      throw new NotFoundException('Produto não encontrado');
    }
    return produto;
  }

  criar(dados: Partial<Produto>) {
    const produto = this.repo.create(dados);
    return this.repo.save(produto);
  }

  async remover(id: number) {
    const produto = await this.buscar(id);
    await this.repo.remove(produto);
    return { mensagem: 'Produto removido' };
  }
}
