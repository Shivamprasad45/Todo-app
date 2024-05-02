import Todo from "@/Models/Todo";
import DbConnect from "@/libs/mongooesConnect";
import { NextResponse } from "next/server";

export async function POST(request: any) {
  try {
    const { title } = await request.json();

    await DbConnect();
    await Todo.create({ title });
    return NextResponse.json({ title });
  } catch (error) {
    console.log(error);
  }
}

export async function PUT(req: any) {
  try {
    const { Data, title } = await req.json();
    console.log(Data._id, title, "Text");

    // Connect to the database (assuming DbConnect() handles this)
    await DbConnect();

    // Update the todo item
    const data = await Todo.findByIdAndUpdate(
      { _id: Data._id },
      { title: title },
      {
        new: true,
      }
    );

    console.log(data, "Data");

    // Return a success response with the updated title
    return NextResponse.json({
      message: "Update successful",
      Data: data,
    });
  } catch (error) {
    console.log(error);

    // Return an error response
    return NextResponse.json(
      {
        message: "An error occurred during the update",
        error: error,
      },
      { status: 500 }
    ); // Set appropriate HTTP status code for internal server error
  }
}
