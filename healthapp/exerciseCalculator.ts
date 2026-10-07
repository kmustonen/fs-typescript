export {};

interface Result { 
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: string,
  target: number,
  average: number
}

interface ExerciseValues {
  target: number;
  dailyHours: number[];
}

const descriptions: { rating: number; desc: string }[] = [
  { rating: 1, desc: 'not good enough' },
  { rating: 2, desc: 'not too bad but could be better' },
  { rating: 3, desc: 'great job' },
];

const parseArguments = (args: string[]): ExerciseValues => {
  if (args.length < 4) throw new Error('Not enough arguments');

  const values = args.slice(2).map(Number);

  if (values.some(v => isNaN(v) || v < 0)) {
    throw new Error('Provided values were not numbers!');
  }

  return {
    target: values[0],
    dailyHours: values.slice(1)
  }
}

const calculateExercises = (dailyHours: number[], target: number): Result => {
  const periodLength = dailyHours.length
  const trainingDays = dailyHours.filter(hours => hours > 0).length
  const totalHours = dailyHours.reduce((acc, curr) => acc + curr,0);
  const average = totalHours / periodLength;
  const ratio = average / target;
  const rating = ratio >= 1 ? 3 : ratio >= 0.5 ? 2 : 1;
  const ratingDescription = descriptions.find(d => d.rating === rating)?.desc ?? '';
  const success = average >= target; 

  return {periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average}
};

try {
  const { target, dailyHours } = parseArguments(process.argv);
  console.log(calculateExercises(dailyHours, target));
} catch (error: unknown) {
  let errorMessage = 'Something bad happened.'
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}