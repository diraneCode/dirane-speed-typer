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
  const usersCollection = db.collection('users');

  // Vérification si l'utilisateur existe déjà
  const existingUser = await usersCollection.findOne({ email });

  if (existingUser) {
    if (score > existingUser.score) {
      // Met à jour si le nouveau score est supérieur
      await usersCollection.updateOne(
        { email },
        { $set: { score } }
      );
      return NextResponse.json({ message: 'Score updated successfully' });
    } else {
      return NextResponse.json({ message: 'Existing score is higher or equal, no update performed' });
    }
  } else {
    // Insère un nouvel utilisateur
    await usersCollection.insertOne({ email, nom, image, score });
    return NextResponse.json({ message: 'Score added successfully' });
  }
}
