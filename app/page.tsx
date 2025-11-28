/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/no-unescaped-entities */
import RecipeSearch from './components/RecipeSearch';
import { Container, Typography, Grid, Box, Chip } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Image from 'next/image';
import Link from 'next/link';

async function getFeaturedRecipes() {
  const res = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=chicken');
  if (!res.ok) throw new Error('Failed to fetch data');
  return res.json();
}

export default async function Home() {
  const data = await getFeaturedRecipes();
  const featured = data.meals ? data.meals.slice(0, 3) : [];

  return (
    <div>
      {/* Hero Section */}
      <Box sx={{
        position: 'relative',
        bgcolor: '#111827',
        color: 'white',
        py: { xs: 8, md: 16 },
        backgroundImage: 'linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.7)), url("")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        mb: 8
      }}>
        <Container maxWidth="lg" sx={{ textAlign: 'center' }}>
          <Chip label="Daily Inspiration" sx={{ bgcolor: '#ea580c', color: 'white', mb: 3, fontWeight: 'bold' }} />
          <Typography variant="h1" sx={{
            fontFamily: 'var(--font-playfair)',
            fontSize: { xs: '3rem', md: '5rem' },
            fontWeight: 700,
            lineHeight: 1.1,
            mb: 3
          }}>
            Taste the <span style={{ fontStyle: 'italic', color: '#fdba74' }}>Extraordinary</span>
          </Typography>
          <Typography variant="h6" sx={{
            fontFamily: 'var(--font-lato)',
            opacity: 0.9,
            maxWidth: '600px',
            mx: 'auto',
            fontWeight: 300
          }}>
            Explore a curated collection of recipes from around the globe.
            From rustic Italian pastas to spicy Asian curries.
          </Typography>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ mb: 12 }}>

        {/* Featured Section (SSG) */}
        <Box sx={{ mb: 6, display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
          <Typography variant="h3" sx={{ fontFamily: 'var(--font-playfair)', fontWeight: 700, color: '#1f2937' }}>
            Editor's Pick
          </Typography>
          <Typography variant="subtitle2" sx={{ color: '#ea580c', fontWeight: 'bold', display: 'flex', alignItems: 'center' }}>
            STATISTICALLY GENERATED <ArrowForwardIcon fontSize="small" sx={{ ml: 0.5 }} />
          </Typography>
        </Box>

        <Grid container spacing={4} alignItems="stretch">
          {featured.map((meal: any) => (
            <Grid size={{ xs: 12, md: 4 }} key={meal.idMeal} sx={{ display: 'flex', mx: 'auto' }}>
              <Link href={`/recipe/${meal.idMeal}`} style={{ textDecoration: 'none', width: '100%', display: 'flex' }}>
                <Box sx={{
                  width: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  cursor: 'pointer',
                  bgcolor: 'white',
                  borderRadius: 4,
                  overflow: 'hidden',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)',
                  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                  '&:hover': {
                    transform: 'translateY(-12px)',
                    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
                  },
                  '&:hover .image-scale': { transform: 'scale(1.08)' }
                }}>
                  <Box sx={{
                    position: 'relative',
                    width: '100%',
                    aspectRatio: '4/3',
                    overflow: 'hidden'
                  }}>
                    <Image
                      className="image-scale"
                      src={meal.strMealThumb}
                      alt={meal.strMeal}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      style={{ objectFit: 'cover', transition: 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)' }}
                    />
                  </Box>

                  <Box sx={{ p: 3, flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <Typography variant="overline" sx={{ color: '#ea580c', fontWeight: 800, letterSpacing: 1, mb: 1, display: 'block' }}>
                      {meal.strCategory}
                    </Typography>
                    <Typography variant="h5" sx={{ fontFamily: 'var(--font-playfair)', fontWeight: 700, lineHeight: 1.2, mb: 1, color: '#1f2937' }}>
                      {meal.strMeal}
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#6b7280' }}>
                      {meal.strArea} Cuisine • Simple to make
                    </Typography>
                  </Box>
                </Box>
              </Link>
            </Grid>
          ))}
        </Grid>

        {/* Search Section (CSR) */}
        <Box sx={{ mt: 12, bgcolor: '#fff7ed', borderRadius: 8, p: { xs: 4, md: 8 }, textAlign: 'center' }}>
          <Typography variant="h3" sx={{ fontFamily: 'var(--font-playfair)', mb: 2 }}>
            Find your craving
          </Typography>
          <Typography variant="body1" sx={{ color: '#666', mb: 6 }}>
            Search over 10,000 recipes by ingredient, name, or country.
          </Typography>

          <RecipeSearch />
        </Box>

      </Container>
    </div>
  );
}