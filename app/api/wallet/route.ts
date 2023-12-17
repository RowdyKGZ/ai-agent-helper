import { NextResponse } from "next/server";

const dataWallet = {
  coins: [
    {
      id: 1,
      currency: "Bitcoin",
      target: "Buy",
      buy_price: 40000,
      sell_price: 40100,
      profit: 100,
    },
    {
      id: 2,
      currency: "Bitcoin",
      target: "Sell",
      buy_price: 35000,
      sell_price: 36000,
      profit: -1000,
    },
    {
      id: 3,
      currency: "Etherium",
      target: "Sell",
      buy_price: 5000,
      sell_price: 4900,
      profit: 100,
    },
    {
      id: 4,
      currency: "Etherium",
      target: "Sell",
      buy_price: 4900,
      sell_price: 4700,
      profit: 200,
    },
    {
      id: 5,
      currency: "EURUSD",
      target: "BUY",
      buy_price: 100.1,
      sell_price: 100.3,
      profit: 0.2,
    },
    {
      id: 6,
      currency: "EURUSD",
      target: "Buy",
      buy_price: 100.3,
      sell_price: 100.5,
      profit: 0.2,
    },
    {
      id: 7,
      currency: "EURUSD",
      target: "Sell",
      buy_price: 100.5,
      sell_price: 100,
      profit: 0.5,
    },
    {
      id: 8,
      currency: "Litecoin",
      target: "Buy",
      buy_price: 150,
      sell_price: 155,
      profit: 5,
    },
    {
      id: 9,
      currency: "Litecoin",
      target: "Sell",
      buy_price: 160,
      sell_price: 150,
      profit: -10,
    },
    {
      id: 10,
      currency: "Ripple",
      target: "Buy",
      buy_price: 1.5,
      sell_price: 1.8,
      profit: 0.3,
    },
    {
      id: 11,
      currency: "Ripple",
      target: "Sell",
      buy_price: 1.8,
      sell_price: 1.6,
      profit: -0.2,
    },
    {
      id: 12,
      currency: "Cardano",
      target: "Buy",
      buy_price: 2,
      sell_price: 2.5,
      profit: 0.5,
    },
    {
      id: 13,
      currency: "Cardano",
      target: "Sell",
      buy_price: 2.5,
      sell_price: 2.2,
      profit: -0.3,
    },
    {
      id: 14,
      currency: "Polkadot",
      target: "Buy",
      buy_price: 30,
      sell_price: 32,
      profit: 2,
    },
    {
      id: 15,
      currency: "Polkadot",
      target: "Sell",
      buy_price: 32,
      sell_price: 28,
      profit: -4,
    },
    {
      id: 16,
      currency: "Chainlink",
      target: "Buy",
      buy_price: 25,
      sell_price: 28,
      profit: 3,
    },
    {
      id: 17,
      currency: "Chainlink",
      target: "Sell",
      buy_price: 28,
      sell_price: 26,
      profit: -2,
    },
    {
      id: 18,
      currency: "Stellar",
      target: "Buy",
      buy_price: 0.8,
      sell_price: 0.9,
      profit: 0.1,
    },
    {
      id: 19,
      currency: "Stellar",
      target: "Sell",
      buy_price: 0.9,
      sell_price: 0.7,
      profit: -0.2,
    },
    {
      id: 20,
      currency: "Dogecoin",
      target: "Buy",
      buy_price: 0.3,
      sell_price: 0.35,
      profit: 0.05,
    },
    {
      id: 21,
      currency: "Dogecoin",
      target: "Sell",
      buy_price: 0.35,
      sell_price: 0.32,
      profit: -0.03,
    },
  ],
};

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { messages } = body;

    const jsonData = JSON.stringify({
      question: `${messages} here's the date from the database ${JSON.stringify(
        dataWallet
      )}`,
    });

    let response = await fetch(
      "http://localhost:3000/api/v1/prediction/98127b24-cd04-4b9b-8a6d-22d13dd4a111",
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
