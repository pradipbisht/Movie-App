import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { fetchTvShowDetails } from "./query";

const Spinner = () => (
  <div className="flex justify-center items-center mt-12">
    <div className="animate-spin h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full"></div>
  </div>
);

const AccordionItem = ({ season }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-gray-200 rounded-lg mb-4">
      <button
        className="w-full px-4 py-2 text-left bg-gray-100 border-b border-gray-200 focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}>
        <h2 className="text-xl font-semibold">Season {season.season_number}</h2>
      </button>
      {isOpen && (
        <div className="p-4 bg-gray-50">
          <p className="text-sm font-semibold">Air Date: {season.air_date}</p>
          <p className="text-xs text-gray-600">
            {season.episode_count} episodes
          </p>
        </div>
      )}
    </div>
  );
};

function TvShows() {
  const { id } = useParams();

  if (!id) {
    return (
      <div className="text-center text-red-500 mt-12">TV Show not found</div>
    );
  }

  const { data, isLoading, error } = useQuery({
    queryKey: ["tvShows", id],
    queryFn: () => fetchTvShowDetails(id),
  });

  if (isLoading) {
    return <Spinner />;
  }

  if (error) {
    return (
      <div className="text-center text-red-500 mt-20">
        Error: {error.message}
      </div>
    );
  }

  return (
    <div className="mt-12 px-4">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-5">
          <div className="flex items-center justify-center">
            <img
              src={`https://image.tmdb.org/t/p/original/${data.poster_path}`}
              alt={data.name}
              className="w-64 h-auto mb-12"
            />
          </div>
          <div className="text-base">
            <h1 className="text-4xl font-bold uppercase mb-3">{data.name}</h1>
            <ul className="list-disc pl-5">
              <li className="mb-2">
                <strong>Created By:</strong>{" "}
                {data.created_by.map((creator) => creator.name).join(", ")}
              </li>
              <li className="mb-2">
                <strong>Release Date:</strong> {data.first_air_date}
              </li>
              <li className="mb-2">
                <strong>Genres:</strong>{" "}
                {data.genres.map((genre) => genre.name).join(", ")}
              </li>
              <li className="mb-2">
                <strong>Country of Origin:</strong>{" "}
                {data.origin_country.join(", ")}
              </li>
              <li className="mb-2">
                <strong>Production Company:</strong>{" "}
                {data.production_companies
                  .map((company) => company.name)
                  .join(", ")}
              </li>
              <li className="mb-2">
                <strong>Total Seasons:</strong> {data.number_of_seasons}
              </li>
              <li className="mb-2">
                <strong>Overview:</strong> {data.overview}
              </li>
            </ul>
          </div>
        </div>

        {/* Render season panels as dropdowns */}
        <div className="mt-12">
          {data.seasons.map((season) => (
            <AccordionItem key={season.id} season={season} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default TvShows;
