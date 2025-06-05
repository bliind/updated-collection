import callApi from "./callApi";

export const getCollection = async () => {
  try {
    const balance = await callApi('GET', 'https://snaptracker.me/collection/api/getAll', {v: Date.now()});
    return balance;
  } catch (error) {
    console.error("Error getting balance:", error);
    throw error;
  }
};
