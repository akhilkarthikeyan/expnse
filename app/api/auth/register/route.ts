import { NextResponse } from 'next/server';
import { userDb, initDatabase } from '@/lib/database';

export async function POST(request: Request) {
  try {
    // Ensure database is initialized
    await initDatabase();
    
    const { username, password } = await request.json();

    if (!username || !password) {
      return NextResponse.json(
        { error: 'Username and password are required' },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await userDb.findByUsername(username);
    if (existingUser) {
      return NextResponse.json(
        { error: 'Username already exists' },
        { status: 400 }
      );
    }

    // Create new user
    const userId = await userDb.create(username, password);

    return NextResponse.json({
      success: true,
      userId,
      username,
    });
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { error: 'Registration failed' },
      { status: 500 }
    );
  }
}
