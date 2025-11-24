import { Button, Container, Box, Typography, Grid, Paper, Divider, Chip } from '@mui/material';
import Link from 'next/link';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import YouTubeIcon from '@mui/icons-material/YouTube';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ShuffleIcon from '@mui/icons-material/Shuffle';
import Image from 'next/image';

async function getRandomRecipe() {
    const res = await fetch('https://www.themealdb.com/api/json/v1/1/random.php', { cache: 'no-store' });
    return res.json();
}

export default async function RandomPage() {
    const data = await getRandomRecipe();
    const meal = data.meals[0];

    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
        if (meal[`strIngredient${i}`] && meal[`strIngredient${i}`].trim()) {
            ingredients.push({
                measure: meal[`strMeasure${i}`],
                name: meal[`strIngredient${i}`]
            });
        }
    }

    const imageSrc = meal.strMealThumb || null;

    return (
        <div style={{ backgroundColor: '#fff', minHeight: '100vh', paddingBottom: '80px' }}>

            {/* Header */}
            <Box sx={{ height: '60vh', position: 'relative' }}>
                {imageSrc && (
                    <Image
                        src={imageSrc}
                        alt={meal.strMeal || "Recipe Image"}
                        fill
                        priority
                        style={{ objectFit: 'cover' }}
                    />
                )}
                <Box sx={{
                    position: 'absolute', inset: 0,
                    background: 'linear-gradient(to top, #111827 0%, transparent 80%)',
                    display: 'flex', alignItems: 'flex-end'
                }}>
                    <Container maxWidth="lg" sx={{ pb: 8, position: 'relative', zIndex: 10 }}>
                        <Link href="/" style={{ textDecoration: 'none' }}>
                            <Button
                                startIcon={<ArrowBackIcon />}
                                sx={{ color: 'white', mb: 3, backdropFilter: 'blur(4px)', bgcolor: 'rgba(255,255,255,0.1)', '&:hover': { bgcolor: 'rgba(255,255,255,0.2)' } }}
                            >
                                Back Home
                            </Button>
                        </Link>

                        <Box sx={{ display: 'flex', gap: 2, mb: 3, flexWrap: 'wrap' }}>
                            <Chip label={meal.strCategory} sx={{ bgcolor: '#ea580c', color: 'white', fontWeight: 'bold' }} />
                            <Chip icon={<RestaurantIcon style={{ color: '#fff' }} />} label={meal.strArea} sx={{ bgcolor: 'rgba(255,255,255,0.2)', color: 'white', backdropFilter: 'blur(4px)' }} />
                            <Chip icon={<ShuffleIcon style={{ color: '#fff' }} />} label="Random Pick" sx={{ bgcolor: 'rgba(255,255,255,0.2)', color: 'white', backdropFilter: 'blur(4px)' }} />
                        </Box>

                        <Typography variant="h1" sx={{
                            fontFamily: 'var(--font-playfair)',
                            color: 'white',
                            fontWeight: 700,
                            fontSize: { xs: '2.5rem', md: '4.5rem' },
                            lineHeight: 1.1,
                            maxWidth: '900px',
                            textShadow: '0 4px 20px rgba(0,0,0,0.5)'
                        }}>
                            {meal.strMeal}
                        </Typography>
                    </Container>
                </Box>
            </Box>

            {/* Content Section */}
            <Container maxWidth="lg" sx={{ mt: -6, position: 'relative', zIndex: 20 }}>

                <Paper elevation={3} sx={{ p: { xs: 3, md: 6 }, borderRadius: 6, mb: 6 }}>
                    <Typography variant="h4" sx={{ fontFamily: 'var(--font-playfair)', mb: 4, fontWeight: 700, textAlign: 'center' }}>
                        Ingredients Checklist
                    </Typography>

                    <Grid container spacing={2}>
                        {ingredients.map((ing, idx) => (
                            <Grid item xs={12} sm={6} md={3} key={idx}>
                                <Box sx={{
                                    p: 2,
                                    bgcolor: '#f9fafb',
                                    borderRadius: 3,
                                    border: '1px solid #f3f4f6',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 2,
                                    transition: 'all 0.2s',
                                    '&:hover': { bgcolor: '#fff7ed', borderColor: '#fed7aa', transform: 'translateY(-2px)' }
                                }}>
                                    <CheckCircleOutlineIcon sx={{ color: '#ea580c', opacity: 0.7 }} />
                                    <Box>
                                        <Typography variant="subtitle2" sx={{ fontWeight: 800, color: '#111827' }}>{ing.measure}</Typography>
                                        <Typography variant="body2" sx={{ color: '#6b7280', lineHeight: 1.2 }}>{ing.name}</Typography>
                                    </Box>
                                </Box>
                            </Grid>
                        ))}
                    </Grid>
                </Paper>

                {/* INSTRUCTIONS SECTION */}
                <Box sx={{ maxWidth: '800px', mx: 'auto', textAlign: 'left' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 4 }}>
                        <Box sx={{ width: 40, height: 2, bgcolor: '#ea580c' }} />
                        <Typography variant="h4" sx={{ fontFamily: 'var(--font-playfair)', fontWeight: 700, color: '#111827' }}>
                            Instructions
                        </Typography>
                    </Box>

                    <Typography component="div" sx={{
                        lineHeight: 1.9,
                        color: '#374151',
                        fontSize: '1.2rem',
                        fontFamily: 'var(--font-lato)',
                        whiteSpace: 'pre-line',
                        mb: 6
                    }}>
                        {meal.strInstructions}
                    </Typography>

                    {/* Video & Random Refresh Buttons */}
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, alignItems: 'center', mt: 8 }}>
                        {meal.strYoutube && (
                            <Button
                                variant="outlined"
                                size="large"
                                color="error"
                                startIcon={<YouTubeIcon />}
                                href={meal.strYoutube}
                                target="_blank"
                                sx={{ borderRadius: 50, textTransform: 'none', px: 4, py: 1.5, fontSize: '1.1rem', fontWeight: 'bold' }}
                            >
                                Watch Video Tutorial
                            </Button>
                        )}

                        <Link href="/random" style={{ textDecoration: 'none' }}>
                            <Button
                                variant="contained"
                                size="large"
                                startIcon={<ShuffleIcon />}
                                sx={{
                                    bgcolor: '#ea580c',
                                    '&:hover': { bgcolor: '#c2410c' },
                                    borderRadius: 50,
                                    px: 6,
                                    py: 2,
                                    fontSize: '1.2rem',
                                    fontWeight: 'bold',
                                    boxShadow: '0 10px 25px -5px rgba(234, 88, 12, 0.4)'
                                }}
                            >
                                Try Another Surprise
                            </Button>
                        </Link>
                    </Box>
                </Box>

            </Container>
        </div>
    );
}