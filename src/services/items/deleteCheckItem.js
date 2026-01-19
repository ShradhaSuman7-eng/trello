import axios from "axios";

const apiKey = import.meta.env.VITE_TRELLO_KEY;
const apiToken = import.meta.env.VITE_TRELLO_TOKEN;
const baseURL = import.meta.env.VITE_TRELLO_BASE_URL;

export const deleteCheckItem = async (checklistId, checkItemId) => {
  const response = await axios.delete(
    `${baseURL}/checklists/${checklistId}/checkItems/${checkItemId}`,
    {
      params: {
        key: apiKey,
        token: apiToken,
      },
    }
  );

  return response.data;
};
