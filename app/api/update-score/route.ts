// app/api/update-score/route.ts
import { NextResponse } from 'next/server';
import { connectToDatabase } from '../../../lib/mongodb';

export async function PUT(request: Request) {
  const { email, nom, image, score } = await request.json();

  if (!email || typeof score !== 'number') {
    return NextResponse.json({ message: 'Invalid input' }, { status: 400 });
  }

  const db = await connectToDatabase();
  await db.collection('users').updateOne(
    { email, nom, image },
    { $set: { score } }
  );

  return NextResponse.json({ message: 'Score updated successfully' });
}
