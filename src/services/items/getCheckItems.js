import axios from "axios";

const apiKey = import.meta.env.VITE_TRELLO_KEY;
const apiToken = import.meta.env.VITE_TRELLO_TOKEN;
const baseURL = import.meta.env.VITE_TRELLO_BASE_URL;

export const getChecklistCheckItem = async (checklistId, checkItemId) => {
  try {
    const response = await axios.get(
      `${baseURL}/checklists/${checklistId}/checkItems/${checkItemId}`,
      {
        params: {
          key: apiKey,
          token: apiToken,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error fetching checklist checkItem:", error);
    throw error;
  }
};
