import { Metadata } from 'next';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import { ThemeProvider } from '@mui/material/styles';
import Theme from '@/styles/dark-theme';
import '@/styles/global.css';
import CssBaseline from '@mui/material/CssBaseline';

export const metadata: Metadata = {
  title: 'NextJS Starter',
  description: 'SEO description',
  icons: {
    icon: '/favicon.ico',
  },
  creator: '@me',
  applicationName: 'NextJS Starter',
  keywords: ['Next.js', 'React'],
  category: 'technology',
  verification: {
    google: '{Google Token}',
  },
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
