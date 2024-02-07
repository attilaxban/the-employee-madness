import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider} from "react-router-dom";
import reportWebVitals from "./reportWebVitals";



import Layout from "./Pages/Layout";
import ErrorPage from "./Pages/ErrorPage";
import EmployeeList from "./Pages/Employees/EmployeeList";
import EmployeeCreator from "./Pages/Employees/EmployeeCreator";
import EmployeeUpdater from "./Pages/Employees/EmployeeUpdater";
import Superheroes from "./Pages/Employees/Superheroes";
import Equipments from "./Pages/Equipments/Equipments"
import Tools from "./Pages/Tools/Tools";

import "./index.css";
import TableTest from "./Pages//Tests/TableTest";
import FormTest from "./Pages/Tests/FormTest";
import EquipmentTable from "./Components/EquipmentTable/EquipmentTable";
import MissingEmployees from "./Pages/Employees/MissingEmployees";
import Kittens from "./Pages/Kittens/Kittens";
import Games from "./Pages/BoardGame/Games";
import GameList from "./Pages/BoardGame/GameList";
import GameListQuery from "./Pages/BoardGame/GameListQuery"
import GameListId from "./Pages/BoardGame/GameListId";
import ToolsQuery from "./Pages/Tools/ToolsQuery";
import ToolsId from "./Pages/Tools/ToolsId";
import EmployeeAddress from "./Pages/Employees/EmpolyeeAddress";
import Division from "./Pages/Divisions/Divisions";
import DivisionCreator from "./Pages/Divisions/DivisionCreator";
import DivisionUpdater from "./Pages/Divisions/DivisionUpdater";
import EmployeesAssign from "./Pages/Divisions/EmployeesAssign";
import DivisionId from "./Pages/Divisions/DivisionId";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <EmployeeList />,
      },
      {
        path: "/create",
        element: <EmployeeCreator />,
      },
      {
        path: "/update/:id",
        element: <EmployeeUpdater />,
      },
      {
        path: "/table-test",
        element: <TableTest />,
      },
      {
        path: "/form-test",
        element: <FormTest />,
      },
      {
        path:"/employees/superheroes",
        element: <Superheroes />
      },
      {
        path:"/equipments",
        element: <EquipmentTable />
      },
      {
        path:"/equipments/create",
        element: <Equipments />
      },
      {
        path: "/missing",
        element: <MissingEmployees/>
      },
      {
        path: "/tools",
        element: <Tools />
      },
      {
        path: "/toolsquery",
        element: <ToolsQuery />
      },
      {
        path: "/tools/:id",
        element: <ToolsId />
      },
      {
        path: "/kittens/:employeeId",
        element: <Kittens />
      },
      {
        path: "/games",
        element: <Games />
      },
      {
        path: "/games-list",
        element: <GameList />
      },
      {
        path: "/game-list",
        element: <GameListQuery />
      },
      {
        path: "/games-list/:id",
        element: <GameListId />
      },
      {
        path: "/employee/:id/address",
        element: <EmployeeAddress />
      },
      {
        path: "/divisions",
        element: <Division />
      },
      {
        path: "/divisions/create",
        element: <DivisionCreator />
      },
      {
        path: "/divisions/edit",
        element: <DivisionUpdater />
      },
      {
        path: "/employees/:id/assign",
        element: <EmployeesAssign />
      },
      {
        path: "/division/:id",
        element: <DivisionId />
      }

    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
