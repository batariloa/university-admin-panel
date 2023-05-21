import logo from "./logo.svg";
import "./App.css";
import { useAuthContext } from "./hooks/useAuthContext";
import { Login } from "./components/auth/Login";
import { Register } from "./components/auth/Register";
import { Navbar } from "./components/navbar/Navbar";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import CourseForm from "./components/courses/CourseForm";
import StudentsPage from "./components/students/StudentPage";
import CoursesPage from "./components/courses/CoursesPage";
import EditStudentPage from "./components/students/EditStudentPage";

function App() {
  const { user, dispatch } = useAuthContext();

  return (
    <BrowserRouter>
      <Navbar></Navbar>
      <Routes>
        <Route path="/" element={<CoursesPage />} />
        <Route path="/addCourse" element={<CourseForm />} />
        <Route path="/students" element={<StudentsPage />} />
        <Route path="/courses" element={<CoursesPage />} />
        <Route
          path="/editStudent/:studentId"
          element={<EditStudentPage></EditStudentPage>}
        />
        <Route path="/register" element={<Register />} />

        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
