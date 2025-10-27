import { NextResponse } from 'next/server';
import { categoryDb, settingsDb } from '@/lib/database';
import { DEFAULT_CATEGORIES } from '@/types';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json({ error: 'User ID required' }, { status: 400 });
    }

    let categories = await categoryDb.getAll(parseInt(userId));
    
    // If user has no categories, initialize with defaults
    if (categories.length === 0) {
      for (const cat of DEFAULT_CATEGORIES) {
        await categoryDb.create(parseInt(userId), cat);
      }
      categories = await categoryDb.getAll(parseInt(userId));
    }

    return NextResponse.json(categories);
  } catch (error) {
    console.error('Get categories error:', error);
    return NextResponse.json({ error: 'Failed to get categories' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { userId, category } = await request.json();

    if (!userId || !category) {
      return NextResponse.json({ error: 'User ID and category data required' }, { status: 400 });
    }

    await categoryDb.create(userId, category);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Create category error:', error);
    return NextResponse.json({ error: 'Failed to create category' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    const categoryId = searchParams.get('categoryId');

    if (!userId || !categoryId) {
      return NextResponse.json({ error: 'User ID and category ID required' }, { status: 400 });
    }

    await categoryDb.delete(parseInt(userId), categoryId);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Delete category error:', error);
    return NextResponse.json({ error: 'Failed to delete category' }, { status: 500 });
  }
}
