import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { messages } = body;

    const response = await fetch(
      "http://localhost:3000/api/v1/prediction/89754816-a965-493b-9aa2-dc11b5c4451d",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ question: messages }),
      }
    );

    const result = await response.json().then((res) => res);

    return NextResponse.json(result);
  } catch (error) {
    console.log("[Code_Error]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
