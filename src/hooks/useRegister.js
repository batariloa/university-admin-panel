import { useState } from "react";
import axiosClient from "../http/axios";
import { url } from "../global/variables";

export const useRegister = () => {
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const register = async (firstName, lastName, email, password, roleId) => {
    setIsLoading(true);
    setError(null);

    await axiosClient
      .post(
        url + "/api/user/register-user",
        {
          firstname: firstName,
          lastName,
          email,
          password,
          roleId,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      )
      .catch((err) => {
        setError("Please fill all of the required fields.");
      });

    setIsLoading(false);
  };

  return { register, error, isLoading };
};
