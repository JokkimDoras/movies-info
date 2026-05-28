import React from "react";
import { apiMoviesCast } from "../api.ts";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

import {
  CastText,
  CastMenu,
  CastItems,
  CastImage,
  CastTextWrapper,
  CastChar,
  CastCharAs,
} from "./Cast.styled.js";
import { MovieCast } from "../../types/movie.types.ts";

export default function Cast() {
  const { movieId } = useParams();
  const [cast, setCast] = useState<MovieCast['cast'] | null>(null);

  useEffect(() => {
    async function getMoviesCast() {
      try {
        const movie:MovieCast = await apiMoviesCast(movieId!);
        setCast(movie.cast);
      } catch (error) {
        toast.error("Oops, something went wrong! Reload this page!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          progress: undefined,
          theme: "light",
        });
      }
    }
    getMoviesCast();
  }, [setCast, movieId]);

  return (
    <CastMenu>
      {cast &&
        cast.map(({ cast_id, profile_path, title, name, character }) => (
          <CastItems key={cast_id}>
            <CastImage
              src={
                profile_path
                  ? `
http://image.tmdb.org/t/p/w200${profile_path}`
                  : `${process.env.PUBLIC_URL}/images/noProfile.jpg`
              }
              alt={title}
            />
            <CastTextWrapper>
              <CastText>{name}</CastText>
              <CastChar>
                <CastCharAs>as</CastCharAs> {character}
              </CastChar>
            </CastTextWrapper>
          </CastItems>
        ))}
    </CastMenu>
  );
}
