import { useEffect, useState } from "react";

const useFetchCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Simulated response data
    const response = {
      data: [
        {
          id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
          name: "Course 1",
          code: "C001",
          description: "This is course 1",
          espb: 5,
        },
        {
          id: "3fa85f64-5717-4562-b3fc-2c963f66afa7",
          name: "Course 2",
          code: "C002",
          description: "This is course 2",
          espb: 3,
        },
      ],
      succeeded: true,
      statusCode: 100,
      messageKey: "string",
    };

    // Simulate an asynchronous API call
    const fetchCourses = async () => {
      try {
        // Simulate loading state
        setLoading(true);

        // Simulate delay
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Set the fetched courses to the state
        setCourses(response.data);

        // Simulate success state
        setLoading(false);
      } catch (error) {
        // Set the error state
        setError(error.message);
        setLoading(false);
      }
    };

    // Fetch courses
    fetchCourses();
  }, []);

  return { courses, loading, error };
};

export default useFetchCourses;
