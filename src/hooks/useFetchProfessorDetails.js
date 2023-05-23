import { useEffect, useState } from "react";

export const useFetchProfessorDetails = (professorId) => {
  const [professor, setProfessor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Simulating an asynchronous API call to fetch professor details
    const fetchProfessorDetails = async () => {
      try {
        // Simulated delay of 1 second
        await new Promise((resolve) => setTimeout(resolve, 1000));
        // Mock data for professor details
        const mockProfessor = {
          id: professorId,
          firstName: "John",
          lastName: "Doe",
          email: "johndoe@example.com",
          gender: "Male",
        };
        setProfessor(mockProfessor);
        setLoading(false);
      } catch (error) {
        setError("Failed to fetch professor details. Please try again.");
        setLoading(false);
      }
    };

    fetchProfessorDetails();
  }, [professorId]);

  return { professor, loading, error };
};
