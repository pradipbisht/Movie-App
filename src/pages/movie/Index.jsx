import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchMovieDetails } from "./query";
import { ClipLoader } from "react-spinners";
import React from "react";

const Spinner = () => (
  <div className="flex justify-center items-center mt-12">
    <div className="animate-spin h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full"></div>
  </div>
);

const Movie = () => {
  const { id } = useParams();

  if (!id) {
    return <div className="text-center text-red-500 mt-12">Invalid Id</div>;
  }

  const { data, isLoading, error } = useQuery({
    queryKey: ["movie", id],
    queryFn: () => fetchMovieDetails(id),
  });

  React.useEffect(() => {
    if (data) {
      console.log(data); // Log the data for debugging
    }
  }, [data]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center mb-15">
        <ClipLoader color="#3498db" size={50} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500 mt-12">
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
              alt={data.title}
              className="w-64 h-auto mb-12"
            />
          </div>
          <div className="text-base">
            <h1 className="text-4xl font-bold uppercase mb-3">{data.title}</h1>
            <ul>
              <li className="mb-2">
                <strong>Is For Adult:</strong> {data.adult ? "Yes" : "No"}
              </li>
              <li className="mb-2">
                <strong>Language:</strong>{" "}
                <span className="uppercase">{data.original_language}</span>
              </li>
              <li className="mb-2">
                <div className="flex flex-row">
                  <strong>Budget: </strong>
                  <h1 className="font-extrabold"> $ </h1> {data.budget}
                </div>
              </li>
              <li className="mb-2">
                <strong>RunTime:</strong> {data.runtime} minutes
              </li>
              <li className="mb-2">
                <strong>Genres:</strong>{" "}
                {data.genres.map((genre) => (
                  <span key={genre.id} className="block">
                    {genre.name}
                  </span>
                ))}
              </li>
              <li className="mb-2">
                <strong>Release Date:</strong> {data.release_date}
              </li>
              <li className="mb-2">
                <strong>Rating:</strong> {data.vote_average}
              </li>
              <li className="mb-2">
                <strong>Production Company:</strong>{" "}
                {data.production_companies
                  .map((company) => company.name)
                  .join(", ")}
              </li>
              <li className="mb-2">
                <strong>Overview:</strong> {data.overview}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Movie;
