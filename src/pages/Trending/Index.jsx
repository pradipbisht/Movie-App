import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchRatedMovies } from "./query";

const TrendingMovies = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRatedMoviesData = async () => {
      try {
        const data = await fetchRatedMovies();
        console.log(data); // Log the data to ensure it's correct
        setMovies(data.results); // Ensure 'results' matches the API response structure
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRatedMoviesData(); // Correct function call here
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full"></div>
      </div>
    );
  }

  if (error) {
    return <div className="text-center text-red-500 mt-12">Error: {error}</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-6">Trending Movies</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {movies.map((movie) => (
          <Link
            key={movie.id}
            to={`/movie/${movie.id}`} // Link to the movie detail page
            className="bg-white p-4 rounded-lg shadow-md transition-transform transform hover:scale-105">
            <img
              src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
              alt={movie.title}
              className="w-full h-auto mb-4 rounded-lg"
            />
            <h2 className="text-xl font-semibold mb-2">{movie.title}</h2>
            <p className="text-gray-600">{movie.release_date}</p>
            <p className="text-gray-800 truncate">{movie.overview}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default TrendingMovies;
