import axios from "axios";

const apiKey = import.meta.env.VITE_TRELLO_KEY;
const apiToken = import.meta.env.VITE_TRELLO_TOKEN;
const baseURL = import.meta.env.VITE_TRELLO_BASE_URL;

export const getLists = async (boardId) => {
  const res = await axios.get(`${baseURL}/boards/${boardId}/lists`, {
    params: {
      key: apiKey,
      token: apiToken,
    },
  });
  return res.data;
};
