import axios from "axios";

const apiKey = import.meta.env.VITE_TRELLO_KEY;
const apiToken = import.meta.env.VITE_TRELLO_TOKEN;
const baseURL = import.meta.env.VITE_TRELLO_BASE_URL;

export const addCheckItem = async (checklistId, name) => {
  try {
    const response = await axios.post(
      `${baseURL}/checklists/${checklistId}/checkItems`,
      null,
      {
        params: {
          name,
          key: apiKey,
          token: apiToken,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error creating check item:", error);
    throw error;
  }
};
