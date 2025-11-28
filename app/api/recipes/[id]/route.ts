/* eslint-disable @typescript-eslint/no-unused-vars */
import { connectDB } from '@/lib/mongodb';
import Recipe from '@/models/Recipe';
import { NextResponse } from 'next/server';

// PUT: Update a specific recipe
export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        const body = await request.json();
        await connectDB();

        const updatedRecipe = await Recipe.findByIdAndUpdate(id, body, { new: true });

        if (!updatedRecipe) {
            return NextResponse.json({ error: 'Recipe not found' }, { status: 404 });
        }

        return NextResponse.json(updatedRecipe);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to update recipe' }, { status: 500 });
    }
}

// DELETE: Remove a specific recipe
export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        await connectDB();

        const deletedRecipe = await Recipe.findByIdAndDelete(id);

        if (!deletedRecipe) {
            return NextResponse.json({ error: 'Recipe not found' }, { status: 404 });
        }

        return NextResponse.json({ message: 'Recipe deleted successfully' });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to delete recipe' }, { status: 500 });
    }
}