import axios from "axios";

const apiKey = import.meta.env.VITE_TRELLO_KEY;
const apiToken = import.meta.env.VITE_TRELLO_TOKEN;
const baseURL = import.meta.env.VITE_TRELLO_BASE_URL;

export async function deleteList(listId) {
  try {
    const response = await axios.put(
      `${baseURL}/lists/${listId}/closed`,
      null,
      {
        params: {
          value: true, // close = delete
          key: apiKey,
          token: apiToken,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error deleting list:", error);
    throw error;
  }
}
