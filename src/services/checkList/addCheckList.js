import axios from "axios";

const apiKey = import.meta.env.VITE_TRELLO_KEY;
const apiToken = import.meta.env.VITE_TRELLO_TOKEN;
const baseURL = import.meta.env.VITE_TRELLO_BASE_URL;

export const createChecklist = async (cardId, name) => {
  try {
    const response = await axios.post(`${baseURL}/checklists`, null, {
      params: {
        idCard: cardId,
        name,
        key: apiKey,
        token: apiToken,
      },
    });

    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
