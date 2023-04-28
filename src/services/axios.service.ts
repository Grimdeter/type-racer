import Axios from "axios";

const BASE_URI = "https://api.dictionaryapi.dev/api/v2/entries/en/";

const dictionaryAxios = Axios.create({
  baseURL: BASE_URI,
});

dictionaryAxios.interceptors.response.use(onFulfilled => onFulfilled.data[0].meanings[0].definitions[0].definition);

export { dictionaryAxios };