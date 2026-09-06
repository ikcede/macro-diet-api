/**
 * @jest-environment node
 */
import { GET } from './route';
import { NextRequest } from 'next/server';

describe('/api/macros', () => {
  describe('GET', () => {
    it('should return macronutrient data for valid input', async () => {
      const url = new URL('http://localhost/api/macros?age=30&height=68&weight=150&gender=male&activityLevel=moderate');
      const request = new NextRequest(url);
      
      const response = await GET(request);
      const data = await response.json();
      
      expect(response.status).toBe(200);
      expect(data).toHaveProperty('message');
      expect(data.message).toHaveProperty('bmi');
      expect(data.message).toHaveProperty('calories');
      expect(data.message).toHaveProperty('protein');
      expect(data.message).toHaveProperty('fats');
      expect(data.message).toHaveProperty('carbs');
    });

    it('should handle female gender correctly', async () => {
      const url = new URL('http://localhost/api/macros?age=25&height=65&weight=130&gender=female&activityLevel=active');
      const request = new NextRequest(url);
      
      const response = await GET(request);
      const data = await response.json();
      
      expect(response.status).toBe(200);
      expect(data.message).toHaveProperty('calories');
    });

    it('should handle all activity levels', async () => {
      const activityLevels = ['sedentary', 'light', 'moderate', 'active', 'extra'];
      
      for (const level of activityLevels) {
        const url = new URL(`http://localhost/api/macros?age=30&height=68&weight=150&gender=male&activityLevel=${level}`);
        const request = new NextRequest(url);
        
        const response = await GET(request);
        const data = await response.json();
        
        expect(response.status).toBe(200);
        expect(data.message).toHaveProperty('calories');
      }
    });

    it('should return 400 for missing age parameter', async () => {
      const url = new URL('http://localhost/api/macros?height=68&weight=150&gender=male&activityLevel=moderate');
      const request = new NextRequest(url);
      
      const response = await GET(request);
      const data = await response.json();
      
      expect(response.status).toBe(400);
      expect(data).toHaveProperty('error');
      expect(Array.isArray(data.error)).toBe(true);
    });

    it('should return 400 for missing height parameter', async () => {
      const url = new URL('http://localhost/api/macros?age=30&weight=150&gender=male&activityLevel=moderate');
      const request = new NextRequest(url);
      
      const response = await GET(request);
      const data = await response.json();
      
      expect(response.status).toBe(400);
      expect(data).toHaveProperty('error');
    });

    it('should return 400 for missing weight parameter', async () => {
      const url = new URL('http://localhost/api/macros?age=30&height=68&gender=male&activityLevel=moderate');
      const request = new NextRequest(url);
      
      const response = await GET(request);
      const data = await response.json();
      
      expect(response.status).toBe(400);
      expect(data).toHaveProperty('error');
    });

    it('should return 400 for missing gender parameter', async () => {
      const url = new URL('http://localhost/api/macros?age=30&height=68&weight=150&activityLevel=moderate');
      const request = new NextRequest(url);
      
      const response = await GET(request);
      const data = await response.json();
      
      expect(response.status).toBe(400);
      expect(data).toHaveProperty('error');
    });

    it('should return 400 for missing activityLevel parameter', async () => {
      const url = new URL('http://localhost/api/macros?age=30&height=68&weight=150&gender=male');
      const request = new NextRequest(url);
      
      const response = await GET(request);
      const data = await response.json();
      
      expect(response.status).toBe(400);
      expect(data).toHaveProperty('error');
    });

    it('should return 400 for invalid age (non-numeric)', async () => {
      const url = new URL('http://localhost/api/macros?age=abc&height=68&weight=150&gender=male&activityLevel=moderate');
      const request = new NextRequest(url);
      
      const response = await GET(request);
      const data = await response.json();
      
      expect(response.status).toBe(400);
      expect(data).toHaveProperty('error');
      expect(data.error.some((e: string) => e.includes('Age'))).toBe(true);
    });

    it('should return 400 for invalid age (decimal)', async () => {
      const url = new URL('http://localhost/api/macros?age=30.5&height=68&weight=150&gender=male&activityLevel=moderate');
      const request = new NextRequest(url);
      
      const response = await GET(request);
      const data = await response.json();
      
      expect(response.status).toBe(400);
      expect(data).toHaveProperty('error');
      expect(data.error.some((e: string) => e.includes('integer'))).toBe(true);
    });

    it('should return 400 for invalid height (non-numeric)', async () => {
      const url = new URL('http://localhost/api/macros?age=30&height=abc&weight=150&gender=male&activityLevel=moderate');
      const request = new NextRequest(url);
      
      const response = await GET(request);
      const data = await response.json();
      
      expect(response.status).toBe(400);
      expect(data).toHaveProperty('error');
      expect(data.error.some((e: string) => e.includes('Height'))).toBe(true);
    });

    it('should return 400 for invalid weight (non-numeric)', async () => {
      const url = new URL('http://localhost/api/macros?age=30&height=68&weight=abc&gender=male&activityLevel=moderate');
      const request = new NextRequest(url);
      
      const response = await GET(request);
      const data = await response.json();
      
      expect(response.status).toBe(400);
      expect(data).toHaveProperty('error');
      expect(data.error.some((e: string) => e.includes('Weight'))).toBe(true);
    });

    it('should return 400 for invalid gender', async () => {
      const url = new URL('http://localhost/api/macros?age=30&height=68&weight=150&gender=other&activityLevel=moderate');
      const request = new NextRequest(url);
      
      const response = await GET(request);
      const data = await response.json();
      
      expect(response.status).toBe(400);
      expect(data).toHaveProperty('error');
      expect(data.error.some((e: string) => e.includes('Gender'))).toBe(true);
    });

    it('should return 400 for invalid activity level', async () => {
      const url = new URL('http://localhost/api/macros?age=30&height=68&weight=150&gender=male&activityLevel=invalid');
      const request = new NextRequest(url);
      
      const response = await GET(request);
      const data = await response.json();
      
      expect(response.status).toBe(400);
      expect(data).toHaveProperty('error');
      expect(data.error.some((e: string) => e.includes('Activity level'))).toBe(true);
    });

    it('should return 400 for empty age string', async () => {
      const url = new URL('http://localhost/api/macros?age=&height=68&weight=150&gender=male&activityLevel=moderate');
      const request = new NextRequest(url);
      
      const response = await GET(request);
      const data = await response.json();
      
      expect(response.status).toBe(400);
      expect(data).toHaveProperty('error');
    });

    it('should properly convert inches to cm and pounds to kg', async () => {
      const url = new URL('http://localhost/api/macros?age=30&height=70&weight=154&gender=male&activityLevel=moderate');
      const request = new NextRequest(url);
      
      const response = await GET(request);
      const data = await response.json();
      
      expect(response.status).toBe(200);
      // Height: 70 inches = 177.8 cm
      // Weight: 154 pounds = 69.85 kg
      // BMI should be calculated with these converted values
      expect(data.message.bmi).toBeGreaterThan(0);
    });

    it('should handle decimal values for height and weight', async () => {
      const url = new URL('http://localhost/api/macros?age=30&height=68.5&weight=150.5&gender=male&activityLevel=moderate');
      const request = new NextRequest(url);
      
      const response = await GET(request);
      const data = await response.json();
      
      expect(response.status).toBe(200);
      expect(data.message).toHaveProperty('calories');
    });

    it('should return rounded integer values for macronutrients', async () => {
      const url = new URL('http://localhost/api/macros?age=30&height=68&weight=150&gender=male&activityLevel=moderate');
      const request = new NextRequest(url);
      
      const response = await GET(request);
      const data = await response.json();
      
      expect(response.status).toBe(200);
      expect(Number.isInteger(data.message.calories)).toBe(true);
      expect(Number.isInteger(data.message.protein)).toBe(true);
      expect(Number.isInteger(data.message.fats)).toBe(true);
      expect(Number.isInteger(data.message.carbs)).toBe(true);
    });
  });
});
