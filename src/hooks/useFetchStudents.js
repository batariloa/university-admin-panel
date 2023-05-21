import { useState, useEffect } from "react";

const useFetchStudents = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        // Simulated response data
        const response = {
          data: [
            {
              id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
              firstName: "John",
              lastName: "Doe",
              idNumber: "123456789",
              email: "john.doe@example.com",
              gender: "Male",
            },
            {
              id: "3fa85f64-5717-4562-b3fc-2c963f66afa7",
              firstName: "Jane",
              lastName: "Smith",
              idNumber: "987654321",
              email: "jane.smith@example.com",
              gender: "Female",
            },
          ],
          succeeded: true,
          statusCode: 100,
          messageKey: "string",
        };

        setStudents(response.data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  return { students, loading, error };
};

export default useFetchStudents;
