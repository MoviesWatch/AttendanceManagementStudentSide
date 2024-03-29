import { useState } from "react";
import { Password } from "../components/Password";
import { fetch } from "../helpers/fetch";
import "./../styles/changePassword.scss";
import "react-alert-confirm/lib/style.css";
import AlertConfirm from "react-alert-confirm";
export const ChangePassword = () => {
  const [passwords, setPasswords] = useState({
    password: "",
    passwordReentered: "",
  });
  const [serverError, setServerError] = useState("");
  const changeHandler = async (ev) => {
    ev.preventDefault();
    const confirmance = await AlertConfirm("Are you sure?");
    if (!confirmance[0]) return;
    fetch({
      url: "/changePassword",
      method: "put",
      body: [passwords.password],
      setError: setServerError,
      setResult: AlertConfirm.alert,
    });
  };
  return (
    <>
      <form className="change-password-form">
        <Password
          layoutType="block"
          label="Password"
          value={passwords.password}
          pattern={/^\w{4,}/}
          onChange={(ev) =>
            setPasswords({ ...passwords, password: ev.target.value })
          }
        />
        <Password
          layoutType="block"
          label="Re-enter password"
          value={passwords.passwordReentered}
          pattern={/^\w{4,}/}
          onChange={(ev) =>
            setPasswords({ ...passwords, passwordReentered: ev.target.value })
          }
        />
        <button
          disabled={
            !(
              passwords.password.length >= 4 &&
              passwords.password === passwords.passwordReentered
            )
          }
          onClick={changeHandler}
        >
          Change
        </button>
      </form>
      {serverError && <small className="server-error">{serverError}</small>}
    </>
  );
};
