import { prices } from "@/constants";

type Foo = { price: string; timestamp: number };

export const priceDay = (prices: Foo[]) => {
  let days: Foo[] = [];

  let cursor = 24;
  let cursorDay = 1;

  prices.map(({ price, timestamp }) => {
    if (cursor === 24) {
      days.push({ price, timestamp });
      cursor = 1;
      cursorDay++;
    }
    cursor++;
  });

  return days;
};
