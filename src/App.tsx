import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import Login from "./pages/login";
import AuthLayout from "./layouts/auth";
import AppLayout from "./layouts/app";
import Modules from "./pages/modules";
import SubjectBlock from "./pages/subjectBlock";
import MemberSchool from "@/pages/memberSchool";
import Subject from "./pages/subject";
import User from "@/pages/user";
import Majors from "./pages/majors";
import File from "./pages/manageFiles";
import Dashboard from "./pages/dashboard";
import SubMajors from "./pages/sub-majors";
import Application from "./pages/application";
import Rules from "./pages/rules";
import Certificate from "./pages/certificates";
import Conversation from "./pages/conversations";
import Settings from "./pages/settings";
import { useContext } from "react";
import { GlobalContext } from "./contexts/globalContext";

function App() {
  const { auth } = useContext(GlobalContext);
  const isAdmin = auth?.role?.name === "admin";
  const isAdmissionStaff = auth?.role?.name === "admission-staff";
  const router = createBrowserRouter([
    {
      element: <AppLayout />,
      errorElement: <p className="text-center">You are not permission</p>,
      children: [
        {
          path: "/",
          element: <Dashboard />,
        },
        ...(isAdmin
          ? [
              {
                path: "modules",
                element: <Modules />,
              },
              {
                path: "subject-block",
                element: <SubjectBlock />,
              },
              {
                path: "member-school",
                element: <MemberSchool />,
              },
              {
                path: "subject",
                element: <Subject />,
              },
              {
                path: "user",
                element: <User />,
              },
              {
                path: "majors",
                element: <Majors />,
              },
              {
                path: "sub-majors",
                element: <SubMajors />,
              },
              {
                path: "file",
                element: <File />,
              },
              {
                path: "rules",
                element: <Rules />,
              },
              {
                path: "certificates",
                element: <Certificate />,
              },

              {
                path: "settings",
                element: <Settings />,
              },
            ]
          : []),
        ...(isAdmissionStaff
          ? [
              {
                path: "application",
                element: <Application />,
              },
              {
                path: "conversations",
                element: <Conversation />,
              },
            ]
          : []),
      ],
    },
    {
      element: <AuthLayout />,
      children: [
        {
          path: "login",
          element: <Login />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
