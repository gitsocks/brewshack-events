import type { Metadata } from 'next';
import '../globals.css';
import { AuthProvider } from '@/providers/AuthProvider';
import { CurrentUserProvider } from '@/providers/CurrentUserProvider';

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <CurrentUserProvider>
            {children}
          </CurrentUserProvider>
        </AuthProvider>
      </body>
    </html>
  );
}