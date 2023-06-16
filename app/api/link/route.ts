import { db } from "@/mongo";
import LinkModel from "@/models/Link";
import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

export async function GET() {
  try {
    await db.connectDB();

    const links = await LinkModel.find().lean();

    return NextResponse.json({ message: "Fetched links", links });
  } catch (error) {
    return NextResponse.json({ message: "Error fetching links", error });
  } finally {
    await db.disconnectDB();
  }
}

export async function POST(req: Request) {
  try {
    await db.connectDB();

    const body = await req.json();
    const data = {
      ...body,
      url: `${process.env.BASE_URL}/chat/${uuidv4()}`,
    };
    const link = await LinkModel.create(data);
    return NextResponse.json(link);
  } catch (error) {
    return NextResponse.json({ message: "Error creating link", error });
  } finally {
    await db.disconnectDB();
  }
}
