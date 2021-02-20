import 'reflect-metadata';
import './boostrap';
import express from 'express';
import cors from 'cors';
import './Shared/Container/index';
import routes from './Routes/index';
import './Database/index';
import {
  profilePhotoMulterConfig,
  ItemPhotoMulterConfig,
} from './Config/Multer';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/files/profile', express.static(profilePhotoMulterConfig.directory));
app.use('/files/item', express.static(ItemPhotoMulterConfig.directory));
app.use(routes);

export default app;
