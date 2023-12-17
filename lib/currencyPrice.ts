import axios from "axios";

export const priceBtc = async (period: string) => {
  const options = {
    method: "GET",
    url: "https://coinranking1.p.rapidapi.com/coin/Qwsogvtv82FCd/history",
    params: { timePeriod: period },
    headers: {
      "X-RapidAPI-Key": "4de5cb1fddmshaed70ccf59f85ebp1cb8b8jsn6e65125cc847",
      "X-RapidAPI-Host": "coinranking1.p.rapidapi.com",
    },
  };

  try {
    const response = await axios.request(options);

    return response.data;
  } catch (error) {
    console.error(error);
  }
};
