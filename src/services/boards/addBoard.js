import axios from "axios";
const apiKey = import.meta.env.VITE_TRELLO_KEY;
const apiToken = import.meta.env.VITE_TRELLO_TOKEN;
const baseURL = import.meta.env.VITE_TRELLO_BASE_URL;

export async function addBoards(boardName) {
  try {
    const response = await axios.post(`${baseURL}/boards/`, null, {
      params: {
        name: boardName,
        key: apiKey,
        token: apiToken,
      },
    });

    console.log("Board created:", response.data);
  } catch (error) {
    console.error(
      "Error creating board:",
      error.response?.data || error.message
    );
  }
}
