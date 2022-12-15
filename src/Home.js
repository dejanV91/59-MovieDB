import React from "react";
import Movie from "./Movie";
import SearchForm from "./SearchForm";

const Home = () => {
  return (
    <main>
      <SearchForm />
      <Movie />
    </main>
  );
};

export default Home;
