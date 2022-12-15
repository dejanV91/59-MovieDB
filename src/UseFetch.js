import { useEffect, useState } from "react";
import { useGlobalContext } from "./context";

const UseFetch = (urlParams) => {
  const API_ENDPOINT = `https://www.omdbapi.com/?apikey=${process.env.REACT_APP_MOVIE_API_KEY}`;

  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState({ show: false, msg: "" });
  const [datas, setDatas] = useState([]);
  const { query, setQuery } = useGlobalContext();

  const fetchMovies = async (url) => {
    setIsLoading(true);
    try {
      const response = await fetch(`${url}${urlParams}`);
      const data = await response.json();
      console.log(data);

      if (data.Response === "True") {
        setDatas(data.Search || data);
        setIsError({ show: false, msg: "" });
      } else {
        setIsError({ show: true, msg: data.Error });
      }
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchMovies(`${API_ENDPOINT}${urlParams}`);
  }, [urlParams]);

  return { isLoading, isError, datas, query, setQuery };
};

export default UseFetch;
