const BMI = (weight: number, height: number): number => {
  // Convert height from cm to meters
  const heightInMeters = height / 100;

  // Calculate BMI
  const bmi = weight / (heightInMeters * heightInMeters);

  return bmi;
};

export default BMI;
