import dotenv from 'dotenv'
dotenv.config()

import helmet from 'helmet';
import express from 'express';

import placeRoutes from './routes/places.js';

const app = express();

app.use(express.json());
app.use(helmet());

app.use('/places', placeRoutes);


const PORT = process.env.PORT || 6969;
app.listen(PORT, () => {
    console.log('Server is listening on port 3000');
}).on('error', (err) => {
    console.log(err);
})
