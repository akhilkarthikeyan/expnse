import { NextResponse } from 'next/server';
import { expenseDb } from '@/lib/database';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json({ error: 'User ID required' }, { status: 400 });
    }

    const expenses = await expenseDb.getAll(parseInt(userId));
    return NextResponse.json(expenses);
  } catch (error) {
    console.error('Get expenses error:', error);
    return NextResponse.json({ error: 'Failed to get expenses' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { userId, expense } = await request.json();

    if (!userId || !expense) {
      return NextResponse.json({ error: 'User ID and expense data required' }, { status: 400 });
    }

    await expenseDb.create(userId, expense);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Create expense error:', error);
    return NextResponse.json({ error: 'Failed to create expense' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    const expenseId = searchParams.get('expenseId');

    if (!userId || !expenseId) {
      return NextResponse.json({ error: 'User ID and expense ID required' }, { status: 400 });
    }

    await expenseDb.delete(parseInt(userId), expenseId);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Delete expense error:', error);
    return NextResponse.json({ error: 'Failed to delete expense' }, { status: 500 });
  }
}
