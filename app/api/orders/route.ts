import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { messages } = body;

    const jsonData = JSON.stringify({
      question: messages,
    });

    let response = await fetch(
      "http://localhost:3000/api/v1/prediction/c14b67b4-dc80-4cd9-87fa-718ee70ebf4f",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: jsonData,
      }
    );

    const result = await response.json();

    return NextResponse.json({ role: "admin", content: result.text, result });
  } catch (error) {
    console.log("[Code_Error]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
