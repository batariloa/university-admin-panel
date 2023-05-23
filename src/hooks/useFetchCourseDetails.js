import { useEffect, useState } from "react";

export const useFetchCourseDetails = (courseId) => {
  const [course, setCourse] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        // Mock data for demonstration purposes
        const mockCourseData = {
          id: courseId,
          name: "Course Name",
          code: "CSE101",
          description: "This is a sample course.",
          espb: 6,
        };

        // Simulate asynchronous fetching
        setLoading(true);
        await new Promise((resolve) => setTimeout(resolve, 1000));

        setCourse(mockCourseData);
        setLoading(false);
      } catch (error) {
        setError("Failed to fetch course details.");
        setLoading(false);
      }
    };

    fetchCourseDetails();
  }, [courseId]);

  return { course, loading, error };
};
