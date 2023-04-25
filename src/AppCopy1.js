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
import "./styles.css";
import { NavLink } from "react-router-dom";

import { useAuth, useAuth2 } from "./contexts/AuthContext";
import { useLoading } from "./contexts/LoadingContext";

import Login from "./components/Login";
import CanAbilities from "./components/CanAbilities";
import { api } from "./components/api";

import { useToast, immediateToast } from "izitoast-react";
import "izitoast-react/dist/iziToast.css";

import { AppRoutes } from "./App.Routes";

function App() {
  const { auth, user, notAccessAbilitie, setNotAccessAbilitie, authToken } =
    useAuth2();

  const { loading, setLoading, LoadingContainer } = useLoading();

  setInterval(() => setNotAccessAbilitie(false), 5000);

  useEffect(() => {
    setLoading(true);
    if (authToken) {
      api.defaults.headers.common["Authorization"] = `Bearer ${authToken}`;
    }
    if (notAccessAbilitie) {
      immediateToast("info", {
        message: "Hi, how it is going",
        timeout: 5000,
      });
    }
  }, []);

  const showMessage = useMemo(() =>
    useToast({
      title: "você não tem acesso a esta página ou recurso",
      message: "",
      theme: "dark",
      icon: "warn",
      displayMode: "replace", // once, replace
    })
  );

  const handleAlertAabilitie = (Alert) => {
    if (auth) {
      alert(Alert);
    } else {
      alert("Faça Login!");
    }
    /* console.log(user.name);
    console.log(user.modules);
    console.log(user.abilities); */
  };

  return (
    <div className="App">
      <LoadingContainer />
      {!loading && (
        <input
          type="checkbox"
          checked={loading}
          onChange={(e) => setLoading(!loading)}
        />
      )}

      <br />
      {!loading && <p>{user?.name}</p>}
      <br />
      {!loading &&
        (() => {
          if (user && user?.modules && user?.modules == "*") {
            return <p>all modules</p>;
          } else if (user && user?.modules && user?.modules != "*") {
            return <p> abilities modules</p>;
          }
        })()}
      {!loading && user && user?.modules && (
        <>
          <NavLink to="/">home </NavLink>
          {user?.modules.map((module, key) => (
            <NavLink key={key} to={module}>
              {module} &#160;
            </NavLink>
          ))}
          <NavLink to="/logout">sair</NavLink>
        </>
      )}
      {notAccessAbilitie && showMessage()}

      {!loading && (
        <>
          <AppRoutes />
          <hr />
        </>
      )}

      {!loading && user && auth && (
        <>
          <span
            style={{
              color: "red",
              lineHeight: 5,
              padding: 5,
              fontSize: 25,
            }}
          >
            <CanAbilities abilities={["invoices.update"]}>
              <button onClick={() => handleAlertAabilitie("invoices.update")}>
                invoice.update
              </button>
            </CanAbilities>
            <CanAbilities abilities={["clients.view"]}>
              <button onClick={() => handleAlertAabilitie("clients.view")}>
                client.view
              </button>
            </CanAbilities>
            {/* host.update */}
          </span>
        </>
      )}

      {!loading && (
        <>
          <hr />
          <Login />
          <br />
        </>
      )}
    </div>
  );
}

export default App;
