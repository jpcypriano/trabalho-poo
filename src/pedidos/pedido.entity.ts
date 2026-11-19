import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Cliente } from '../clientes/cliente.entity';
import { Produto } from '../produtos/produto.entity';

@Entity('pedidos')
export class Pedido {
  @PrimaryGeneratedColumn()
  id: number;

  // eager: true faz o cliente e o produto virem junto quando buscamos o pedido
  @ManyToOne(() => Cliente, { eager: true, onDelete: 'CASCADE' })
  cliente: Cliente;

  @ManyToOne(() => Produto, { eager: true, onDelete: 'CASCADE' })
  produto: Produto;

  @Column()
  quantidade: number;

  @Column('numeric', {
    precision: 10,
    scale: 2,
    transformer: { to: (v: number) => v, from: (v: string) => parseFloat(v) },
  })
  total: number;
}
