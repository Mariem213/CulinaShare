/* eslint-disable @typescript-eslint/no-explicit-any */
import { Container, Box, Typography, Button, Paper, Chip } from '@mui/material';
import Link from 'next/link';
import Image from 'next/image';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { connectDB } from '@/lib/mongodb';
import Recipe from '@/models/Recipe';
import RestaurantIcon from '@mui/icons-material/Restaurant';

export default async function CommunityRecipeDetail({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    await connectDB();
    const recipe = await Recipe.findById(id).lean() as any;

    if (!recipe) return <div>Recipe not found</div>;

    return (
        <div style={{ backgroundColor: '#fff', minHeight: '100vh', paddingBottom: '80px' }}>

            {/* Immersive Header */}
            <Box sx={{ height: '50vh', position: 'relative' }}>
                <Image
                    src={recipe.thumb}
                    alt={recipe.name}
                    fill
                    priority
                    style={{ objectFit: 'cover' }}
                />
                <Box sx={{
                    position: 'absolute', inset: 0,
                    background: 'linear-gradient(to top, #111827 0%, transparent 80%)',
                    display: 'flex', alignItems: 'flex-end'
                }}>
                    <Container maxWidth="lg" sx={{ pb: 8, position: 'relative', zIndex: 10 }}>
                        <Link href="/community-recipes" style={{ textDecoration: 'none' }}>
                            <Button
                                startIcon={<ArrowBackIcon />}
                                sx={{ color: 'white', mb: 3, backdropFilter: 'blur(4px)', bgcolor: 'rgba(255,255,255,0.1)' }}
                            >
                                Back to Community
                            </Button>
                        </Link>

                        <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
                            <Chip label={recipe.category} sx={{ bgcolor: '#ea580c', color: 'white', fontWeight: 'bold' }} />
                            <Chip icon={<RestaurantIcon style={{ color: '#fff' }} />} label={recipe.area} sx={{ bgcolor: 'rgba(255,255,255,0.2)', color: 'white', backdropFilter: 'blur(4px)' }} />
                        </Box>

                        <Typography variant="h1" sx={{
                            fontFamily: 'var(--font-playfair)',
                            color: 'white',
                            fontWeight: 700,
                            fontSize: { xs: '2.5rem', md: '4.5rem' },
                            textShadow: '0 4px 20px rgba(0,0,0,0.5)'
                        }}>
                            {recipe.name}
                        </Typography>
                    </Container>
                </Box>
            </Box>

            {/* Content */}
            <Container maxWidth="md" sx={{ mt: 8 }}>
                <Paper elevation={0} sx={{ p: 6, bgcolor: '#f9fafb', borderRadius: 6 }}>
                    <Typography variant="h4" sx={{ fontFamily: 'var(--font-playfair)', mb: 4, fontWeight: 700, color: '#111827' }}>
                        Instructions
                    </Typography>

                    <Typography component="div" sx={{
                        lineHeight: 1.9,
                        color: '#374151',
                        fontSize: '1.2rem',
                        fontFamily: 'var(--font-lato)',
                        whiteSpace: 'pre-line'
                    }}>
                        {recipe.instructions}
                    </Typography>
                </Paper>
            </Container>
        </div>
    );
}