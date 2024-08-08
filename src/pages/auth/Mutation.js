export const mutationLogin = async () => {
  const res = await fetch(
    "https://api.themoviedb.org/3/authentication/guest_session/new",
    {
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4ZTFiM2FkOTk1NmU3MGI1MDljZmZjODFlY2NkMTY3YyIsIm5iZiI6MTcyMjg2OTI1Ni44NDI4MTksInN1YiI6IjY1MWE2MjdiMjIzYThiMDEwMzI5OTM1NiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.RVDKOS8UybcX9l73xOzIX-19ySpv5_U7RoIxc-TR01k",
      },
    }
  );

  if (!res.ok) {
    throw new Error("Network response was not ok");
  }

  const data = await res.json();

  return data;
};