'use client';

import { useState } from 'react';
import {
  Box,
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  CircularProgress,
  Alert,
  Stack,
  Card,
  CardContent,
} from '@mui/material';
import { activityLevels, genders } from '@/common/constants';

interface MacroResults {
  bmi: number;
  calories: number;
  protein: number;
  fats: number;
  carbs: number;
}

export default function Component() {
  const [age, setAge] = useState('');
  const [heightFeet, setHeightFeet] = useState('');
  const [heightInches, setHeightInches] = useState('');
  const [weight, setWeight] = useState('');
  const [gender, setGender] = useState<string>('');
  const [activityLevel, setActivityLevel] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<MacroResults | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResults(null);

    try {
      // Convert feet and inches to total inches
      const totalInches =
        (parseFloat(heightFeet) || 0) * 12 +
        (parseFloat(heightInches) || 0);

      const params = new URLSearchParams({
        age,
        height: totalInches.toString(),
        weight,
        gender,
        activityLevel,
      });

      const response = await fetch(`/api/macros?${params.toString()}`);
      const data = await response.json();

      if (!response.ok) {
        setError(
          Array.isArray(data.error)
            ? data.error.join(', ')
            : data.error || 'An error occurred'
        );
        return;
      }

      setResults(data.message);
    } catch (err) {
      setError('Failed to fetch macros. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h1" component="h1" gutterBottom>
        Macro Diet API Demo
      </Typography>
      <Typography variant="body1" sx={{ mb: 4 }}>
        Enter your information below to calculate your recommended daily
        macronutrients.
      </Typography>

      <Paper elevation={3} sx={{ p: 4 }}>
        <form onSubmit={handleSubmit}>
          <Stack spacing={3}>
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
                gap: 3,
              }}
            >
              <TextField
                fullWidth
                label="Age"
                type="number"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                required
                inputProps={{ min: 1, max: 120 }}
              />
              <Box
                sx={{
                  display: 'flex',
                  gap: 2,
                  alignItems: 'flex-start',
                }}
              >
                <TextField
                  label="Height (feet)"
                  type="number"
                  value={heightFeet}
                  onChange={(e) => setHeightFeet(e.target.value)}
                  required
                  inputProps={{ min: 0, max: 10 }}
                  sx={{ flex: 1 }}
                />
                <TextField
                  label="Inches"
                  type="number"
                  value={heightInches}
                  onChange={(e) => setHeightInches(e.target.value)}
                  required
                  inputProps={{ min: 0, max: 11 }}
                  sx={{ flex: 1 }}
                />
              </Box>
              <TextField
                fullWidth
                label="Weight (pounds)"
                type="number"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                required
                inputProps={{ min: 1, step: 0.1 }}
              />
              <FormControl fullWidth required>
                <InputLabel>Gender</InputLabel>
                <Select
                  value={gender}
                  label="Gender"
                  onChange={(e) => setGender(e.target.value)}
                >
                  {genders.map((g) => (
                    <MenuItem key={g} value={g}>
                      {g.charAt(0).toUpperCase() + g.slice(1)}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
            <FormControl fullWidth required>
              <InputLabel>Activity Level</InputLabel>
              <Select
                value={activityLevel}
                label="Activity Level"
                onChange={(e) => setActivityLevel(e.target.value)}
              >
                {activityLevels.map((level) => (
                  <MenuItem key={level} value={level}>
                    {level.charAt(0).toUpperCase() + level.slice(1)}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Button
              type="submit"
              variant="contained"
              fullWidth
              size="large"
              disabled={loading}
            >
              {loading ? (
                <CircularProgress size={24} />
              ) : (
                'Calculate Macros'
              )}
            </Button>
          </Stack>
        </form>
      </Paper>

      {error && (
        <Alert severity="error" sx={{ mt: 3 }}>
          {error}
        </Alert>
      )}

      {results && (
        <Box sx={{ mt: 4 }}>
          <Typography variant="h4" gutterBottom>
            Your Macro Breakdown
          </Typography>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: {
                xs: '1fr',
                sm: 'repeat(2, 1fr)',
                md: 'repeat(3, 1fr)',
              },
              gap: 3,
              mt: 2,
            }}
          >
            <Card>
              <CardContent>
                <Typography color="textSecondary" gutterBottom>
                  BMI
                </Typography>
                <Typography variant="h4">
                  {results.bmi.toFixed(1)}
                </Typography>
              </CardContent>
            </Card>
            <Card>
              <CardContent>
                <Typography color="textSecondary" gutterBottom>
                  Calories (BMR + Activity Level)
                </Typography>
                <Typography variant="h4">{results.calories}</Typography>
              </CardContent>
            </Card>
            <Card>
              <CardContent>
                <Typography color="textSecondary" gutterBottom>
                  Protein
                </Typography>
                <Typography variant="h4">{results.protein}g</Typography>
              </CardContent>
            </Card>
            <Card>
              <CardContent>
                <Typography color="textSecondary" gutterBottom>
                  Fats
                </Typography>
                <Typography variant="h4">{results.fats}g</Typography>
              </CardContent>
            </Card>
            <Card>
              <CardContent>
                <Typography color="textSecondary" gutterBottom>
                  Carbohydrates
                </Typography>
                <Typography variant="h4">{results.carbs}g</Typography>
              </CardContent>
            </Card>
          </Box>
        </Box>
      )}
    </Container>
  );
}
