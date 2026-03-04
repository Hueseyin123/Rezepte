// Verwaltet das Login-Token: holt es aus dem localStorage,
// speichert es dort nach dem Login und entfernt es beim Logout.
import { AUTH_TOKEN } from "./constant";

export const getToken = () => localStorage.getItem(AUTH_TOKEN);

export const setToken = (token) => {
  if (token) {
    localStorage.setItem(AUTH_TOKEN, token);
  }
};

export const removeToken = () => {
  localStorage.removeItem(AUTH_TOKEN);
};
