import axios from "axios";

export const EnWikiSearch = axios.create({
  baseURL:
    "https://en.wikipedia.org/w/api.php?action=query&list=search&format=json&origin=*&srsearch=",
});
export const HeWikiSearch = axios.create({
  baseURL:
    "https://he.wikipedia.org/w/api.php?action=query&list=search&format=json&origin=*&srsearch=",
});
