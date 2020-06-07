import multer from 'multer';
import path from 'path';
import crypto from 'crypto' // serve pra gerar um "hash" pra criar um nome diferente pra cada file

export default {
    storage: multer.diskStorage({
        destination: path.resolve(__dirname, '..', '..', 'uploads'),
        filename(request, file, callback) {
            const hash = crypto.randomBytes(6).toString('hex'); // gera 6 valores e tranforma em hexadecimal

            const fileName = `${hash}-${file.originalname}`;

            callback(null, fileName);
        }
    })
}