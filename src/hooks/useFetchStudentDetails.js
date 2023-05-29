import { useEffect, useState } from "react";
import axiosClient from "../http/axios";
import { url } from "../global/variables";

export const useFetchStudentDetails = (studentId) => {
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStudentDetails = async () => {
      try {
        const response = await axiosClient.get(
          url + `/api/student/get-student-details/${studentId}`
        );

        const { data } = response.data;

        if (response.data.succeeded) {
          setStudent(data);
        } else {
          setError("Failed to fetch student details. Please try again.");
        }

        setLoading(false);
      } catch (error) {
        console.error("Error fetching student details:", error);
        setError("Failed to fetch student details. Please try again.");
        setLoading(false);
      }
    };

    fetchStudentDetails();
  }, [studentId]);

  return { student, loading, error };
};
