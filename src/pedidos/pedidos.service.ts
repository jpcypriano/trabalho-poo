import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pedido } from './pedido.entity';
import { Cliente } from '../clientes/cliente.entity';
import { Produto } from '../produtos/produto.entity';

@Injectable()
export class PedidosService {
  constructor(
    @InjectRepository(Pedido)
    private pedidosRepo: Repository<Pedido>,
    @InjectRepository(Cliente)
    private clientesRepo: Repository<Cliente>,
    @InjectRepository(Produto)
    private produtosRepo: Repository<Produto>,
  ) {}

  listar() {
    return this.pedidosRepo.find();
  }

  async buscar(id: number) {
    const pedido = await this.pedidosRepo.findOneBy({ id });
    if (!pedido) {
      throw new NotFoundException('Pedido não encontrado');
    }
    return pedido;
  }

  async criar(dados: { clienteId: number; produtoId: number; quantidade: number }) {
    const cliente = await this.clientesRepo.findOneBy({ id: dados.clienteId });
    if (!cliente) {
      throw new BadRequestException('Cliente não existe');
    }

    const produto = await this.produtosRepo.findOneBy({ id: dados.produtoId });
    if (!produto) {
      throw new BadRequestException('Produto não existe');
    }

    if (!dados.quantidade || dados.quantidade <= 0) {
      throw new BadRequestException('Quantidade inválida');
    }

    if (produto.estoque < dados.quantidade) {
      throw new BadRequestException('Estoque insuficiente');
    }

    // desconta do estoque e calcula o total do pedido
    produto.estoque = produto.estoque - dados.quantidade;
    await this.produtosRepo.save(produto);

    const pedido = this.pedidosRepo.create({
      cliente,
      produto,
      quantidade: dados.quantidade,
      total: produto.preco * dados.quantidade,
    });
    return this.pedidosRepo.save(pedido);
  }

  async remover(id: number) {
    const pedido = await this.buscar(id);
    await this.pedidosRepo.remove(pedido);
    return { mensagem: 'Pedido removido' };
  }
}
