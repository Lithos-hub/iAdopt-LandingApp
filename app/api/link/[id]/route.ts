import { db } from "@/mongo";
import LinkModel from "@/models/Link";
import { NextResponse } from "next/server";
import { LinkDTO } from "@/interfaces";

export async function GET(
  _: Request,
  { params: { id } }: { params: { id: string } }
) {
  try {
    await db.connectDB();

    const fullUrl = `${process.env.BASE_URL}/chat/${id}`;

    const { description, isSubmitted, email } = (await LinkModel.findOne({
      url: fullUrl,
    })) as LinkDTO;

    return NextResponse.json({
      email,
      description,
      isSubmitted,
    });
  } catch (error) {
    return NextResponse.json({ message: "Error fetching description", error });
  } finally {
    await db.disconnectDB();
  }
}

export async function DELETE(_: Request, context: { params: { id: string } }) {
  const id = context.params.id;
  try {
    await db.connectDB();
    const link = await LinkModel.findByIdAndDelete(id);
    return NextResponse.json({ message: "Removed link", link });
  } catch (error) {
    return NextResponse.json({ message: "Error removing link", error });
  } finally {
    await db.disconnectDB();
  }
}

export async function PATCH(_: Request, context: { params: { id: string } }) {
  const id = context.params.id;
  try {
    await db.connectDB();
    await LinkModel.findOneAndUpdate(
      { url: `${process.env.BASE_URL}/chat/${id}` },
      { isSubmitted: true },
      { new: true }
    );
    return NextResponse.json({ message: "Updated with success" });
  } catch (error) {
    return NextResponse.json({ message: "Error updating link", error });
  } finally {
    await db.disconnectDB();
  }
}
