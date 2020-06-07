import knex from 'knex';
import path from 'path';

// CONFIGURAÇÃO DO BANCO DE DADOS
const connection = knex({
    client: 'sqlite3',
    connection: { // path.resolve serve pra escrever o diretorio de um arquivo para q ele padronize automaticamente
        filename: path.resolve(__dirname, 'database.sqlite') // dirname é uma variavel global que retorna o caminho atual do arquivo (src/database/connections.ts)
    },
    useNullAsDefault: true,
})

export default connection;    

// Migrations = histórico do banco de dados