import axios from "axios";

const apiKey = import.meta.env.VITE_TRELLO_KEY;
const apiToken = import.meta.env.VITE_TRELLO_TOKEN;
const baseURL = import.meta.env.VITE_TRELLO_BASE_URL;

export const getCard = async (cardId) => {
  try {
    const response = await axios.get(`${baseURL}/cards/${cardId}`, {
      params: {
        key: apiKey,
        token: apiToken,
      },
      headers: {
        Accept: "application/json",
      },
    });

    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching Trello card:", error);
    throw error;
  }
};
