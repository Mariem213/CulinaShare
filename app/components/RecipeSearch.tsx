/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useState } from 'react';
import { TextField, Button, Grid, Typography, Box, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Image from 'next/image';
import Link from 'next/link';

export default function RecipeSearch() {
    const [query, setQuery] = useState('');
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searched, setSearched] = useState(false);

    const searchRecipes = async (e: any) => {
        e.preventDefault();
        if (!query) return;
        setLoading(true);
        setSearched(true);

        try {
            const res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
            const data = await res.json();
            setRecipes(data.meals || []);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box sx={{ maxWidth: '800px', mx: 'auto' }}>
            <form onSubmit={searchRecipes}>
                <Box sx={{
                    display: 'flex',
                    bgcolor: 'white',
                    p: 1,
                    borderRadius: '50px',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
                    border: '1px solid #eee'
                }}>
                    <TextField
                        fullWidth
                        placeholder="What are you hungry for? (e.g. Burger)"
                        variant="standard"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        InputProps={{
                            disableUnderline: true,
                            startAdornment: (
                                <InputAdornment position="start" sx={{ pl: 2 }}>
                                    <SearchIcon sx={{ color: '#ccc' }} />
                                </InputAdornment>
                            ),
                            sx: { px: 2, pt: 0.8, fontSize: '1.1rem', fontFamily: 'var(--font-lato)' }
                        }}
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        disabled={loading}
                        sx={{
                            borderRadius: '50px',
                            px: 4,
                            py: 1,
                            bgcolor: '#111827',
                            color: 'white',
                            textTransform: 'none',
                            fontSize: '1rem',
                            '&:hover': { bgcolor: '#000' }
                        }}
                    >
                        {loading ? 'Searching...' : 'Search'}
                    </Button>
                </Box>
            </form>

            {searched && (
                <Box sx={{ mt: 6, textAlign: 'left' }}>
                    <Typography variant="h6" sx={{ mb: 3, fontFamily: 'var(--font-playfair)' }}>
                        {recipes.length > 0 ? `Found ${recipes.length} recipes` : 'No recipes found, chef.'}
                    </Typography>

                    <Grid container spacing={3}>
                        {recipes.map((meal: any) => (
                            <Grid size={{ xs: 12, md: 6 }} key={meal.idMeal}>
                                <Link href={`/recipe/${meal.idMeal}`} style={{ textDecoration: 'none' }}>
                                    <Box sx={{
                                        display: 'flex',
                                        gap: 2,
                                        p: 2,
                                        bgcolor: 'white',
                                        borderRadius: 4,
                                        transition: '0.2s',
                                        cursor: 'pointer',
                                        '&:hover': { bgcolor: '#fff7ed' }
                                    }}>
                                        <Box sx={{ position: 'relative', width: '100px', height: '100px', flexShrink: 0 }}>
                                            <Image
                                                src={meal.strMealThumb}
                                                alt={meal.strMeal}
                                                fill
                                                sizes="100px"
                                                style={{ borderRadius: '12px', objectFit: 'cover' }}
                                            />
                                        </Box>

                                        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                                            <Typography variant="subtitle2" sx={{ color: '#ea580c', fontWeight: 'bold', fontSize: '0.75rem' }}>
                                                {meal.strCategory.toUpperCase()}
                                            </Typography>
                                            <Typography variant="h6" sx={{ fontFamily: 'var(--font-playfair)', fontWeight: 700, lineHeight: 1.2, color: '#1f2937' }}>
                                                {meal.strMeal}
                                            </Typography>
                                            <Box sx={{ display: 'flex', alignItems: 'center', mt: 1, color: '#9ca3af', fontSize: '0.8rem' }}>
                                                View Recipe <ArrowForwardIcon sx={{ fontSize: 14, ml: 0.5 }} />
                                            </Box>
                                        </Box>
                                    </Box>
                                </Link>
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            )}
        </Box>
    );
}