import { useState, useEffect } from "react";
import axios from "axios";

const useFetchStudentDetails = (studentId) => {
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStudent = async () => {
      setLoading(true);

      // Simulate API request delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      try {
        // Simulate successful response with mock data
        const mockResponse = {
          data: {
            id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
            firstName: "John",
            lastName: "Doe",
            idNumber: "123456789",
            email: "john.doe@example.com",
            gender: "Male",
            courses: [
              {
                id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                name: "Mathematics",
                code: "MATH101",
                description: "Introduction to Mathematics",
                espb: 6,
              },
              {
                id: "3fa85f64-5717-4562-b3fc-2c963f66afa7",
                name: "Physics",
                code: "PHY101",
                description: "Introduction to Physics",
                espb: 6,
              },
            ],
          },
        };
        setStudent(mockResponse.data);
      } catch (error) {
        setError("Failed to fetch student data");
      }

      setLoading(false);
    };

    fetchStudent();
  }, []);

  return { professor: student, loading, error };
};

export default useFetchStudentDetails;
