import './globals.css';
import type { Metadata } from 'next';
import { Playfair_Display, Lato } from 'next/font/google';
import Navbar from './components/Navbar';
import { Box, Typography } from '@mui/material';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import { getSession } from '@/lib/auth';

const playfair = Playfair_Display({
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-playfair',
});

const lato = Lato({
    weight: ['400', '700'],
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-lato',
});

export const metadata: Metadata = {
    title: 'CulinaShare | Gourmet Recipes',
    description: 'Elevate your home cooking.',
    icons: {
        icon: '/icon.svg',
        shortcut: '/icon.svg',
        apple: '/icon.svg',
    },
};

export default async function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const session = await getSession();

    return (
        <html lang="en" className={`${playfair.variable} ${lato.variable}`}>
            <body
                suppressHydrationWarning={true}
                style={{ margin: 0, padding: 0, minHeight: '100vh', display: 'flex', flexDirection: 'column' }}
            >
                <AppRouterCacheProvider>
                    <Navbar session={session} />

                    <main style={{ flexGrow: 1, fontFamily: 'var(--font-lato)' }}>
                        {children}
                    </main>

                    <Box component="footer" sx={{ py: 6, bgcolor: '#111827', color: 'white', textAlign: 'center' }}>
                        <Typography variant="h5" sx={{ fontFamily: 'var(--font-playfair)', mb: 2 }}>CulinaShare</Typography>
                        <Typography variant="body2" sx={{ opacity: 0.6, fontFamily: 'var(--font-lato)' }}>
                            © {new Date().getFullYear()} Crafted with Next.js & Material Design
                        </Typography>
                    </Box>
                </AppRouterCacheProvider>
            </body>
        </html>
    );
}