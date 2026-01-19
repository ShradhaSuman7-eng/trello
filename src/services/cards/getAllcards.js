import axios from "axios";

const apiKey = import.meta.env.VITE_TRELLO_KEY;
const apiToken = import.meta.env.VITE_TRELLO_TOKEN;
const baseURL = import.meta.env.VITE_TRELLO_BASE_URL;

export async function getAllCards(listId) {
  try {
    const response = await axios.get(`${baseURL}/lists/${listId}/cards`, {
      params: {
        key: apiKey,
        token: apiToken,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching cards:", error);
    throw error;
  }
}
