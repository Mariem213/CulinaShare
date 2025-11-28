/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { AppBar, Toolbar, Typography, Button, Container, Box } from '@mui/material';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import Link from 'next/link';
import { logoutAction } from '@/app/actions/auth';

interface NavbarProps {
    session: any;
}

export default function Navbar({ session }: NavbarProps) {

    const navItems = [
        { name: 'Home', path: '/' },
        { name: 'Surprise Me', path: '/random' },
        { name: 'Community Recipes', path: '/community-recipes' },
        { name: 'About', path: '/about' },
    ];

    return (
        <AppBar
            position="sticky"
            elevation={0}
            sx={{
                bgcolor: 'rgba(255, 255, 255, 0.8)',
                backdropFilter: 'blur(12px)',
                borderBottom: '1px solid rgba(0,0,0,0.05)',
                color: '#333'
            }}
        >
            <Container maxWidth="xl">
                <Toolbar disableGutters sx={{ justifyContent: 'space-between', height: '80px' }}>

                    {/* Brand Logo */}
                    <Link href="/" style={{ textDecoration: 'none', color: '#ea580c' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                            <RestaurantMenuIcon sx={{ fontSize: 32 }} />
                            <Typography variant="h5" sx={{ fontFamily: 'var(--font-playfair)', fontWeight: 700, letterSpacing: '-0.5px' }}>
                                CulinaShare
                            </Typography>
                        </Box>
                    </Link>

                    {/* Nav Links */}
                    <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                        {navItems.map((item) => (
                            <Button
                                key={item.name}
                                component={Link}
                                href={item.path}
                                disableRipple
                                sx={{
                                    color: '#4b5563',
                                    fontFamily: 'var(--font-lato)',
                                    fontWeight: 700,
                                    textTransform: 'none',
                                    fontSize: '1rem',
                                    '&:hover': { color: '#ea580c', bgcolor: 'transparent' }
                                }}
                            >
                                {item.name}
                            </Button>
                        ))}

                        {session?.user?.role === 'admin' && (
                            <Button
                                component={Link}
                                href="/dashboard"
                                disableRipple
                                sx={{
                                    color: '#4b5563',
                                    fontFamily: 'var(--font-lato)',
                                    fontWeight: 700,
                                    textTransform: 'none',
                                    fontSize: '1rem',
                                    '&:hover': { color: '#ea580c', bgcolor: 'transparent' }
                                }}
                            >
                                Dashboard
                            </Button>
                        )}

                        {session ? (
                            <Button
                                onClick={() => logoutAction()}
                                disableRipple
                                sx={{
                                    ml: 2,
                                    bgcolor: '#ea500c2f',
                                    color: '#ea500c',
                                    fontFamily: 'var(--font-lato)',
                                    fontWeight: 700,
                                    textTransform: 'none',
                                    fontSize: '1rem',
                                    px: 3,
                                    '&:hover': { bgcolor: '#ea500c5f' }
                                }}
                            >
                                Logout
                            </Button>
                        ) : (
                            <Button
                                component={Link}
                                href="/login"
                                disableRipple
                                sx={{
                                    ml: 2,
                                    bgcolor: '#ea580c',
                                    color: 'white',
                                    fontFamily: 'var(--font-lato)',
                                    fontWeight: 700,
                                    textTransform: 'none',
                                    fontSize: '1rem',
                                    px: 3,
                                    '&:hover': { bgcolor: '#c2410c' }
                                }}
                            >
                                Login
                            </Button>
                        )}

                    </Box>

                </Toolbar>
            </Container>
        </AppBar>
    );
}