import { NextResponse } from "next/server";

import { connectToDatabase } from "@/database";
import { Link } from "@/interfaces";
import LinkModel from "@/models/Link";

connectToDatabase();

export async function GET(id?: string) {
  try {
    if (id) {
      const link = await LinkModel.findById(id);
      return NextResponse.json(link);
    } else {
      const links = await LinkModel.find({});
      return NextResponse.json(links);
    }
  } catch {
    return NextResponse.json("error", {
      status: 500,
    });
  }
}

export async function POST(req: Request) {
  try {
    const body: Link = await req.json();
    const newLinkModel = new LinkModel(body);
    const saved = await newLinkModel.save();
    return NextResponse.json(saved);
  } catch {
    return NextResponse.json("error", {
      status: 500,
    });
  }
}

export async function DELETE(req: Request) {
  const query = new URL(req.url).searchParams;
  const id = query.get("id");
  try {
    const deletedLinkModel = await LinkModel.findByIdAndDelete(id);

    return NextResponse.json(deletedLinkModel);
  } catch {
    return NextResponse.json(
      {
        error: "Failed to remove link",
      },
      {
        status: 500,
      }
    );
  }
}
