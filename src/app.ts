import 'reflect-metadata';
import './boostrap';
import express from 'express';
import cors from 'cors';
import './Shared/Container/index';
import routes from './Routes/index';
import './Database/index';
import Multer from './Config/Multer';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/files', express.static(Multer.directory));
app.use(routes);

export default app;
