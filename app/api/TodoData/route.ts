import Todo from "@/Models/Todo";
import DbConnect from "@/libs/mongooesConnect";
import { NextResponse } from "next/server";

export async function GET() {
  await DbConnect();
  const data = await Todo.find();
  
  return NextResponse.json(data);
}
