import { Form, Link } from "react-router-dom";

const DisplayType = {
  Movies: "movies",
  TvShows: "tvshows",
};

export const ColumnDisplay = ({ data, displayType }) => {
  const title =
    displayType === DisplayType.Movies ? data[0].title : data[0].name;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {data.map((displayData) => (
        <div
          key={displayData.id}
          className="bg-white p-4 rounded-lg shadow-md transition-transform transform hover:scale-105">
          <Link
            to={`/${displayType === DisplayType.Movies ? "movie" : "tvshows"}/${
              displayData.id
            }`}
            className="block">
            <div className="relative">
              <img
                src={`https://image.tmdb.org/t/p/original/${displayData.poster_path}`}
                alt={displayData.title || displayData.name}
                className="w-full h-full object-cover rounded-md mb-4"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-30 rounded-md"></div>
            </div>
            <h3 className="text-lg font-semibold mb-2 truncate">
              {displayType === DisplayType.Movies
                ? displayData.title
                : displayData.name}
            </h3>
            <p className="text-gray-600 mb-2">
              Release Date: {displayData.release_date} | Rating:{" "}
              {displayData.vote_average}
            </p>
            <p className="text-gray-800 truncate">
              {displayData.overview.slice(0, 300)}...
            </p>
          </Link>
        </div>
      ))}
    </div>
  );
};
