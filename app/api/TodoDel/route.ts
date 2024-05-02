import Todo from "@/Models/Todo";
import DbConnect from "@/libs/mongooesConnect";
import { NextResponse } from "next/server";

export async function DELETE(req: any) {
  try {
    const { id } = await req.json(); // Assuming the id is in the query parameters

    console.log("Id in backend:", id);

    await DbConnect();

    const deletedTodo = await Todo.findByIdAndDelete(id); // Use id directly

    return NextResponse.json({
      message: "Todo deleted successfully",
      deletedTodo,
    });
  } catch (error) {
    console.log(error);
  }
}
