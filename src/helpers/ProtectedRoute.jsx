import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const ProtectedRoute = ({ route, login }) => {
  const navigate = useNavigate();
  const student = sessionStorage.getItem("student");
  useEffect(() => {
    if (!student) navigate("/login", { replace: true });
    if (student && login) navigate("/", { replace: true });
  }, [student]);
  return route;
};
