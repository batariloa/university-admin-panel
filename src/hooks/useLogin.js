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

    //update abort controller refference
    abortController.current = new AbortController();

    //used to test login cancelation
    await new Promise((resolve) => setTimeout(resolve, 1000));
    try {
      const res = await axiosClient.post(
        url + "/auth/login",
        {
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          withCredentials: true,
          signal: abortController.current.signal,
        }
      );
      dispatch({ type: "LOGIN", payload: res.data });
      localStorage.setItem("user", JSON.stringify(res.data));
    } catch (err) {
      if (err.name === "CanceledError") {
        console.log("Canceled login.");
      } else {
        console.log("some other error", err);
        setError("Incorrect credentials.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  //Cancel login on unmount
  useEffect(() => {
    return () => {
      abortController.current.abort();
    };
  }, []);

  return { login, error, isLoading };
};
