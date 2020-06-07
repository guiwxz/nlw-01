import { Request, Response } from 'express';
import knex from '../database/connection';

export default class PointsController {
    async index(request: Request, response: Response){
        const { city, uf, items } = request.query;

        const parsedItems = String(items).split(',').map(item => Number(item.trim())); // transforma a string em um array pela virgula

        const points = await knex('points')
                            .join('point_items', 'points.id', '=', 'point_items.point_id')
                            .whereIn('point_items.item_id', parsedItems)
                            .where('city', String(city))
                            .where('uf', String(uf))
                            .distinct()
                            .select('points.*');
       
        const serializedPoints = points.map(point => {
            return {
                ...points,
                image_url: `http://192.168.0.106:3333/uploads/${point.image}`
            };
        })


        response.json(serializedPoints);
    }

    async create(request: Request, response: Response){
        const { name, email, whatsapp, latitude, longitude, city, uf, items } = request.body;
    
        const trx = await knex.transaction(); // trx é a sigla pra transaction -> basicamente, usando esse modo é possivel prevenir de ocorrer falhas
                                            // na hora de criar um novo cadastro. Porque tipo, pra que dê certo, é necessario que os dois inserts funcionem corretamente.
                                            // se um dos inserts falhar o outro vai ser "anulado". Então com esse trx tem essa prevençao

        const point = {
            image: request.file.filename,
            name,
            email, 
            whatsapp,
            latitude, 
            longitude, 
            city,
            uf,
        }
            // o insert retorna o ID
        const insertedIds = await trx('points').insert(point); // para inserir um novo registro (cadastrar) na tabela escolhida ali
    
        const point_id = insertedIds[0]
    
        const pointItems = items.split(',').map((item: string) => Number(item.trim())).map((item_id: number) => {
            return {
                item_id,
                point_id
            }
        })
    
        await trx('point_items').insert(pointItems);
    
        await trx.commit();

        return response.json({
            id: point_id,
            ...point, // spread operator, serve pra "distribuir" tudo que há dentro da variavel
        })
    }

    async show(request: Request, response: Response){
        const { id } = request.params;

        const point = await knex('points').where('id', id).first();

        if(!point){
            return response.status(400).json({ message: 'Point not found.' })
        }

        const serializedPoint =  {
                ...point,
                image_url: `http://192.168.0.106:3333/uploads/${point.image}`
        };
        

        // SQL
        /**
         *  SELECT * FROM items
         *     JOIN point_items ON items.id = point_items.item_id
         *     WHERE point_items.point_id = {id}
         */

         const items = await knex('items')
            .join('point_items', 'items.id', '=', 'point_items.item_id')
            .where('point_items.point_id', id)
            .select('items.title');


        return response.json({ serializedPoint, items });
    }
}

