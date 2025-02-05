import { connectToDatabase } from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";
import { ObjectId } from "mongodb";

export async function GET(req: NextRequest) {
    const url = new URL(req.url);
    const pid = url.searchParams.get("pid");

    if (!pid) {
        return NextResponse.json({ message: "User ID (pid) is required" }, { status: 400 });
    }

    try {
        const db = await connectToDatabase();
        const user = await db.collection("user").findOne({ _id: new ObjectId(pid) });

        if (!user) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }

        return NextResponse.json({ score: user.score });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Failed to fetch score" }, { status: 500 });
    }
}
