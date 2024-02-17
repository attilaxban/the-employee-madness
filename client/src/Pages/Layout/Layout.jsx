import { Outlet, Link } from "react-router-dom";

import "./Layout.css";

const Layout = () => (
  <div className="Layout">
    <nav>
      <ul>
        <li className="grow">
          <Link to="/">Employees</Link>
        </li>
        <li>
          <Link to="/create">
            <button type="button">Create Employee</button>
          </Link>
        </li>
        <li>
        <Link to="/equipments/create">
            <button type="button">Add equipment</button>
          </Link>
          <Link to="/tools">
            <button type="button">Tools</button>
          </Link>
          <Link to="/divisions/create">
            <button type="button">Add division</button>
          </Link>
          <Link to="/divisions/">
            <button type="button">Divisions</button>
          </Link>
          <Link to="/session/create">
            <button type="button">Add Training Session</button>
          </Link>
        </li>
      </ul>
    </nav>
    <Outlet />
  </div>
);

export default Layout;
