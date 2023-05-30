import { NavLink, Outlet } from "react-router-dom";
import { Navbar } from "./../components/Navbar";
import "./../styles/home.scss";

export const Home = () => {
  return (
    <>
      <Navbar username={JSON.parse(sessionStorage.getItem("student"))?.regNo} />
      <section className="container">
        <ul className="links">
          <li>
            <NavLink to="attendance">View attendance</NavLink>
          </li>

          <li>
            <NavLink to="timetable">View timetable</NavLink>
          </li>
          <li>
            <NavLink to="profile">View profile</NavLink>
          </li>
          <li>
            <NavLink to="changePassword">Change password</NavLink>
          </li>
        </ul>
        <Outlet />
      </section>
    </>
  );
};
