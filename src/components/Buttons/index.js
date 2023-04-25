import React, { useState, useCallback, useEffect } from "react";

import { useAuth } from "../../contexts/AuthContext";
import { useLoading } from "../../contexts/LoadingContext";

import { api } from "../../components/api";
import Auth from "../../components/api/auth";

export function Buttons() {
  const {
    auth,
    setAuth,
    setAuthToken,
    user,
    setUser,
    signIn,
    signOut,
    abilities,
  } = useAuth();

  const { loading, setLoading } = useLoading();

  const [checked, setChecked] = useState(true);

  useEffect(() => {
    //console.log(checked);
  }, [checked]);

  const handleLogin = async (user, pass) => {
    /* if (auth) {
			handleLogout();
		} */
    Auth.Login(user, pass).then(
      function (response) {
        //setLoading(false);
        console.log(response);

        if (response.data.token) {
          api.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${response.data.token}`;
          ///
          //console.log(response);
          setAuth(true);
          setUser(response.data.user);
          //setAuthuser(response.data);
          setAuthToken(response.data.token);

          //storage.setToken(response.data.token);
          //return navigate("/");
          //console.log(response);
        }
      },
      function (reason) {
        console.log(reason, "já logado"); // Error!
      }
    );

    /* getByIndex("return", "202").then((personFromDB) => {
      if (personFromDB) {
        update(dataAuth).then((event) => {
          alert("Edited!");
        });
      }
      if (!personFromDB) {
        add(dataAuth).then((event) => {
          alert("Add!");
        });
      }
    }); */
  };

  const handleLogout = async () => {
    if (auth) {
      setLoading(true);
      try {
        const response = await Auth.Logout();
        if (response.data.return) {
          //setAuth(false);
          setUser({});
          console.clear();
          setAuthToken(false);
          setLoading(false);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleConsole = () => {
    /* getByID(1).then((personFromDB) => {
      setAuth(personFromDB.token);
      console.log(personFromDB);
    }); */
    /* console.log(authStorage);
    console.log(auth); */
    console.clear();
    /* console.log(authToken);
		console.log(auth); */
    console.log(`auth: ${auth} | loading ${loading}`, user, abilities);

    /* if (auth) {
			console.clear();
			console.log(auth);
			console.log(user);
		} else {
			alert("Faça Login com usuário!");
			console.log(`auth ${auth}`);
		} */
    /* console.log(user.name);
    console.log(user.modules);
    console.log(user.abilities); */
  };

  const handleAbilities = async () => {
    if (auth) {
      try {
        const response = await Auth.Abilities();
        //console.log(response);
        console.log(response.data.data.modules);
        //console.log(response.data.data.abilities);
      } catch ({ response }) {
        if (response.status === 403) {
          alert("Você não tem acesso a esse recurso!");
        }
        if (response.status === 401) {
          //setAuth(false);
          setUser({});
          console.clear();
        }

        console.log(response.status, response.data.message);
      }
    } else {
      alert("Faça Login com usuário com acesso a esse recurso!");
      console.log(`auth ${auth}`);
    }
  };

  const handleSubmit = () => {
    signIn("Ronny Santana");
    //console.log("s");
    //setNome("Ronny G Santana");
  };

  return (
    <div>
      <br />
      <button onClick={handleConsole}>console</button>
      <button onClick={handleAbilities}>Abilities</button>
      <button onClick={signOut}>Logout</button>
      <button onClick={handleSubmit}>setNome</button>
      {/* <input
				value={nomeLS || ""}
				onChange={(e) => setNomeLS(e.target.value)}
			/> */}
    </div>
  );
}
