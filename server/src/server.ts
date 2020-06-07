import express from 'express';
import path from 'path';
import routes from './routes';
import cors from 'cors'
import { errors } from 'celebrate'

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

                            // -> ele chega no src/server.ts , volta uma pasta e entra na uploads
app.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads'))); 
//rota = http://localhost:3333/uploads/(arquivo q a gente quer ver da pasta uploads)

app.use(errors());
app.listen(3333);