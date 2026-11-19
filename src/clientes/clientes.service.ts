import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cliente } from './cliente.entity';

@Injectable()
export class ClientesService {
  constructor(
    @InjectRepository(Cliente)
    private repo: Repository<Cliente>,
  ) {}

  listar() {
    return this.repo.find();
  }

  async buscar(id: number) {
    const cliente = await this.repo.findOneBy({ id });
    if (!cliente) {
      throw new NotFoundException('Cliente não encontrado');
    }
    return cliente;
  }

  criar(dados: Partial<Cliente>) {
    const cliente = this.repo.create(dados);
    return this.repo.save(cliente);
  }

  async remover(id: number) {
    const cliente = await this.buscar(id);
    await this.repo.remove(cliente);
    return { mensagem: 'Cliente removido' };
  }
}
