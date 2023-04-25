import { useRoutes } from "react-router-dom"; //Routes, Route,

import { Home } from "./pages/Home";
import { AuthRoute } from "./components/AuthRoute/index_ref";
import { Login } from "./pages/Login";
import { Invoices } from "./pages/Invoices";
// import InvoiceID from "./pages/invoice_id";
import { Logout } from "./pages/Logout";
import { Clients } from "./pages/Clients";
import { Contas } from "./pages/Contas";
import { Users } from "./pages/Users";

import { useAuth } from "./contexts/AuthContext";

/**
 users:all,viewAny,view,create,update,delete,loginRelatories|
 invoices:all,viewAny,view,create,update,delete|
 clients:all,viewAny,view,create,update,delete|
 hosts:all,viewAny,view,create,update,delete|
 ratting:viewAny|creditscard:viewAny
 */

export const AppRoutes = () => {
  const { signOut, auth } = useAuth();
  return useRoutes([
    {
      path: "/",
      element: (
        <AuthRoute>
          <Home />
        </AuthRoute>
      ),
    },
    { path: "/login", element: <Login /> },
    {
      path: "/invoices",
      element: (
        <AuthRoute
          abilities={[
            "invoices.all",
            "invoices.vivewAny",
            "invoices.view",
            "invoices.create",
            "invoices.update",
            "invoices.delete",
          ]}
        >
          {/* abilities="invoices.all,invoices.viewAny,invoices.create,invoices.update,invoices.delete" */}
          <Invoices />
        </AuthRoute>
      ),
    },
    {
      path: "/clients",
      element: (
        <AuthRoute
          abilities={[
            "clients.all",
            "clients.viewAny",
            "clients.view",
            "clients.create",
            "clients.update",
            "clients.delete",
            "hosts.update",
          ]}
        >
          <Clients />
        </AuthRoute>
      ),
    },
    {
      path: "/users",
      element: (
        <AuthRoute
          abilities={[
            "users.all",
            "users.viewAny",
            "users.view",
            "users.create",
            "users.update",
            "usersdelete",
            "users.update",
          ]}
        >
          <Users />
        </AuthRoute>
      ),
    },
    {
      path: "/hosts",
      element: (
        <AuthRoute
          abilities={[
            "hosts.all",
            "hosts.viewAny",
            "hosts.view",
            "hosts.create",
            "hosts.update",
            "hosts.delete",
            "hosts.update",
          ]}
        >
          <Contas />
        </AuthRoute>
      ),
    },
    {
      path: "/logout",
      element: (
        <AuthRoute>
          <Logout />
        </AuthRoute>
      ),
    },
    {
      path: "*",
      element: (
        <AuthRoute>
          <Home />
        </AuthRoute>
      ),
    },
  ]);
  /* return(
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/invoices" element={<AuthRoute><Invoices /></AuthRoute>} />
          <Route path="/invoice/:invoiceId" element={<InvoiceID />} />
        </Routes>
    ); */
};
