import { MovieList } from "@/app/api/movie/types";
import { posterURL } from "./constant";
import { getPlaiceholder } from "plaiceholder";
import fs from "node:fs/promises";

export async function getPlaceholderImage(poster: MovieList[number]["poster"]) {
  try {
    const buffer = await fs.readFile("./public/placeholder.png");
    const { base64 } = await getPlaiceholder(buffer);

    return {
      src: poster.src ? `${posterURL}${poster.src}` : null,
      base64: base64,
    };
  } catch (err) {
    return {
      src: poster.src ? `${posterURL}${poster.src}` : null,
      base64: "/placeholder.png",
    };
  }
}
