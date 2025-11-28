import { Container, Typography, TextField, Button, Box, Paper, InputLabel } from '@mui/material';
import { addRecipe } from '@/app/actions/recipes';
import Link from 'next/link';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

export default function AddRecipePage() {
    return (
        <Container maxWidth="md" sx={{ py: 8 }}>
            <Link href="/dashboard" style={{ textDecoration: 'none' }}>
                <Button startIcon={<ArrowBackIcon />} sx={{ mb: 4 }}>Back to Dashboard</Button>
            </Link>

            <Paper elevation={3} sx={{ p: 4, borderRadius: 4 }}>
                <Typography variant="h4" sx={{ fontFamily: 'var(--font-playfair)', fontWeight: 700, mb: 4 }}>
                    Add New Recipe
                </Typography>

                <form action={addRecipe}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                        <TextField name="name" label="Recipe Name" fullWidth required />
                        <Box sx={{ display: 'flex', gap: 2 }}>
                            <TextField name="category" label="Category (e.g. Beef)" fullWidth required />
                            <TextField name="area" label="Area (e.g. Italian)" fullWidth required />
                        </Box>

                        <Box sx={{ border: '1px dashed #ccc', p: 3, borderRadius: 2, textAlign: 'center' }}>
                            <InputLabel sx={{ mb: 2 }}>Recipe Image</InputLabel>
                            <Button
                                component="label"
                                variant="outlined"
                                startIcon={<CloudUploadIcon />}
                            >
                                Upload File
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
                            Create Recipe
                        </Button>
                    </Box>
                </form>
            </Paper>
        </Container>
    );
}