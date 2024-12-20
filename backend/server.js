import express, { json } from 'express';
import cors from 'cors';
import currencyRoutes from './routes/currencyRoutes.js';

const app = express();
const port = 3000;

app.use(json());
app.use(cors());

app.use('/api', currencyRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({ error: 'Something went wrong!' });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
