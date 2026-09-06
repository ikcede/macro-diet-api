import BMI from './BMI';

describe('BMI', () => {
  it('should calculate BMI correctly for given weight and height', () => {
    // Test case: 70 kg, 175 cm
    // Expected BMI = 70 / (1.75 * 1.75) = 22.86
    expect(BMI(70, 175)).toBeCloseTo(22.86, 2);
  });

  it('should calculate BMI for underweight person', () => {
    // Test case: 50 kg, 175 cm
    // Expected BMI = 50 / (1.75 * 1.75) = 16.33
    expect(BMI(50, 175)).toBeCloseTo(16.33, 2);
  });

  it('should calculate BMI for overweight person', () => {
    // Test case: 100 kg, 175 cm
    // Expected BMI = 100 / (1.75 * 1.75) = 32.65
    expect(BMI(100, 175)).toBeCloseTo(32.65, 2);
  });

  it('should handle different heights correctly', () => {
    // Test case: 80 kg, 180 cm
    // Expected BMI = 80 / (1.80 * 1.80) = 24.69
    expect(BMI(80, 180)).toBeCloseTo(24.69, 2);
  });

  it('should handle decimal values', () => {
    // Test case: 75.5 kg, 172.5 cm
    expect(BMI(75.5, 172.5)).toBeCloseTo(25.37, 2);
  });

  it('should handle edge cases with very small values', () => {
    // Test case: 1 kg, 50 cm
    expect(BMI(1, 50)).toBeCloseTo(4, 2);
  });
});
