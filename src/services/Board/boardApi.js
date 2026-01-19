// services/boardApi.js
import axios from "axios";

const apiKey = import.meta.env.VITE_TRELLO_KEY;
const apiToken = import.meta.env.VITE_TRELLO_TOKEN;
const baseURL = import.meta.env.VITE_TRELLO_BASE_URL;

export const addBoard = async (boardName) => {
  const response = await axios.post(`${baseURL}/boards/`, null, {
    params: {
      name: boardName,
      defaultLists: true,
      key: apiKey,
      token: apiToken,
    },
  });
  return response.data;
};

export const getBoards = async () => {
  const response = await axios.get(`${baseURL}/members/me/boards`, {
    params: {
      key: apiKey,
      token: apiToken,
    },
  });
  return response.data;
};
