import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchMovies, fetchTvShows } from "./Query";
import { ColumnDisplay } from "./ColumnDisplay";

const DisplayType = {
  Movies: "movies",
  TvShows: "tvshows",
};

const Home = () => {
  const [displayType, setDisplayType] = useState(DisplayType.Movies);

  const { data: movieData, isLoading: isLoadingMovies } = useQuery({
    queryKey: ["movies"],
    queryFn: fetchMovies,
  });

  const { data: tvShowData, isLoading: isLoadingTvShows } = useQuery({
    queryKey: ["tvshows"],
    queryFn: fetchTvShows,
  });

  return (
    <div className="mt-20 h-auto">
      <div className="flex mt-10 space-x-2 align-middle justify-center">
        <button
          onClick={() => setDisplayType(DisplayType.Movies)}
          className={`py-2 px-4 rounded-lg font-semibold text-white ${
            displayType === DisplayType.Movies
              ? "bg-red-500"
              : "bg-gray-400 text-gray-800"
          }`}>
          Movies
        </button>
        <button
          onClick={() => setDisplayType(DisplayType.TvShows)}
          className={`py-2 px-4 rounded-lg font-semibold text-white ${
            displayType === DisplayType.TvShows
              ? "bg-green-500"
              : "bg-gray-400 text-gray-800"
          }`}>
          TvShows
        </button>
      </div>
      {isLoadingMovies || isLoadingTvShows ? (
        <div className="mt-4 text-center">Loading...</div>
      ) : (
        <div className="mt-5">
          {displayType === DisplayType.Movies ? (
            <ColumnDisplay
              data={movieData.results}
              displayType={DisplayType.Movies}
            />
          ) : (
            <ColumnDisplay
              data={tvShowData.results}
              displayType={DisplayType.TvShows}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default Home;
