import axios from "axios";
const apiKey = import.meta.env.VITE_TRELLO_KEY;
const apiToken = import.meta.env.VITE_TRELLO_TOKEN;
const baseURL = import.meta.env.VITE_TRELLO_BASE_URL;

export async function createList(name, boardId) {
  try {
    const response = await axios.post(`${baseURL}/lists`, null, {
      params: {
        name: name,
        idBoard: boardId,
        key: apiKey,
        token: apiToken,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error creating list:", error);
    throw error;
  }
}
