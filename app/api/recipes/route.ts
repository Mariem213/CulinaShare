/* eslint-disable @typescript-eslint/no-unused-vars */
import { connectDB } from '@/lib/mongodb';
import Recipe from '@/models/Recipe';
import { NextResponse } from 'next/server';

// GET: List all recipes
export async function GET() {
    try {
        await connectDB();
        const recipes = await Recipe.find({}).sort({ createdAt: -1 });
        return NextResponse.json(recipes);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch recipes' }, { status: 500 });
    }
}

// POST: Create a new recipe
export async function POST(request: Request) {
    try {
        await connectDB();
        // We expect JSON data from Postman
        const body = await request.json();

        if (!body.name || !body.category) {
            return NextResponse.json({ error: 'Name and Category are required' }, { status: 400 });
        }

        const newRecipe = await Recipe.create(body);
        return NextResponse.json(newRecipe, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to create recipe' }, { status: 500 });
    }
}