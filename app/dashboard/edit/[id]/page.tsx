/* eslint-disable @typescript-eslint/no-explicit-any */
import { Container, Typography, TextField, Button, Box, Paper, InputLabel } from '@mui/material';
import { updateRecipe } from '@/app/actions/recipes';
import Link from 'next/link';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { connectDB } from '@/lib/mongodb';
import Recipe from '@/models/Recipe';
import { redirect } from 'next/navigation';
import Image from 'next/image';

export default async function EditRecipePage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    await connectDB();
    const recipe: any = await Recipe.findById(id).lean();

    if (!recipe) redirect('/dashboard');

    return (
        <Container maxWidth="md" sx={{ py: 8 }}>
            <Link href="/dashboard" style={{ textDecoration: 'none' }}>
                <Button startIcon={<ArrowBackIcon />} sx={{ mb: 4 }}>Back to Dashboard</Button>
            </Link>

            <Paper elevation={3} sx={{ p: 4, borderRadius: 4 }}>
                <Typography variant="h4" sx={{ fontFamily: 'var(--font-playfair)', fontWeight: 700, mb: 4 }}>
                    Edit Recipe
                </Typography>

                <form action={updateRecipe.bind(null, id)}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                        <TextField
                            name="name"
                            label="Recipe Name"
                            defaultValue={recipe.name}
                            fullWidth
                            required
                        />
                        <Box sx={{ display: 'flex', gap: 2 }}>
                            <TextField
                                name="category"
                                label="Category"
                                defaultValue={recipe.category}
                                fullWidth
                                required
                            />
                            <TextField
                                name="area"
                                label="Area"
                                defaultValue={recipe.area}
                                fullWidth
                                required
                            />
                        </Box>

                        <Box sx={{ border: '1px dashed #ccc', p: 3, borderRadius: 2 }}>
                            <InputLabel sx={{ mb: 2 }}>Current Image</InputLabel>
                            {recipe.thumb && (
                                <Box sx={{ position: 'relative', width: 100, height: 100, mb: 2, borderRadius: 2, overflow: 'hidden' }}>
                                    <Image src={recipe.thumb} alt="Current" fill style={{ objectFit: 'cover' }} />
                                </Box>
                            )}

                            <Button
                                component="label"
                                variant="outlined"
                                startIcon={<CloudUploadIcon />}
                            >
                                Change Image
                                <input
                                    type="file"
                                    name="thumb"
                                    accept="image/*"
                                    hidden
                                />
                            </Button>
                        </Box>

                        <TextField
                            name="instructions"
                            label="Instructions"
                            defaultValue={recipe.instructions}
                            multiline
                            rows={6}
                            fullWidth
                            required
                        />

                        <Button
                            type="submit"
                            variant="contained"
                            size="large"
                            sx={{ bgcolor: '#ea580c', fontWeight: 'bold', py: 1.5 }}
                        >
                            Update Recipe
                        </Button>
                    </Box>
                </form>
            </Paper>
        </Container>
    );
}