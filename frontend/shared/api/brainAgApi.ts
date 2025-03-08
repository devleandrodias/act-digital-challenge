import Axios from "axios";

export const brainAgApi = Axios.create({
  baseURL: "http://localhost:3000",
});
