import { inchesToCm, poundsToKg } from '@/calculator/conversion';
import { calculateMacronutrients } from '@/calculator/macroCalculator';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const age = searchParams.get('age');
  const weight = searchParams.get('weight');
  const height = searchParams.get('height');
  const gender = searchParams.get('gender');
  const activity = searchParams.get('activity');

  if (
    age === null ||
    weight === null ||
    height === null ||
    gender === null ||
    activity === null
  ) {
    return NextResponse.json(
      { error: 'Age, weight, height, and gender must be set' },
      { status: 400 }
    );
  }

  const ageNum = parseInt(age);
  const weightNum = parseFloat(weight);
  const heightNum = parseFloat(height);

  if (
    Number.isNaN(ageNum) ||
    Number.isNaN(weightNum) ||
    Number.isNaN(heightNum)
  ) {
    return NextResponse.json(
      { error: 'Age, weight, and height must be valid numbers' },
      { status: 422 }
    );
  }

  if (gender !== 'male' && gender !== 'female') {
    return NextResponse.json(
      { error: 'Gender must be set to "male" or "female"' },
      { status: 422 }
    );
  }

  if (
    ['sedentary', 'light', 'moderate', 'active', 'extra'].indexOf(
      activity
    ) === -1
  ) {
    return NextResponse.json(
      { error: 'Activity must be set to a valid activity level' },
      { status: 422 }
    );
  }

  const weightInKg = poundsToKg(weightNum);
  const heightInCm = inchesToCm(heightNum);
  const response = calculateMacronutrients(
    ageNum,
    heightInCm,
    weightInKg,
    gender,
    activity
  );

  return NextResponse.json({ message: response });
}
