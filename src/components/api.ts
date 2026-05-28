import axios from "axios";
import type { MovieCast, MovieDetails, MovieResponse } from "../types/movie.types";



const URL = "https://api.themoviedb.org/3";
const KEY = "96525b58fad95f33b6786cec803d2857";



export default async function getApi() {
  const data = await axios.get<MovieResponse>(`${URL}/trending/movie/day?api_key=${KEY}`);
  return data.data
}

export async function apiSearchMovies(query:string, page:number) {
  const data = await axios.get<MovieResponse>(
    `${URL}/search/movie?api_key=${KEY}&query=${query}&page=${page}`
  );

  return data.data;
}

export async function apiMoviesById(id:string) {
  const data = await axios.get<MovieDetails>(`${URL}/movie/${id}?api_key=${KEY}`);

  return data.data;
}

export async function apiMoviesCast(id:string) {
  const data = await axios.get<MovieCast>(`${URL}/movie/${id}/credits?api_key=${KEY}`)
  return data.data
}
export async function apiMoviesReviews(id:string) {
  const data = await axios.get<MovieResponse>(`${URL}/movie/${id}/reviews?api_key=${KEY}`);

  return data.data;
}
