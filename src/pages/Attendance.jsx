import axios from "axios";
import { useEffect, useState } from "react";
import { Select } from "../components/Select";
import { CustomTable } from "../components/CustomTable";
import { Input } from "../components/Input";
import "./../styles/attendance.scss";
import { dateFormatter, days } from "../helpers/Date";
import { fetch } from "../helpers/fetch";
import { PaginatedTable } from "../components/PaginatedTable";
export const Attendance = () => {
  const [attendance, setAttendance] = useState([]);
  const [percentage, setPercentage] = useState("");
  const [subjects, setSubjects] = useState([]);
  const [filters, setFilters] = useState({
    date: "",
    subject: "",
  });
  const filterFunction = (data) =>
    data.subjectCode.includes(filters.subject) &&
    dateFormatter(data.date).includes(filters.date);

  const sortFunction = (obj1, obj2) => {
    return obj1.date + obj1.day + obj1.hour > obj2.date + obj2.day + obj2.hour;
  };
  const [serverError, setServerError] = useState("");
  useEffect(() => {
    fetch({
      url: "/attendance",
      setResult: (result) => {
        setAttendance(result.attendance.sort(sortFunction));
        setSubjects(result.subjects);
        if (result.attendance.length == 0) {
          setServerError("Nothing to show");
        } else {
          setServerError("");
        }
      },

      setError: setServerError,
    });
  }, []);
  useEffect(() => {
    setPercentage(() => {
      if (filters.date) {
        return;
      }
      const subjectFiltered = attendance.filter((data) =>
        data.subjectCode.includes(filters.subject)
      );
      if (subjectFiltered.length == 0) {
        return;
      }
      return (
        (subjectFiltered.filter((data) => data.attended || data.isOd).length /
          subjectFiltered.length) *
        100
      ).toFixed(2);
    });
  }, [filters, attendance]);

  const renderFunction = (attendance) => (
    <>
      <td>{dateFormatter(attendance.date)}</td>
      <td>{days[attendance.day]}</td>
      <td>{attendance.hour}</td>
      <td>{attendance.subjectAcronym}</td>
      <td>
        {attendance.isOd ? "-" : attendance.attended ? "Present" : "Absent"}
      </td>
      <td>{attendance.isOd ? "OD" : "-"}</td>
    </>
  );
  return (
    <>
      {attendance.length > 0 && (
        <div className="attendance-container">
          <form action="#">
            <Input
              layoutType="inline"
              label="Date"
              isField={true}
              onChange={(ev) => {
                setFilters((currentFilters) => ({
                  ...currentFilters,
                  date: ev.target.value,
                }));
              }}
              value={filters.date}
            />
            <Select
              layoutType="inline"
              label="Subject"
              options={subjects.map(({ subjectCode, subjectAcronym }) => [
                subjectAcronym,
                subjectCode,
              ])}
              onChange={(ev) => {
                setFilters((currentFilters) => ({
                  ...currentFilters,
                  subject: ev.target.value,
                }));
              }}
              value={filters.subject}
            />
          </form>
          <div className="percentage">
            Percentage: <span>{percentage || "--"}</span> %
          </div>
          <PaginatedTable
            titles={["Date", "Day", "Hour", "Subject", "Attended", "OD"]}
            data={attendance.filter(filterFunction)}
            resetTrigger={filters}
            renderFunction={renderFunction}
          />
        </div>
      )}
      {serverError && <small className="server-error">{serverError}</small>}
    </>
  );
};
