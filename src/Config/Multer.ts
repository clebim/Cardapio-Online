import multer from 'multer';
import { resolve } from 'path';
import crypto from 'crypto';

const uploadsFolderProfilePhoto = resolve(
  __dirname,
  '..',
  '..',
  'uploads',
  'profile',
);

const uploadsFolderItemPhoto = resolve(
  __dirname,
  '..',
  '..',
  'uploads',
  'item',
);

export const profilePhotoMulterConfig = {
  directory: uploadsFolderProfilePhoto,

  storage: multer.diskStorage({
    destination: uploadsFolderProfilePhoto,
    filename: (req, file, callback) => {
      const hash = crypto.randomBytes(12).toString('hex');

      const fileName = `${req.userId}-${hash}-${file.originalname}`;

      return callback(null, fileName);
    },
  }),
};

export const ItemPhotoMulterConfig = {
  directory: uploadsFolderItemPhoto,

  storage: multer.diskStorage({
    destination: uploadsFolderItemPhoto,
    filename: (req, file, callback) => {
      const hash = crypto.randomBytes(12).toString('hex');

      const fileName = `${req.userId}-${req.body.menu_section_id}-${hash}-${file.originalname}`;

      return callback(null, fileName);
    },
  }),
};
