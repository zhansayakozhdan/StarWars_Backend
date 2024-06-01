import express from 'express';
import { PORT, mongoDBURL } from './config.js';
import mongoose from 'mongoose';
import { Planet } from './models/planetModel.js';
import planetsRoute from './routes/planetsRoute.js';
import cors from 'cors';

const app = express();

app.use(express.json()); //для парсинга присылаемых данных request.body

mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log('DB ok!');
    app.listen(PORT, () => {
      console.log(`Server zapushen na portu: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });

//Есть два способа настройки  CORS
//этот есть доступ с любого домена
app.use(cors());

//этот есть доступ только с указанного домена
// app.use(
//     cors({
//         origin: 'http://localhost:3000',
//         methods: ['GET', 'POST', 'PUT', 'DELETE'],
//         allowedHeaders: ['Content-Type'],
//     })
// )

app.get('/test', (request, response) => {
    console.log(request);
    return response.send('Server rabotaet!');
});

app.use('/planets', planetsRoute);