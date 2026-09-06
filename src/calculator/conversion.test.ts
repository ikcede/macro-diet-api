import { inchesToCm, poundsToKg } from './conversion';

describe('conversion', () => {
  describe('inchesToCm', () => {
    it('should convert inches to centimeters correctly', () => {
      expect(inchesToCm(1)).toBeCloseTo(2.54, 2);
      expect(inchesToCm(10)).toBeCloseTo(25.4, 2);
      expect(inchesToCm(68)).toBeCloseTo(172.72, 2);
    });

    it('should handle zero inches', () => {
      expect(inchesToCm(0)).toBe(0);
    });

    it('should handle decimal values', () => {
      expect(inchesToCm(5.5)).toBeCloseTo(13.97, 2);
    });
  });

  describe('poundsToKg', () => {
    it('should convert pounds to kilograms correctly', () => {
      expect(poundsToKg(1)).toBeCloseTo(0.453592, 5);
      expect(poundsToKg(150)).toBeCloseTo(68.0388, 2);
      expect(poundsToKg(200)).toBeCloseTo(90.7184, 2);
    });

    it('should handle zero pounds', () => {
      expect(poundsToKg(0)).toBe(0);
    });

    it('should handle decimal values', () => {
      expect(poundsToKg(10.5)).toBeCloseTo(4.762716, 5);
    });
  });
});
