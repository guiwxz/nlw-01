import Knex from 'knex';
// import declarado com letra maiuscula significa os tipos q essa variavel possui -> knex.schema

                    // essa function up recebe como parametro o knex pra ter todas funcionalidades dele
export async function up(knex: Knex){ // to dizendo que o parametro knex tem os tipos do Knex que foi importado la
    // CRIAR TABELA

    return knex.schema.createTable('items', table => {
        table.increments('id').primary() // primeiro campo é de incremento, ou seja, cada novo registro do 'points' vai ter um id (0, 1, 2, 3...). 
                              //.primary significa que vai ser a chave primaria
        
        table.string('image').notNullable();
        table.string('title').notNullable();
    })
}

export async function down(knex: Knex){
    // VOLTAR ATRAS (DELETAR A TABELA)

    return knex.schema.dropTable('point');
}