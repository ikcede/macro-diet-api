import BMI from './BMI';

export interface MacronutrientBreakdown {
  bmi: number;
  calories: number;
  protein: number; // in grams
  fats: number; // in grams
  carbs: number; // in grams
}

export const calculateMacronutrients = (
  age: number,
  height: number, // in cm
  weight: number, // in kg
  gender: 'male' | 'female',
  activityLevel: string
): MacronutrientBreakdown => {
  // Step 1: Calculate BMR using the Mifflin-St Jeor formula
  let BMR: number;
  if (gender === 'male') {
    BMR = 10 * weight + 6.25 * height - 5 * age + 5;
  } else {
    BMR = 10 * weight + 6.25 * height - 5 * age - 161;
  }

  // Step 2: Multiply BMR by activity factor to get TDEE
  let activityMultiplier: number;
  switch (activityLevel) {
    case 'sedentary':
      activityMultiplier = 1.2;
      break;
    case 'light':
      activityMultiplier = 1.375;
      break;
    case 'moderate':
      activityMultiplier = 1.55;
      break;
    case 'active':
      activityMultiplier = 1.725;
      break;
    case 'extra':
      activityMultiplier = 1.9;
      break;
    default:
      activityMultiplier = 1.2;
  }
  const TDEE = BMR * activityMultiplier;

  // Step 3: Macronutrient Calculation (Assuming for maintenance)

  // Protein: 2.2g per kg of body weight
  const proteinGrams = 2.2 * weight;
  const proteinCalories = proteinGrams * 4; // 1g of protein = 4 calories

  // Fats: 30% of total calories (can adjust this percentage)
  const fatCalories = TDEE * 0.3;
  const fatGrams = fatCalories / 9; // 1g of fat = 9 calories

  // Carbohydrates: remaining calories after protein and fats
  const carbCalories = TDEE - (proteinCalories + fatCalories);
  const carbGrams = carbCalories / 4; // 1g of carbs = 4 calories

  const bmi = BMI(weight, height);

  return {
    bmi: bmi,
    calories: Math.round(TDEE),
    protein: Math.round(proteinGrams),
    fats: Math.round(fatGrams),
    carbs: Math.round(carbGrams),
  };
};
