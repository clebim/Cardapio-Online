import multer from 'multer';
import { resolve } from 'path';
import crypto from 'crypto';

const uploadsFolder = resolve(__dirname, '..', '..', 'Uploads');

export default {
  directory: uploadsFolder,

  storage: multer.diskStorage({
    destination: uploadsFolder,
    filename: (req, file, callback) => {
      const hash = crypto.randomBytes(12).toString('hex');

      const fileName = `${req.userId}-${hash}-${file.originalname}`;

      return callback(null, fileName);
    },
  }),
};
