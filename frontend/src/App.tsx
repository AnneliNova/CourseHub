import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import Header from './components/Header/Header';
import Login from './components/Login/Login';
import Registration from './components/Registration/Registration';
import Courses from './components/Courses/Courses';
import CreateCourse from './components/CreateCourse/CreateCourse';
import CourseInfo from './components/CourseInfo/CourseInfo';
import PrivateRoute from './routing/PrivateRoute';

export default function App() {
  const token = localStorage.getItem('token');

  return (
    <BrowserRouter>
      <Header />

      <Routes>
        <Route path="/" element={token ? <Navigate to="/courses" /> : <Navigate to="/login" />} />

        <Route path="/login" element={<Login />} />
        <Route path="/registration" element={<Registration />} />

        <Route
          path="/courses"
          element={
            <PrivateRoute>
              <Courses />
            </PrivateRoute>
          }
        />

        <Route
          path="/courses/add"
          element={
            <PrivateRoute>
              <CreateCourse />
            </PrivateRoute>
          }
        />

        <Route
          path="/courses/:courseId"
          element={
            <PrivateRoute>
              <CourseInfo />
            </PrivateRoute>
          }
        />

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}
