export const fetchMovieDetails = async (movieId) => {
  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}?language=en-US&page=1`,
      {
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4ZTFiM2FkOTk1NmU3MGI1MDljZmZjODFlY2NkMTY3YyIsIm5iZiI6MTcyMjg2OTI1Ni44NDI4MTksInN1YiI6IjY1MWE2MjdiMjIzYThiMDEwMzI5OTM1NiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.RVDKOS8UybcX9l73xOzIX-19ySpv5_U7RoIxc-TR01k",
        },
      }
    );
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching movie details:", error);
    throw error; // Rethrow the error to be handled elsewhere
  }
};
