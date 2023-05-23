import { useState } from "react";
import axios from "axios";

export const useUnsubscribeProfessorFromCourse = () => {
  const [error, setError] = useState(null);

  const unsubscribe = (courseId) => {
    return new Promise((resolve, reject) => {
      axios
        .delete(`/api/courses/${courseId}`)
        .then((response) => {
          // Course deletion successful
          resolve(response.data);
        })
        .catch((error) => {
          // Handle any error that occurred during course deletion
          setError(error);
          reject(error);
        });
    });
  };

  return { unsubscribe, error };
};
