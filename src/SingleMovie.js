import React from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import useFetch from "./useFetch";
const url =
  "https://upload.wikimedia.org/wikipedia/commons/f/fc/No_picture_available.png";

const SingleMovie = () => {
  const { id } = useParams();
  const { isLoading, isError, datas: movie } = useFetch(`&i=${id}`);

  if (isLoading) {
    return <div className="loading"></div>;
  }
  if (isError.show) {
    return (
      <div className="page-error">
        <h1>{isError.msg}</h1>
        <Link to={"/"} className={"btn"}>
          back to home
        </Link>
      </div>
    );
  }

  const { Poster: poster, Title: title, Plot: info, Year: year } = movie;
  return (
    <section className="single-movie">
      <img src={poster === "N/A" ? url : poster} alt={title} />
      <div className="single-movie-info">
        <h2>{title}</h2>
        <p>{info}</p>
        <h4>{year}</h4>
        <Link to={"/"} className={"btn"}>
          back to movies
        </Link>
      </div>
    </section>
  );
};

export default SingleMovie;
