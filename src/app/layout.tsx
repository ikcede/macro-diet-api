import { Metadata } from 'next';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import { ThemeProvider } from '@mui/material/styles';
import Theme from '@/styles/dark-theme';
import '@/styles/global.css';
import CssBaseline from '@mui/material/CssBaseline';

export const metadata: Metadata = {
  title: 'Macro Diet API',
  description: 'A NextJS API application for calculating macros.',
  icons: {
    icon: '/favicon.ico',
  },
  creator: 'ikcede',
  applicationName: 'Macro Diet API',
  keywords: ['Next.js', 'React', 'API', 'Macros', 'Macro Diet'],
  category: 'science',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AppRouterCacheProvider>
          <ThemeProvider theme={Theme}>
            <CssBaseline />
            {children}
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
