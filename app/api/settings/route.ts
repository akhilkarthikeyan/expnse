import { NextResponse } from 'next/server';
import { settingsDb } from '@/lib/database';
import { CURRENCIES } from '@/types';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json({ error: 'User ID required' }, { status: 400 });
    }

    let settings = await settingsDb.get(parseInt(userId));
    
    // If user has no settings, initialize with default
    if (!settings) {
      await settingsDb.set(parseInt(userId), CURRENCIES[0]);
      settings = await settingsDb.get(parseInt(userId));
    }

    return NextResponse.json(settings);
  } catch (error) {
    console.error('Get settings error:', error);
    return NextResponse.json({ error: 'Failed to get settings' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { userId, currency } = await request.json();

    if (!userId || !currency) {
      return NextResponse.json({ error: 'User ID and currency data required' }, { status: 400 });
    }

    await settingsDb.set(userId, currency);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Update settings error:', error);
    return NextResponse.json({ error: 'Failed to update settings' }, { status: 500 });
  }
}
