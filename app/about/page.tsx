/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/no-unescaped-entities */
import { Container, Box, Typography, Grid, Paper, Divider } from '@mui/material';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import Image from 'next/image';

import PeopleIcon from '@mui/icons-material/People';
import PublicIcon from '@mui/icons-material/Public';

export default function AboutPage() {
    return (
        <div style={{ backgroundColor: '#fff', minHeight: '100vh' }}>

            {/* Hero Section */}
            <Box sx={{
                height: '50vh',
                position: 'relative',
                bgcolor: '#111827',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                overflow: 'hidden'
            }}>
                <Box sx={{
                    position: 'absolute', inset: 0,
                    background: 'linear-gradient(to bottom, rgba(0,0,0,0.3), #111827)'
                }} />

                <Container maxWidth="md" sx={{ position: 'relative', zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Box sx={{ width: 80, height: 80, position: 'relative', mb: 3, borderRadius: '50%', overflow: 'hidden', border: '2px solid #ea580c' }}>
                        <Image
                            src="https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"
                            alt="Chef Badge"
                            fill
                            style={{ objectFit: 'cover' }}
                        />
                    </Box>
                    <Typography variant="overline" sx={{ color: '#ea580c', fontWeight: 800, letterSpacing: 2, mb: 2, display: 'block' }}>
                        EST. 2025
                    </Typography>
                    <Typography variant="h1" sx={{
                        fontFamily: 'var(--font-playfair)',
                        color: 'white',
                        fontWeight: 700,
                        fontSize: { xs: '3rem', md: '5rem' },
                        mb: 3
                    }}>
                        Our Culinary <span style={{ color: '#fdba74', fontStyle: 'italic' }}>Journey</span>
                    </Typography>
                    <Typography variant="h6" sx={{ color: 'rgba(255,255,255,0.8)', fontFamily: 'var(--font-lato)', fontWeight: 300 }}>
                        Bringing the world's best recipes to your home kitchen.
                    </Typography>
                </Container>
            </Box>

            {/* Mission Section */}
            <Container maxWidth="xl" sx={{ py: 12, px: { xs: 2, md: 6 } }}>
                <Grid
                    container
                    spacing={8}
                    alignItems="center"
                >
                    <Grid size={{ xs: 12, md: 6 }}>
                        <Box
                            sx={{
                                position: "relative",
                                height: { xs: 300, md: 500 },
                                borderRadius: 8,
                                overflow: "hidden",
                                boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
                            }}
                        >
                            <img
                                src="https://images.unsplash.com/photo-1495521821757-a1efb6729352?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                                alt="Cooking Ingredients"
                                style={{ width: "100%", height: "100%", objectFit: "cover" }}
                            />
                        </Box>
                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>
                        <Typography
                            variant="h3"
                            sx={{
                                fontFamily: "var(--font-playfair)",
                                mb: 4,
                                fontWeight: 700,
                                color: "#111827",
                            }}
                        >
                            We believe cooking is for everyone.
                        </Typography>

                        <Typography
                            sx={{ fontSize: "1.1rem", lineHeight: 1.8, color: "#4b5563", mb: 3 }}
                        >
                            CulinaShare began with a simple idea: that the best recipes aren't just
                            found in Michelin-star restaurants.
                        </Typography>

                        <Typography
                            sx={{ fontSize: "1.1rem", lineHeight: 1.8, color: "#4b5563" }}
                        >
                            Our mission is to democratize fine dining by providing high-quality,
                            easy-to-follow recipes.
                        </Typography>
                    </Grid>
                </Grid>

                <Divider sx={{ my: 12 }} />

                <Box sx={{ textAlign: "center", mb: 8 }}>
                    <Typography
                        variant="h3"
                        sx={{
                            fontFamily: "var(--font-playfair)",
                            fontWeight: 700,
                            color: "#111827",
                            mb: 2,
                        }}
                    >
                        Why Choose CulinaShare?
                    </Typography>
                    <Typography sx={{ color: "#6b7280" }}>
                        More than just a recipe book.
                    </Typography>
                </Box>

                <Grid container spacing={4}>
                    {[
                        {
                            icon: <RestaurantMenuIcon fontSize="large" />,
                            title: "Authentic Recipes",
                            desc: "Curated from cultures around the globe.",
                        },
                        {
                            icon: <PeopleIcon fontSize="large" />,
                            title: "Community First",
                            desc: "Built for food lovers, by food lovers.",
                        },
                        {
                            icon: <PublicIcon fontSize="large" />,
                            title: "Global Reach",
                            desc: "Discover flavors you've never tasted before.",
                        },
                    ].map((item, idx) => (
                        <Grid size={{ xs: 12, md: 4 }} key={idx}>
                            <Paper
                                elevation={0}
                                sx={{
                                    p: 6,
                                    textAlign: "center",
                                    bgcolor: "#f9fafb",
                                    borderRadius: 6,
                                    transition: "all 0.3s",
                                    "&:hover": {
                                        transform: "translateY(-10px)",
                                        bgcolor: "#fff7ed",
                                        boxShadow: "0 10px 30px rgba(234, 88, 12, 0.1)",
                                    },
                                }}
                            >
                                <Box sx={{ color: "#ea580c", mb: 3 }}>{item.icon}</Box>

                                <Typography
                                    variant="h5"
                                    sx={{
                                        fontFamily: "var(--font-playfair)",
                                        fontWeight: 700,
                                        mb: 2,
                                    }}
                                >
                                    {item.title}
                                </Typography>

                                <Typography sx={{ color: "#6b7280", lineHeight: 1.6 }}>
                                    {item.desc}
                                </Typography>
                            </Paper>
                        </Grid>
                    ))}
                </Grid>
            </Container>

        </div>
    );
}