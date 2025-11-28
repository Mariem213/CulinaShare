'use client';

import { useState } from 'react';
import { Container, Box, Typography, TextField, Button, Paper, Alert } from '@mui/material';
import { useRouter } from 'next/navigation';
import LockIcon from '@mui/icons-material/Lock';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        const res = await fetch('/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        });

        if (res.ok) {
            router.push('/');
            router.refresh();
        } else {
            setError('Invalid email or password. Please try again.');
        }
    };

    return (
        <Container maxWidth="sm" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '80vh' }}>
            <Paper elevation={3} sx={{ p: 4, width: '100%', borderRadius: 4, textAlign: 'center' }}>
                <Box sx={{ mb: 3, display: 'inline-flex', p: 2, bgcolor: '#fff7ed', borderRadius: '50%' }}>
                    <LockIcon sx={{ fontSize: 40, color: '#ea580c' }} />
                </Box>
                <Typography variant="h4" sx={{ fontFamily: 'var(--font-playfair)', fontWeight: 700, mb: 1 }}>
                    Welcome Back
                </Typography>
                <Typography color="text.secondary" sx={{ mb: 4 }}>
                    Sign in to your CulinaShare account
                </Typography>

                {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}

                <form onSubmit={handleSubmit}>
                    <TextField
                        fullWidth
                        label="Email"
                        variant="outlined"
                        sx={{ mb: 3 }}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <TextField
                        fullWidth
                        label="Password"
                        type="password"
                        variant="outlined"
                        sx={{ mb: 4 }}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Button
                        fullWidth
                        type="submit"
                        variant="contained"
                        size="large"
                        sx={{
                            bgcolor: '#ea580c',
                            py: 1.5,
                            fontWeight: 'bold',
                            '&:hover': { bgcolor: '#c2410c' }
                        }}
                    >
                        Sign In
                    </Button>
                </form>

                <Typography variant="caption" sx={{ display: 'block', mt: 2, color: '#999' }}>
                    Test Accounts: admin@culina.com / mariem@example.com (Pass: password123)
                </Typography>
            </Paper>
        </Container>
    );
}