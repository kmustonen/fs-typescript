import express from 'express';
import { calculateBMI } from './bmiCalculator.ts';

const app = express();

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);

  if (isNaN(height) || isNaN(weight) || height <= 0 || weight <= 0) {
    return res.status(400).send({ error: 'malformatted parameters' });
  }

  return res.send({height, weight, bmi: calculateBMI(weight, height / 100)});
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});