import { useEffect, useState } from "react";

export const useFetchProfessors = () => {
  const [professors, setProfessors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Simulating an asynchronous API call to fetch professors
    const fetchProfessors = async () => {
      try {
        // Simulated delay of 1 second
        await new Promise((resolve) => setTimeout(resolve, 1000));
        // Mock data
        const mockProfessors = [
          {
            id: 1,
            firstName: "John",
            lastName: "Doe",
            email: "johndoe@example.com",
            gender: "Male",
          },
          {
            id: 2,
            firstName: "Jane",
            lastName: "Smith",
            email: "janesmith@example.com",
            gender: "Female",
          },
          {
            id: 3,
            firstName: "Michael",
            lastName: "Johnson",
            email: "michaeljohnson@example.com",
            gender: "Male",
          },
          // Add more mock professors as needed
        ];
        setProfessors(mockProfessors);
        setLoading(false);
      } catch (error) {
        setError("Failed to fetch professors. Please try again.");
        setLoading(false);
      }
    };

    fetchProfessors();
  }, []);

  return { professors, loading, error };
};
