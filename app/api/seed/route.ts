import { connectDB } from '@/lib/mongodb';
import User from '@/models/User';
import { NextResponse } from 'next/server';

export async function GET() {
    await connectDB();

    // 1. Check if users already exist
    const existingUsers = await User.find();
    if (existingUsers.length > 0) {
        return NextResponse.json({ message: 'Database already seeded!' });
    }

    // 2. Create Test Users
    const users = [
        {
            email: 'admin@culina.com',
            password: 'password123',
            name: 'Chef Admin',
            role: 'admin'
        },
        {
            email: 'mariem@example.com',
            password: 'password123',
            name: 'Mariem Elgendy',
            role: 'user'
        }
    ];

    await User.insertMany(users);

    return NextResponse.json({ message: 'Database seeded successfully!' });
}