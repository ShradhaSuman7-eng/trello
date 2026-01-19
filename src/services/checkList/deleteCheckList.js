import axios from "axios";

const apiKey = import.meta.env.VITE_TRELLO_KEY;
const apiToken = import.meta.env.VITE_TRELLO_TOKEN;
const baseURL = import.meta.env.VITE_TRELLO_BASE_URL;

export const deleteChecklist = async (checklistId) => {
  try {
    const res = await axios.delete(`${baseURL}/checklists/${checklistId}`, {
      params: {
        key: apiKey,
        token: apiToken,
      },
    });

    return res.data;
  } catch (error) {
    console.error("Error deleting checklist:", error);
    throw error;
  }
};
