import axios from "axios";
import { useEffect, useState } from "react";
import { Input } from "../components/Input";
import "./../styles/profile-page.scss";
export const Profile = () => {
  const [profile, setProfile] = useState({});
  const [values, setValues] = useState({});
  const [errorFromServer, setErrorFromServer] = useState("");
  const [resultFromServer, setResultFromServer] = useState("");
  const [needToUpdate, setNeedToUpdate] = useState(false);
  const canUpdateList = ["mobile", "email", "parentMobile"];
  let update;
  const propsLabelsAndRegEx = {
    regNo: ["Reg No"],
    name: ["Name"],
    departmentCode: ["Department"],
    semester: ["Semester"],
    dateOfBirth: ["Date of birth"],
    dateJoined: ["Joined date"],
    gender: ["Gender"],
    mobile: ["Mobile", /^\d{10}$/],
    email: [
      "Email",
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    ],
    parentName: ["Parent name"],
    parentMobile: ["Parent mobile", /^\d{10}$/],
  };

  useEffect(() => {
    (async () => {
      try {
        const { data: profile } = await axios.get("/profile");
        setProfile(profile);
        setValues({
          mobile: profile.mobile,
          parentMobile: profile.parentMobile,
          email: profile.email,
        });
      } catch (error) {
        setErrorFromServer(error.response.data.msg);
      }
    })();
  }, []);

  useEffect(() => {
    update = null;
    setNeedToUpdate(
      canUpdateList.reduce((res, prop) => {
        const isDiff = profile[prop] !== values[prop];
        if (isDiff) {
          update = { ...update, [prop]: values[prop] };
        }
        return res || isDiff;
      }, false)
    );
  }, [{ ...values }]);

  const updateHandler = async (ev) => {
    ev.preventDefault();
    try {
      if (
        Object.keys(update).length == 0 ||
        document.querySelector(".error")?.length > 0
      )
        return;
      const { data: result } = await axios.put("/profile", update);
      setResultFromServer(result && "Updated successfully");
    } catch (error) {
      setErrorFromServer(error.response.data.msg);
    }
  };

  return (
    <div className="profile-container">
      <form>
        {Object.entries(propsLabelsAndRegEx).map(
          ([prop, [label, regEx = ""]]) => (
            <Input
              label={label}
              layoutType="inline"
              pattern={regEx}
              isField={true}
              readOnly={!canUpdateList.includes(prop)}
              value={values[prop] ?? profile[prop]}
              onChange={(ev) =>
                setValues({ ...values, [prop]: ev.target.value })
              }
            />
          )
        )}
        <button disabled={!needToUpdate} onClick={updateHandler}>
          Update
        </button>
      </form>
      {errorFromServer && (
        <small className="server-error">{errorFromServer}</small>
      )}
      {resultFromServer && (
        <small className="server-result">{resultFromServer}</small>
      )}
    </div>
  );
};
