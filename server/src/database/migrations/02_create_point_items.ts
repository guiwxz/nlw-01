import Knex from 'knex';
// import declarado com letra maiuscula significa os tipos q essa variavel possui -> knex.schema

                    // essa function up recebe como parametro o knex pra ter todas funcionalidades dele
export async function up(knex: Knex){ // to dizendo que o parametro knex tem os tipos do Knex que foi importado la
    // CRIAR TABELA

    return knex.schema.createTable('point_items', table => {
        table.increments('id').primary() // primeiro campo é de incremento, ou seja, cada novo registro do 'points' vai ter um id (0, 1, 2, 3...). 
                              //.primary significa que vai ser a chave primaria
        
        table.integer('point_id') //cria uma chave estrangeira
            .notNullable()
            .references('id')   // no campo id
            .inTable('points'); // na tabela points
        // todo point_id dentro dessa tabela, precisa ser um id valido na tabela points

        table.integer('item_id') // cria uma chave estrangeira
            .notNullable()
            .references('id')   // no campo id
            .inTable('items');  // na tabela items
        // todo item_id nessa tabela precisa ser valido na tabela de items
    })
}

export async function down(knex: Knex){
    // VOLTAR ATRAS (DELETAR A TABELA)

    return knex.schema.dropTable('point');
}