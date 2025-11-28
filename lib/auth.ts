/* eslint-disable @typescript-eslint/no-explicit-any */
import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';
import { LoginFormData } from '@/lib/definitions';

const secretKey = 'secret-key-change-this-in-production';
const key = new TextEncoder().encode(secretKey);

// 1. Encrypt Session
export async function encrypt(payload: any) {
    return await new SignJWT(payload)
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime('1 hour')
        .sign(key);
}

// 2. Decrypt Session
export async function decrypt(input: string): Promise<any> {
    const { payload } = await jwtVerify(input, key, {
        algorithms: ['HS256'],
    });
    return payload;
}

// 3. Login Function (REAL DATABASE)
export async function login(formData: LoginFormData) {
    const { connectDB } = await import('@/lib/mongodb');
    const { default: User } = await import('@/models/User');

    // Connect to DB
    await connectDB();

    // Find User in MongoDB
    const user = await User.findOne({ email: formData.email });

    // Check if user exists AND password matches
    if (user && user.password === formData.password) {
        const sessionUser = {
            email: user.email,
            name: user.name,
            role: user.role
        };

        const expires = new Date(Date.now() + 60 * 60 * 1000);
        const session = await encrypt({ user: sessionUser, expires });

        const cookieStore = await cookies();
        cookieStore.set('session', session, { expires, httpOnly: true });

        return true;
    }

    return false;
}

export async function logout() {
    const cookieStore = await cookies();
    cookieStore.delete('session');
}

export async function getSession() {
    const cookieStore = await cookies();
    const session = cookieStore.get('session')?.value;
    if (!session) return null;
    return await decrypt(session);
}