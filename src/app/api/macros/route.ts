import { inchesToCm, poundsToKg } from '@/calculator/conversion';
import { calculateMacronutrients } from '@/calculator/macroCalculator';
import { activityLevels, genders } from '@/common/constants';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

// Define the request schema
const requestSchema = z.object({
  age: z
    .string()
    .min(1, 'Age must not be empty')
    .refine(
      (val) => !isNaN(Number(val)) && Number.isInteger(Number(val)),
      {
        message: 'Age must be an integer',
      }
    )
    .transform(Number),
  height: z
    .string()
    .min(1, 'Height must not be empty')
    .refine((val) => !isNaN(Number(val)), {
      message: 'Height must be a number',
    })
    .transform(Number),
  weight: z
    .string()
    .min(1, 'Weight must not be empty')
    .refine((val) => !isNaN(Number(val)), {
      message: 'Weight must be a number',
    })
    .transform(Number),
  gender: z.enum(genders, {
    message: 'Gender must be "male" or "female"',
  }),
  activityLevel: z.enum(activityLevels, {
    message: 'Activity level must be one of ' + activityLevels.join(', '),
  }),
});

export async function GET(req: NextRequest) {
  const params = req.nextUrl.searchParams;
  const query = requestSchema.safeParse({
    age: params.get('age'),
    weight: params.get('weight'),
    height: params.get('height'),
    gender: params.get('gender'),
    activityLevel: params.get('activityLevel'),
  });

  if (!query.success) {
    const errorMessages = query.error.errors.map(
      (err) => `${err.path.join('.')}: ${err.message}`
    );
    return NextResponse.json({ error: errorMessages }, { status: 400 });
  }

  const weightInKg = poundsToKg(query.data.weight);
  const heightInCm = inchesToCm(query.data.height);
  const response = calculateMacronutrients(
    query.data.age,
    heightInCm,
    weightInKg,
    query.data.gender,
    query.data.activityLevel
  );

  return NextResponse.json({ message: response }, { status: 200 });
}
