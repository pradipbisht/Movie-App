import React from "react";
import { useMutation } from "@tanstack/react-query";
import { mutationLogin } from "./Mutation";
import { useNavigate } from "react-router-dom";

function Auth() {
  const navigate = useNavigate();

  const { data, mutate } = useMutation({
    mutationKey: ["login"],
    mutationFn: mutationLogin,
    onSuccess: (data) => {
      localStorage.setItem("guest_session_id", data.guest_session_id);
      navigate("/");
    },
    onError: (err) => {
      console.log("Login failed:", err);
    },
  });

  const handleLogin = async () => {
    try {
      mutate();
    } catch (err) {}
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-red-600 text-center mb-6">
          Welcome : Please Register
        </h2>
        <form className="space-y-4">
          <button
            type="button"
            onClick={handleLogin}
            className="w-full py-3 px-6 bg-blue-500 text-white text-lg font-semibold rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Auth;
