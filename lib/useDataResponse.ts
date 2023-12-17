import axios from "axios";

import { priceDay } from "./logicPrice";
import { priceBtc } from "./currencyPrice";

export const dataResponse = async (promt: string) => {
  const period = await axios.post("/api/day", {
    messages: promt,
  });

  let periodText = period.data.text;

  let dayPrice = await priceBtc(periodText).then((res) => {
    return res.data;
  });

  if (periodText[periodText.length - 1] === "d") {
    dayPrice = priceDay(dayPrice.history);
  } else {
    return dayPrice;
  }

  return dayPrice;
};
