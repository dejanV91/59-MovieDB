import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API_ENDPOINT } from "./context";
import { Link } from "react-router-dom";
const url =
  "https://upload.wikimedia.org/wikipedia/commons/f/fc/No_picture_available.png";

const SingleMovie = () => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState({ show: false, msg: "" });
  const [movie, setMovie] = useState({});

  const fetchMovie = async (url) => {
    setIsLoading(true);
    try {
      const response = await fetch(url);
      const data = await response.json();
      if (data.Response === "True") {
        setMovie(data);
        setIsLoading(false);
      } else {
        setIsLoading(false);
        setIsError({ show: true, msg: data.Error });
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchMovie(`${API_ENDPOINT}&i=${id}`);
  }, [id]);

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
