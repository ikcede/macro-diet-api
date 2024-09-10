import { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import '@/styles/global.css';

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700'],
});

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
      <body className={roboto.className}>
        <AppRouterCacheProvider>{children}</AppRouterCacheProvider>
      </body>
    </html>
  );
}
