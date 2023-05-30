import "./App.css";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ProtectedRoute } from "./helpers/ProtectedRoute";
import { Attendance } from "./pages/Attendance";
import { Timetable } from "./pages/Timetable";
import { Profile } from "./pages/Profile";
import axios from "axios";
import { ChangePassword } from "./pages/ChangePassword";

function App() {
  axios.defaults.baseURL = "/student/api";
  const router = createBrowserRouter(
    [
      {
        path: "/",
        element: <ProtectedRoute route={<Home />} />,
        children: [
          {
            path: "attendance",
            element: <Attendance />,
          },
          {
            path: "timetable",
            element: <Timetable />,
          },
          {
            path: "profile",
            element: <Profile />,
          },
          {
            path: "changePassword",
            element: <ChangePassword />,
          },
          ,
        ],
      },
      {
        path: "/login",
        element: <ProtectedRoute route={<Login />} login={true} />,
      },
    ],
    {
      basename: "/student",
    }
  );
  return <RouterProvider router={router} />;
}

export default App;
