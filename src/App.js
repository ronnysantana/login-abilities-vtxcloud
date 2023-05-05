/*

import { useLoading } from "../contexts/LoadingContext";
const { loading, setLoading } = useLoading();

setLoading(true);

{!loading && (
<>

</>
)}

*/

import { useEffect, useMemo } from "react";
import "./styles/index.scss";
import { NavLink } from "react-router-dom";

import { useAuth, useAuth2 } from "./contexts/AuthContext";
import { useLoading } from "./contexts/LoadingContext";

import CanAbilities from "./components/CanAbilities";
import { api } from "./components/api";
import Auth from "./components/api/auth";

import { Login } from "./pages/Login";

import { useToast, immediateToast } from "izitoast-react";
import "izitoast-react/dist/iziToast.css";

import { AppRoutes } from "./App.Routes";

function App() {
  const {
    auth,
    setAuth,
    setUser,
    setAbilities,
    user,
    notAccessAbilitie,
    setNotAccessAbilitie,
    authToken,
    signOut,
    saveUser,
  } = useAuth();

  const { loading, setLoading, LoadingContainer } = useLoading();

  setInterval(() => setNotAccessAbilitie(false), 5000);

  const showMessage = useMemo(() =>
    useToast({
      title: "você não tem acesso a esta página ou recurso",
      message: "",
      theme: "dark",
      icon: "warn",
      displayMode: "replace", // once, replace
    })
  );

  return (
    <div className="App">
      <LoadingContainer />
      {/* saveUser: {JSON.stringify(saveUser)} */}
      {!loading && user && user?.modules && (
        <>
          <NavLink to="/">home </NavLink>
          {user?.modules.map((module, key) => (
            <NavLink key={key} to={module}>
              {module} &#160;
            </NavLink>
          ))}
          <a onClick={() => signOut()}>sair</a>
        </>
      )}
      {notAccessAbilitie && showMessage()}
      {!loading && <AppRoutes />}
      {!loading && user && auth && (
        <>
          <CanAbilities abilities={["invoices.update"]}>
            <button onClick={() => alert("invoices.update")}>
              invoices.update
            </button>
          </CanAbilities>
          <CanAbilities abilities={["clients.view"]}>
            <button onClick={() => alert("clients.view")}>client.view</button>
          </CanAbilities>
        </>
      )}
    </div>
  );
}

export default App;
