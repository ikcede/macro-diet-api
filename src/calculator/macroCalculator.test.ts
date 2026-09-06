import { calculateMacronutrients } from './macroCalculator';

describe('macroCalculator', () => {
  describe('calculateMacronutrients', () => {
    it('should calculate macronutrients for a sedentary male', () => {
      const result = calculateMacronutrients(30, 175, 70, 'male', 'sedentary');
      
      expect(result).toHaveProperty('bmi');
      expect(result).toHaveProperty('calories');
      expect(result).toHaveProperty('protein');
      expect(result).toHaveProperty('fats');
      expect(result).toHaveProperty('carbs');
      
      expect(result.bmi).toBeCloseTo(22.86, 2);
      expect(result.calories).toBeGreaterThan(0);
      expect(result.protein).toBe(154); // 2.2 * 70
      expect(result.fats).toBeGreaterThan(0);
      expect(result.carbs).toBeGreaterThan(0);
    });

    it('should calculate macronutrients for an active female', () => {
      const result = calculateMacronutrients(25, 165, 60, 'female', 'active');
      
      expect(result.bmi).toBeCloseTo(22.04, 2);
      expect(result.calories).toBeGreaterThan(0);
      expect(result.protein).toBe(132); // 2.2 * 60
      expect(result.fats).toBeGreaterThan(0);
      expect(result.carbs).toBeGreaterThan(0);
    });

    it('should calculate higher calories for more active levels', () => {
      const sedentary = calculateMacronutrients(30, 175, 70, 'male', 'sedentary');
      const moderate = calculateMacronutrients(30, 175, 70, 'male', 'moderate');
      const extra = calculateMacronutrients(30, 175, 70, 'male', 'extra');
      
      expect(moderate.calories).toBeGreaterThan(sedentary.calories);
      expect(extra.calories).toBeGreaterThan(moderate.calories);
    });

    it('should calculate higher BMR for males than females with same stats', () => {
      const male = calculateMacronutrients(30, 175, 70, 'male', 'sedentary');
      const female = calculateMacronutrients(30, 175, 70, 'female', 'sedentary');
      
      expect(male.calories).toBeGreaterThan(female.calories);
    });

    it('should handle all activity levels correctly', () => {
      const activityLevels = ['sedentary', 'light', 'moderate', 'active', 'extra'] as const;
      
      activityLevels.forEach(level => {
        const result = calculateMacronutrients(30, 175, 70, 'male', level);
        expect(result.calories).toBeGreaterThan(0);
        expect(result.protein).toBeGreaterThan(0);
        expect(result.fats).toBeGreaterThan(0);
        expect(result.carbs).toBeGreaterThan(0);
      });
    });

    it('should return integer values for macronutrients', () => {
      const result = calculateMacronutrients(30, 175, 70, 'male', 'moderate');
      
      expect(Number.isInteger(result.calories)).toBe(true);
      expect(Number.isInteger(result.protein)).toBe(true);
      expect(Number.isInteger(result.fats)).toBe(true);
      expect(Number.isInteger(result.carbs)).toBe(true);
    });

    it('should calculate consistent results for the same inputs', () => {
      const result1 = calculateMacronutrients(30, 175, 70, 'male', 'moderate');
      const result2 = calculateMacronutrients(30, 175, 70, 'male', 'moderate');
      
      expect(result1).toEqual(result2);
    });

    it('should handle edge case with very young age', () => {
      const result = calculateMacronutrients(18, 170, 65, 'male', 'moderate');
      
      expect(result.calories).toBeGreaterThan(0);
      expect(result.bmi).toBeGreaterThan(0);
    });

    it('should handle edge case with older age', () => {
      const result = calculateMacronutrients(70, 170, 75, 'female', 'light');
      
      expect(result.calories).toBeGreaterThan(0);
      expect(result.bmi).toBeGreaterThan(0);
    });
  });
});
