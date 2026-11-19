import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('produtos')
export class Produto {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  // numeric do Postgres volta como texto, por isso o transformer converte para número
  @Column('numeric', {
    precision: 10,
    scale: 2,
    transformer: { to: (v: number) => v, from: (v: string) => parseFloat(v) },
  })
  preco: number;

  @Column({ default: 0 })
  estoque: number;
}
