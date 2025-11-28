/* eslint-disable @typescript-eslint/no-explicit-any */
import { Container, Typography, Grid, Box, Chip } from '@mui/material';
import Link from 'next/link';
import Image from 'next/image';
import { connectDB } from '@/lib/mongodb';
import Recipe from '@/models/Recipe';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';

export default async function CommunityRecipesPage() {
    await connectDB();
    // Fetch all recipes from MongoDB
    const recipes = await Recipe.find({}).sort({ createdAt: -1 }).lean();

    return (
        <div style={{ backgroundColor: '#f9fafb', minHeight: '100vh', paddingBottom: '80px' }}>

            {/* Hero Header */}
            <Box sx={{ bgcolor: '#111827', color: 'white', py: 12, textAlign: 'center', mb: 8 }}>
                <Container maxWidth="md">
                    <Typography variant="overline" sx={{ color: '#ea580c', fontWeight: 800, letterSpacing: 2 }}>
                        FROM OUR KITCHEN TO YOURS
                    </Typography>
                    <Typography variant="h2" sx={{ fontFamily: 'var(--font-playfair)', fontWeight: 700, my: 2 }}>
                        Community Recipes
                    </Typography>
                    <Typography sx={{ opacity: 0.8, fontSize: '1.2rem', fontFamily: 'var(--font-lato)' }}>
                        Discover exclusive dishes created by our top chefs and community members.
                    </Typography>
                </Container>
            </Box>

            <Container maxWidth="lg">
                {recipes.length === 0 ? (
                    <Box sx={{ textAlign: 'center', py: 10 }}>
                        <RestaurantMenuIcon sx={{ fontSize: 60, color: '#d1d5db', mb: 2 }} />
                        <Typography variant="h5" color="text.secondary">No community recipes yet.</Typography>
                    </Box>
                ) : (
                    <Grid container spacing={4}>
                        {recipes.map((recipe: any) => (
                            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={recipe._id} sx={{ display: 'flex' }}>
                                <Link href={`/community-recipes/${recipe._id}`} style={{ textDecoration: 'none', width: '100%' }}>
                                    <Box sx={{
                                        display: 'flex', flexDirection: 'column', height: '100%',
                                        bgcolor: 'white', borderRadius: 4, overflow: 'hidden',
                                        boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)',
                                        transition: 'transform 0.2s',
                                        '&:hover': { transform: 'translateY(-8px)', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)' }
                                    }}>
                                        <Box sx={{ position: 'relative', height: 200, width: '100%' }}>
                                            <Image
                                                src={recipe.thumb}
                                                alt={recipe.name}
                                                fill
                                                style={{ objectFit: 'cover' }}
                                            />
                                        </Box>

                                        <Box sx={{ p: 3, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                                            <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                                                <Chip label={recipe.category} size="small" sx={{ bgcolor: '#fff7ed', color: '#ea580c', fontWeight: 'bold' }} />
                                                <Chip label={recipe.area} size="small" variant="outlined" />
                                            </Box>
                                            <Typography variant="h5" sx={{ fontFamily: 'var(--font-playfair)', fontWeight: 700, color: '#1f2937', mb: 1 }}>
                                                {recipe.name}
                                            </Typography>
                                            <Typography variant="body2" sx={{ color: '#6b7280', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                                                {recipe.instructions}
                                            </Typography>
                                        </Box>
                                    </Box>
                                </Link>
                            </Grid>
                        ))}
                    </Grid>
                )}
            </Container>
        </div>
    );
}