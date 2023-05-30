import axios from "axios";
import { useEffect, useState } from "react";
import { CustomTable } from "../components/CustomTable";
import { dayGetter, days } from "../helpers/Date";
import { fetch } from "../helpers/fetch";
import "./../styles/table.scss";
import "./../styles/timetable.scss";
export const Timetable = () => {
  const [timeTable, setTimetable] = useState([]);
  const [serverError, setServerError] = useState("");
  useEffect(() => {
    fetch({
      url: "/timetable",
      setError: setServerError,
      setResult: (result) => {
        setTimetable(result);
        if (result.length == 0) {
          setServerError("Nothing to show");
        } else {
          setServerError("");
        }
      },
    });
  }, []);
  return (
    <>
      {timeTable.length > 0 && (
        <div className="table-container">
          <CustomTable
            titles={["Day", "I", "II", "III", "IV", "V", "VI", "VII"]}
          >
            {[1, 2, 3, 4, 5].map((day) => (
              <tr>
                <td>{days[day]}</td>
                {[1, 2, 3, 4, 5, 6, 7].map((hour) => (
                  <td>
                    {timeTable
                      .filter(
                        (period) => period.day == day && period.hour == hour
                      )
                      .map(({ subjectAcronym }) => subjectAcronym)
                      .join(" / ")}
                  </td>
                ))}
              </tr>
            ))}
          </CustomTable>
        </div>
      )}
      {serverError && <small className="server-error">{serverError}</small>}
    </>
  );
};
