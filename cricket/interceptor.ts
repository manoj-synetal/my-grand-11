import axios from "axios";

export const API_KEY = process.env.CRICKET_API_KEY;
export const CRICKET_API_BASEURL = `https://api.cricapi.com/v1/`;

export const CRICKET_API = axios.create({
  baseURL: CRICKET_API_BASEURL,
  params: { apikey: API_KEY },
});
