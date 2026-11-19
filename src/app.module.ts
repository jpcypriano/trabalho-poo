import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dbConfig } from './database';
import { ClientesModule } from './clientes/clientes.module';
import { ProdutosModule } from './produtos/produtos.module';
import { PedidosModule } from './pedidos/pedidos.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({ ...dbConfig, autoLoadEntities: true }),
    ClientesModule,
    ProdutosModule,
    PedidosModule,
  ],
})
export class AppModule {}
