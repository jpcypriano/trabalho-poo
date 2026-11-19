import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { dbConfig } from './database';
import { Cliente } from './clientes/cliente.entity';
import { Produto } from './produtos/produto.entity';
import { Pedido } from './pedidos/pedido.entity';

// Rodar com: npx ts-node src/seed.ts
async function seed() {
  const dataSource = new DataSource({
    ...dbConfig,
    entities: [Cliente, Produto, Pedido],
  });
  await dataSource.initialize();

  // limpa as tabelas pro seed poder ser rodado mais de uma vez
  await dataSource.query('TRUNCATE TABLE pedidos, produtos, clientes RESTART IDENTITY CASCADE');

  const clientesRepo = dataSource.getRepository(Cliente);
  const produtosRepo = dataSource.getRepository(Produto);
  const pedidosRepo = dataSource.getRepository(Pedido);

  const clientes = await clientesRepo.save([
    { nome: 'Maria Silva', email: 'maria@email.com' },
    { nome: 'João Souza', email: 'joao@email.com' },
    { nome: 'Ana Pereira', email: 'ana@email.com' },
  ]);

  const produtos = await produtosRepo.save([
    { nome: 'Teclado', preco: 120.5, estoque: 30 },
    { nome: 'Mouse', preco: 59.9, estoque: 50 },
    { nome: 'Monitor', preco: 899.0, estoque: 10 },
    { nome: 'Headset', preco: 199.9, estoque: 20 },
  ]);

  await pedidosRepo.save([
    { cliente: clientes[0], produto: produtos[0], quantidade: 1, total: 120.5 },
    { cliente: clientes[1], produto: produtos[1], quantidade: 2, total: 119.8 },
    { cliente: clientes[2], produto: produtos[2], quantidade: 1, total: 899.0 },
  ]);

  console.log('Seed concluído: 3 clientes, 4 produtos e 3 pedidos criados.');
  await dataSource.destroy();
}

seed().catch((erro) => {
  console.error('Erro ao rodar o seed:', erro);
  process.exit(1);
});
