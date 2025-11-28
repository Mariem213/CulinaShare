/* eslint-disable @typescript-eslint/no-explicit-any */
'use server';

import { connectDB } from '@/lib/mongodb';
import Recipe from '@/models/Recipe';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';

async function saveFile(file: File): Promise<string> {
    const uploadDir = path.join(process.cwd(), 'public/uploads');
    await mkdir(uploadDir, { recursive: true });

    const filename = `${Date.now()}-${file.name.replaceAll(' ', '_')}`;
    const filepath = path.join(uploadDir, filename);

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    await writeFile(filepath, buffer);

    return `/uploads/${filename}`;
}

export async function addRecipe(formData: FormData) {
    await connectDB();

    const name = formData.get('name');
    const category = formData.get('category');
    const area = formData.get('area');
    const instructions = formData.get('instructions');

    const file = formData.get('thumb') as File;
    let thumb = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c';

    if (file && file.size > 0) {
        thumb = await saveFile(file);
    }

    await Recipe.create({ name, category, area, instructions, thumb });

    revalidatePath('/dashboard');
    revalidatePath('/community-recipes');
    redirect('/dashboard');
}

export async function updateRecipe(id: string, formData: FormData) {
    await connectDB();

    const name = formData.get('name');
    const category = formData.get('category');
    const area = formData.get('area');
    const instructions = formData.get('instructions');
    const file = formData.get('thumb') as File;

    const updateData: any = { name, category, area, instructions };

    if (file && file.size > 0) {
        updateData.thumb = await saveFile(file);
    }

    await Recipe.findByIdAndUpdate(id, updateData);

    revalidatePath('/dashboard');
    revalidatePath('/community-recipes');
    revalidatePath(`/community-recipes/${id}`);
    redirect('/dashboard');
}

export async function deleteRecipe(id: string) {
    await connectDB();
    await Recipe.findByIdAndDelete(id);
    revalidatePath('/dashboard');
    revalidatePath('/community-recipes');
}