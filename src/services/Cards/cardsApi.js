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
      error.response?.data || error.message,
    );
    throw error;
  }
}

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
      error.response?.data || error.message,
    );
    throw error;
  }
}

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
