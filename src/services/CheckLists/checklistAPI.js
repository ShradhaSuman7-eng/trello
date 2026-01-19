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

export const getAllCheckLists = async (cardId) => {
  if (!cardId) throw new Error("cardId is required");

  try {
    const response = await axios.get(`${baseURL}/cards/${cardId}/checklists`, {
      params: {
        key: apiKey,
        token: apiToken,
      },
    });

    return response.data;
  } catch (error) {
    console.error(
      "Error fetching checklists:",
      error.response?.data || error.message,
    );
    throw error;
  }
};
