import axios from "axios";

const wikiSearch = axios.create({
  baseURL:
    "https://en.wikipedia.org/w/api.php?action=query&list=search&format=json&origin=*&srsearch=",
});

export default wikiSearch;
