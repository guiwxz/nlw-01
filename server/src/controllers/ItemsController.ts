import { Request, Response } from 'express';
import knex from '../database/connection';

export default class itemsController {
    async index(request: Request, response: Response) {
        const items = await knex('items').select('*');
     
        // serialização de dados é quando precisar mudar como serão mostrado os dados de uma rota la no frontend. Pra ficar mais acessivel pra qm for usar
        const serializedItems = items.map(item => {
            return {
                id: item.id,
                title: item.title,
                image_url: `http://192.168.0.106:3333/uploads/${item.image}`
            };
        })
    
        return response.json(serializedItems)
    }
}