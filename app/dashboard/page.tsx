/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/no-unescaped-entities */
import { Container, Typography, Box, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton } from '@mui/material';
import { getSession } from '@/lib/auth';
import { connectDB } from '@/lib/mongodb';
import Recipe from '@/models/Recipe';
import { redirect } from 'next/navigation';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import Link from 'next/link';
import { deleteRecipe } from '@/app/actions/recipes';

export default async function DashboardPage() {
    const session = await getSession();
    if (!session) redirect('/login');

    await connectDB();
    const recipes = await Recipe.find({}).sort({ createdAt: -1 }).lean();

    return (
        <Container maxWidth="lg" sx={{ py: 8 }}>

            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 6 }}>
                <Box>
                    <Typography variant="h4" sx={{ fontFamily: 'var(--font-playfair)', fontWeight: 700, color: '#ea580c' }}>
                        Admin Dashboard
                    </Typography>
                    <Typography color="text.secondary">Manage your custom recipes</Typography>
                </Box>
            </Box>

            <Box sx={{ mb: 4, display: 'flex', justifyContent: 'flex-end' }}>
                <Link href="/dashboard/add">
                    <Button variant="contained" startIcon={<AddIcon />} sx={{ bgcolor: '#ea580c' }}>
                        Add New Recipe
                    </Button>
                </Link>
            </Box>

            <TableContainer component={Paper} elevation={0} sx={{ borderRadius: 4, border: '1px solid #e5e7eb' }}>
                <Table>
                    <TableHead sx={{ bgcolor: '#f9fafb' }}>
                        <TableRow>
                            <TableCell sx={{ fontWeight: 'bold' }}>Name</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Category</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Area</TableCell>
                            <TableCell sx={{ fontWeight: 'bold', textAlign: 'right' }}>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {recipes.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={4} align="center" sx={{ py: 4, color: '#999' }}>
                                    No custom recipes found. Click "Add New" to create one.
                                </TableCell>
                            </TableRow>
                        ) : (
                            recipes.map((recipe: any) => (
                                <TableRow key={recipe._id}>
                                    <TableCell sx={{ fontWeight: 'bold' }}>{recipe.name}</TableCell>
                                    <TableCell>{recipe.category}</TableCell>
                                    <TableCell>{recipe.area}</TableCell>
                                    <TableCell align="right">
                                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
                                            <Link href={`/dashboard/edit/${recipe._id}`}>
                                                <IconButton color="primary">
                                                    <EditIcon />
                                                </IconButton>
                                            </Link>

                                            <form action={deleteRecipe.bind(null, recipe._id.toString())}>
                                                <IconButton type="submit" color="error">
                                                    <DeleteIcon />
                                                </IconButton>
                                            </form>
                                        </Box>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </TableContainer>

        </Container>
    );
}