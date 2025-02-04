// app/api/leaderboard/route.ts
import { NextResponse } from 'next/server';
import { connectToDatabase } from '../../../lib/mongodb';

export async function GET() {
  try {
    const db = await connectToDatabase();
    const leaderboard = await db.collection('users')
      .find({}, { projection: { _id: 0, email: 1, nom: 1, image: 1, score: 1 } })
      .sort({ score: -1 })
      .toArray();

    return NextResponse.json(leaderboard);
  } catch (error) {
    console.log(error)
    return NextResponse.json({ message: 'Failed to fetch leaderboard' }, { status: 500 });
  }
}
