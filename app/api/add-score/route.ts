// app/api/add-score/route.ts
import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';

export async function POST(request: Request) {
  const session = await request.json();
  const { email, nom, image, score } = session;

  if (!email || typeof score !== 'number') {
    return NextResponse.json({ message: 'Invalid input' }, { status: 400 });
  }

  const db = await connectToDatabase();
  await db.collection('users').updateOne(
    { email, nom, image },
    { $set: { score } },
    { upsert: true }
  );

  return NextResponse.json({ message: 'Score added successfully' });
}
