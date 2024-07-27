import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Dashboard from "./pages/dashboard";
import Employee from "./pages/employee";
import Employeelist from "./pages/employeeList";
import Login from "./pages/login";
import SignUp from "./pages/signup";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "sign-up",
    element: <SignUp />,
  },
  {
    path: "dashboard",
    element: <Dashboard />,
  },
  {
    path: "employee",
    element: <Employee editPage={false} />,
  },
  {
    path: "employee/:id",
    element: <Employee editPage={true} />,
  },
  {
    path: "employee/list",
    element: <Employeelist />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
