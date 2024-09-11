'use client';

import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import CodeIcon from '@mui/icons-material/Code';
import {
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from '@mui/material';

export default function Component() {
  return (
    <Box
      sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}
    >
      <AppBar position="static">
        <Toolbar>
          <CodeIcon sx={{ mr: 1, color: '#b7a1ff' }} />
          <Typography
            component="div"
            sx={{ flexGrow: 1, fontSize: '20px', color: '#b7a1ff' }}
          >
            API Docs
          </Typography>
        </Toolbar>
      </AppBar>
      <Container component="main" sx={{ mt: 4, mb: 2, flex: '1 0 auto' }}>
        <Typography
          variant="h1"
          component="h1"
          gutterBottom
          id="introduction"
        >
          Macronutrient API
        </Typography>
        <Typography variant="body1" sx={{ mb: 3 }}>
          This is a sample macronutrient calculator built with Github
          Codespaces, ChatGPT, Claude AI, and v0 by Vercel. It also uses
          zod for query validation.
        </Typography>
        <Typography variant="h2" gutterBottom id="authentication">
          Authentication
        </Typography>
        <Typography gutterBottom sx={{ mb: 3 }}>
          There's no authentication needed for this API, but usage will be
          limited by NextJS rate limits for the hobby plan.
        </Typography>

        <Typography variant="h2" sx={{ mb: 3 }}>
          Endpoints
        </Typography>
        <Typography variant="h3" gutterBottom>
          GET <code>/api/macros</code>
        </Typography>

        <Typography variant="h4" gutterBottom>
          Parameters (Query Strings)
        </Typography>

        <Paper elevation={3} sx={{ mb: 2 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <strong>Parameter</strong>
                </TableCell>
                <TableCell>
                  <strong>Type</strong>
                </TableCell>
                <TableCell>
                  <strong>Description</strong>
                </TableCell>
                <TableCell>
                  <strong>Required</strong>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>age</TableCell>
                <TableCell>number (integer)</TableCell>
                <TableCell>Your age in years.</TableCell>
                <TableCell>Yes</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>height</TableCell>
                <TableCell>number (float)</TableCell>
                <TableCell>Your height in inches.</TableCell>
                <TableCell>Yes</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>weight</TableCell>
                <TableCell>number (float)</TableCell>
                <TableCell>Your weight in pounds.</TableCell>
                <TableCell>Yes</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>gender</TableCell>
                <TableCell>string</TableCell>
                <TableCell>
                  Your gender, either "male" or "female".
                </TableCell>
                <TableCell>Yes</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>activityLevel</TableCell>
                <TableCell>string</TableCell>
                <TableCell>
                  Your activity level, one of: "sedentary", "light",
                  "moderate", "active", "extra".
                </TableCell>
                <TableCell>Yes</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Paper>

        <Typography variant="h4" gutterBottom>
          Example Request
        </Typography>
        <Paper
          elevation={3}
          sx={{ padding: '16px', marginBottom: '16px' }}
        >
          <Typography variant="body1" component="code">
            GET
            /api/macros?age=30&height=70&weight=175&gender=male&activityLevel=moderate
          </Typography>
        </Paper>

        <Typography variant="h4" gutterBottom>
          Example Response
        </Typography>
        <Paper
          elevation={3}
          sx={{ padding: '16px', marginBottom: '16px' }}
        >
          <pre>{`{
  "message": {
    "bmi": 25.1096073620719,
    "calories": 2728,
    "protein": 175,
    "fats": 91,
    "carbs": 303
  }
}`}</pre>
        </Paper>

        <Typography variant="h5" gutterBottom>
          Error Response
        </Typography>
        <Paper elevation={3} sx={{ padding: '16px' }}>
          <pre>{`{
  "error": [
    "age: Expected string, received null",
    "height: Height must be a number",
    "weight: Expected string, received null",
    "gender: Gender must be \"male\" or \"female\"",
    "activityLevel: Activity level must be one of sedentary, light, moderate, active, extra"
  ]
}`}</pre>
        </Paper>
      </Container>
    </Box>
  );
}
