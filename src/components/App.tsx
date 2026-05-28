import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./Layout.tsx";
import { lazy } from "react";

const HomePage = lazy(() => import("../pages/HomePage/HomePage.tsx"));
const Movies = lazy(() => import("../pages/Movies/Movies.tsx"));
const Details = lazy(() => import("../pages/MovieDetails/MovieDetails.tsx"));
const Cast = lazy(() => import("./Cast/Cast.tsx"));
const Reviews = lazy(() => import("./Reviews/Reviews.tsx"));
const NotFound = lazy(() => import("../pages/NotFound/NotFound.tsx"));

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="movies" element={<Movies />} />
        <Route path="movies/:movieId" element={<Details />}>
          <Route path="cast" element={<Cast />} />
          <Route path="reviews" element={<Reviews />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
