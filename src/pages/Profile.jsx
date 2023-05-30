import axios from "axios";
import { useEffect, useState } from "react";
import { Input } from "../components/Input";
import { dateFormatter } from "../helpers/Date";
import { fetch } from "../helpers/fetch";
import "./../styles/profile-page.scss";
export const Profile = () => {
  const [profile, setProfile] = useState([]);
  const [serverError, setServerError] = useState("");
  const labelsAndProps = {
    "Reg No": "regNo",
    Name: "name",
    "Date of birth": "dateOfBirth",
    "Parent name": "parentName",
    Email: "email",
    Mobile: "mobile",
    "Parent mobile": "parentMobile",
    Gender: "gender",
    Department: "departmentCode",
    Semester: "semester",
    "Date joined": "dateJoined",
  };
  useEffect(() => {
    fetch({
      url: "/profile",
      setError: setServerError,
      setResult: setProfile,
    });
  }, []);
  return (
    <div className="profile-page-container">
      <form>
        {Object.entries(labelsAndProps).map(([label, prop]) => (
          <Input
            label={label}
            layoutType="inline"
            isField={true}
            value={(() => {
              if (prop == "dateOfBirth" || prop == "dateJoined") {
                return dateFormatter(profile[prop]);
              }
              return profile[prop];
            })()}
            readOnly={true}
          />
        ))}
      </form>
      {serverError && <small className="server-error">{serverError}</small>}
    </div>
  );
};
