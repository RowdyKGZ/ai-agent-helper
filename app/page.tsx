"use client";

import axios from "axios";

export default function Home() {
  const onSend = async () => {
    try {
      console.log("agent think ...");

      const response = await axios.post("/api/orders", {
        messages: "userMessage",
      });

      console.log(response.data.text);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex justify-center">
      <button onClick={onSend}>Click Me</button>
    </div>
  );
}
