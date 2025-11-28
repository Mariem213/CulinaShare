/* eslint-disable @typescript-eslint/no-unused-vars */
import { login } from '@/lib/auth';
import { LoginFormSchema } from '@/lib/definitions';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validation = LoginFormSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        {
          message: 'Invalid input',
          errors: validation.error.flatten().fieldErrors
        },
        { status: 400 }
      );
    }

    const success = await login(validation.data);

    if (success) {
      return NextResponse.json({ message: 'Login successful' }, { status: 200 });
    } else {
      return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
    }

  } catch (error) {
    return NextResponse.json({ message: 'Something went wrong' }, { status: 500 });
  }
}