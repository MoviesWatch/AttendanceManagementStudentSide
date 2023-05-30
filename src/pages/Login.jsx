import { Input } from "../components/Input";
import { Brand } from "../components/Brand";
import { Password } from "../components/Password";
import { Select } from "../components/Select";
import "./../styles/login.scss";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { fetch } from "../helpers/fetch";
export const Login = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    regNo: "",
    password: "",
    academicSemester: "",
  });
  const [academicSemesters, setAcademicSemesters] = useState([]);
  const [serverError, setServerError] = useState("");
  useEffect(() => {
    fetch({
      url: "/academicSemester",
      setResult: setAcademicSemesters,
      setError: setServerError,
    });
  }, []);
  const handleSubmit = async (ev) => {
    ev.preventDefault();
    ev.target.classList.add("active");
    if (!credentials.regNo || !credentials.password) return;
    fetch({
      url: "/login",
      method: "post",
      body: credentials,
      setError: setServerError,
      setResult: (result) => {
        sessionStorage.setItem("student", JSON.stringify(result));
        navigate("/");
      },
    });
  };
  return (
    <div className="login-container">
      <form action="" onSubmit={handleSubmit}>
        <Brand />
        <Input
          type="text"
          label="username"
          layoutType="block"
          isField={true}
          onChange={(ev) =>
            setCredentials({
              ...credentials,
              regNo: ev.target.value,
            })
          }
          pattern={/^\d{6,}$/}
          value={credentials.regNo}
        />
        <Password
          layoutType="block"
          isField={true}
          label="Password"
          pattern={/^.{4,}$/}
          value={credentials.password}
          onChange={(ev) =>
            setCredentials({
              ...credentials,
              password: ev.target.value,
            })
          }
        />
        <Select
          options={academicSemesters.map(({ name, databaseName }) => [
            name,
            databaseName,
          ])}
          label="Academic semester"
          layoutType="block"
          pattern={/^.{5,}/}
          isField={true}
          value={credentials.academicSemester}
          onChange={(ev) =>
            setCredentials({
              ...credentials,
              academicSemester: ev.target.value,
            })
          }
        />
        <button>Login</button>
        {serverError && <small className="server-error">{serverError}</small>}
      </form>
    </div>
  );
};
