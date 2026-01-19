import axios from "axios";

const apiKey = import.meta.env.VITE_TRELLO_KEY;
const apiToken = import.meta.env.VITE_TRELLO_TOKEN;
const baseURL = import.meta.env.VITE_TRELLO_BASE_URL;

export async function deleteCard(cardId) {
  try {
    const response = await axios.delete(`${baseURL}/cards/${cardId}`, {
      params: {
        key: apiKey,
        token: apiToken,
      },
      headers: {
        Accept: "application/json",
      },
    });

    return response.data; // Trello returns {}
  } catch (error) {
    console.error(
      "Error deleting card:",
      error.response?.data || error.message
    );
    throw error;
  }
}
