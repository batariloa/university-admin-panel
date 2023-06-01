import logo from "./logo.svg";
import "./App.css";
import { useAuthContext } from "./hooks/useAuthContext";
import { LoginPage } from "./components/auth/Login";
import { RegisterPage } from "./components/auth/Register";
import { Navbar } from "./components/navbar/Navbar";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import CourseForm from "./components/courses/CourseForm";
import StudentsPage from "./components/students/StudentPage";
import CoursesPage from "./components/courses/CoursesPage";
import EditStudentPage from "./components/students/EditStudentPage";
import EditCoursePage from "./components/courses/EditCoursePage";
import ProfessorsPage from "./components/professors/ProfessorsPage";
import EditProfessorPage from "./components/professors/EditProfessorPage";
import { AddProfessorPage } from "./components/professors/AddProfessorPage";
import { setupInterceptors } from "./http/axios";
import Footer from "./components/footer/Footer";
import PrivacyPolicyPage from "./components/extras/PrivacyPolicyPage";
import { userIsAdmin } from "./util/isAdmin";
import AddCoursePage from "./components/courses/AddCoursePage";
import AddStudentPage from "./components/students/AddStudentPage";

function App() {
  const { user, dispatch } = useAuthContext();
  setupInterceptors(dispatch);

  const isAdmin = userIsAdmin(user);

  return (
    <BrowserRouter>
      <Navbar></Navbar>
      <Routes>
        <Route path="/" element={user ? <CoursesPage /> : <LoginPage />} />
        <Route
          path="/addCourse"
          element={user ? <AddCoursePage /> : <AddCoursePage />}
        />
        <Route
          path="/addProfessor"
          element={user ? <AddProfessorPage /> : <LoginPage />}
        />
        <Route
          path="/addStudent"
          element={user ? <AddStudentPage /> : <LoginPage />}
        />
        <Route
          path="/students"
          element={user ? <StudentsPage /> : <LoginPage />}
        />
        <Route
          path="/courses"
          element={user ? <CoursesPage /> : <LoginPage />}
        />
        <Route
          path="/professors"
          element={user ? <ProfessorsPage /> : <LoginPage />}
        />

        <Route
          path="/editStudent/:studentId"
          element={user ? <EditStudentPage /> : <LoginPage />}
        />
        <Route
          path="/editCourse/:courseId"
          element={user ? <EditCoursePage /> : <LoginPage></LoginPage>}
        />
        <Route
          path="/editProfessor/:professorId"
          element={user ? <EditProfessorPage /> : <LoginPage />}
        />
        <Route
          path="/register"
          element={isAdmin ? <RegisterPage /> : <LoginPage />}
        />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
      </Routes>
      <Footer></Footer>
    </BrowserRouter>
  );
}

export default App;
