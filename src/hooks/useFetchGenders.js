import { useState, useEffect } from "react";
import axios from "axios";

export const useFetchGenders = () => {
  const [genders, setGenders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGenders = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await axios.get(
          "https://pavlevlajic.com/api/gender/get-all-genders"
        );
        setGenders(response.data.data);
        setLoading(false);
      } catch (error) {
        setError("Failed to fetch genders.");
        setLoading(false);
      }
    };

    fetchGenders();
  }, []);

  return { genders, loading, error };
};
