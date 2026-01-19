import axios from "axios";
import React from "react";

const apiKey = import.meta.env.VITE_TRELLO_KEY;
const apiToken = import.meta.env.VITE_TRELLO_TOKEN;
const baseURL = import.meta.env.VITE_TRELLO_BASE_URL;

export async function getAllBoards() {
  try {
    const { data } = await axios.get(`${baseURL}/members/me/boards`, {
      params: {
        key: apiKey,
        token: apiToken,
      },
    });
    return data;
  } catch (error) {
    console.error(
      "Error fetching boards:",
      error.response?.data || error.message
    );
    return [];
  }
}
