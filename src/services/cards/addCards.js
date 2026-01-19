import axios from "axios";

const apiKey = import.meta.env.VITE_TRELLO_KEY;
const apiToken = import.meta.env.VITE_TRELLO_TOKEN;
const baseURL = import.meta.env.VITE_TRELLO_BASE_URL;

export async function createCard(listId, cardName) {
  try {
    const response = await axios.post(`${baseURL}/cards`, null, {
      params: {
        idList: listId,
        name: cardName,
        key: apiKey,
        token: apiToken,
      },
      headers: {
        Accept: "application/json",
      },
    });

    return response.data;
  } catch (error) {
    console.error(
      "Error creating card:",
      error.response?.data || error.message
    );
    throw error;
  }
}
