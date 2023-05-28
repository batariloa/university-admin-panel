import { useState, useEffect, useRef } from "react";
import axiosClient from "../http/axios";
import { url } from "../global/variables";

export const useLogin = (dispatch) => {
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const abortController = useRef(new AbortController());

  const login = async (email, password) => {
    setIsLoading(true);
    setError(null);

    try {
      const res = await axiosClient.post(
        url + "/api/user/login",
        {
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );
      dispatch({ type: "LOGIN", payload: res.data });
      localStorage.setItem("user", JSON.stringify(res.data));
    } catch (err) {
      console.log("some other error", err);
      setError("Incorrect credentials.");
    } finally {
      setIsLoading(false);
    }
  };

  return { login, error, isLoading };
};
