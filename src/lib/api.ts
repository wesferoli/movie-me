import { movieDBToken } from "@/utils/constant";
import axios from "axios";

export const movieDBApi = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  headers: { Authorization: `Bearer ${movieDBToken}` },
});
