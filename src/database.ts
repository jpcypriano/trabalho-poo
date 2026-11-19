// Configuração do banco PostgreSQL (usada pela API e pelo seed).
// Valores padrão: usuário e senha "postgres", banco "loja" na porta 5432.
// Se o seu PostgreSQL for diferente, altere aqui ou use variáveis de ambiente.
export const dbConfig = {
  type: 'postgres' as const,
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 5432,
  username: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASS || 'abc',
  database: process.env.DB_NAME || 'loja',
  synchronize: true, // cria/atualiza as tabelas automaticamente
};
