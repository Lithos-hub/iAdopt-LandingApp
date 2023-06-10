import { db, seedData } from "@/mongo";
import LinkModel from "@/models/Link";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await db.connectDB();

    await LinkModel.insertMany(seedData);
    return NextResponse.json({ message: "Seeded database" });
  } catch (error) {
    return NextResponse.json({ message: "Error seeding database" });
  } finally {
    await db.disconnectDB();
  }
}
