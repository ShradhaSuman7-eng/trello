import axios from "axios";

const apiKey = import.meta.env.VITE_TRELLO_KEY;
const apiToken = import.meta.env.VITE_TRELLO_TOKEN;
const baseURL = import.meta.env.VITE_TRELLO_BASE_URL;

// CREATE LIST
export async function createList(name, boardId) {
  const response = await axios.post(`${baseURL}/lists`, null, {
    params: {
      name,
      idBoard: boardId,
      key: apiKey,
      token: apiToken,
    },
  });

  return response.data;
}

//DELETE (CLOSE) LIST
export async function deleteList(listId) {
  await axios.put(`${baseURL}/lists/${listId}/closed`, null, {
    params: {
      value: true,
      key: apiKey,
      token: apiToken,
    },
  });

  return listId;
}

// GET LISTS
export async function getLists(boardId) {
  const response = await axios.get(`${baseURL}/boards/${boardId}/lists`, {
    params: {
      key: apiKey,
      token: apiToken,
    },
  });

  return response.data;
}
