// import axios from "axios";

// const apiKey = import.meta.env.VITE_TRELLO_KEY;
// const apiToken = import.meta.env.VITE_TRELLO_TOKEN;
// const baseURL = import.meta.env.VITE_TRELLO_BASE_URL;

// export const getChecklists = async (checklistId) => {
//   try {
//     const response = await axios.get(`${baseURL}/checklists/${checklistId}`, {
//       params: {
//         key: apiKey,
//         token: apiToken,
//       },
//     });

//     return response.data;
//   } catch (error) {
//     console.error(
//       "Error fetching checklist:",
//       error.response?.data || error.message
//     );
//     throw error;
//   }
// };

import axios from "axios";

const apiKey = import.meta.env.VITE_TRELLO_KEY;
const apiToken = import.meta.env.VITE_TRELLO_TOKEN;
const baseURL = import.meta.env.VITE_TRELLO_BASE_URL;

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
      error.response?.data || error.message
    );
    throw error;
  }
};
