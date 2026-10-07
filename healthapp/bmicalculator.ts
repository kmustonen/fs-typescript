export {};

interface BMIValues {
  height: number;
  bodymass: number;
}

const BMI_CATEGORIES: { limit: number; desc: string }[] = [
  { limit: 16.0, desc: 'Underweight (Severe thinness)' },
  { limit: 17.0, desc: 'Underweight (Moderate thinness)' },
  { limit: 18.5, desc: 'Underweight (Mild thinness)' },
  { limit: 25.0, desc: 'Normal range' },
  { limit: 30.0, desc: 'Overweight (Pre-obese)' },
  { limit: 35.0, desc: 'Obese (Class I)' },
  { limit: 40.0, desc: 'Obese (Class II)' },
  { limit: Infinity, desc: 'Obese (Class III)' },
];

const parseArguments = (args: string[]): BMIValues => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');

  if (!isNaN(Number(args[2])) && Number(args[2]) > 0 && !isNaN(Number(args[3])) && Number(args[3]) > 0) {
    return {
      height: Number(args[2]) / 100,
      bodymass: Number(args[3])
    }
  } else {
    throw new Error('Provided values were not numbers!');
  }
}

const calculateBMI = (bodymass: number, height: number) => {
  const bmi: number = bodymass / (height * height)
  console.log(BMI_CATEGORIES.find(({ limit }) => bmi < limit)?.desc ?? 'Unable to calculate BMI')
};

try {
  const { height, bodymass } = parseArguments(process.argv);
  calculateBMI(bodymass, height);
} catch (error: unknown) {
  let errorMessage = 'Something bad happened.'
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}