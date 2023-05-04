import React, { useState, useCallback, useEffect, useRef } from "react";

import { useAuth } from "../contexts/AuthContext";
import { useLoading } from "../contexts/LoadingContext";
import { Navigate } from "react-router-dom";

import { useLocalStorage } from "../components/useLocalStorage";

import { api } from "../components/api";
import Auth from "../components/api/auth";

export const Login = () => {
  const { auth, signIn, savedUsers, setSavedUsers, saveUser, setSaveUser } =
    useAuth();

  /*const [savedUsers, setSavedUsers] = useLocalStorage("VTXCloud@Login:SavedUsers", []);
  const [saveUser, setSaveUser] = useState(false);*/

  const [usr, setUsr] = useState("pix@rsantana.us");
  const [psw, setPsw] = useState("");
  const fieldsetRef = useRef();
  const usrRef = useRef();
  const pswRef = useRef();

  const handleSignIn = () => {
    var validatePassword = new RegExp("^([0-9]{4})$");

    if (validatePassword.test(psw)) {
      fieldsetRef.current.disabled = true;
      (async () => {
        let AuthLogin = await signIn(usr, psw);
        if (!AuthLogin) {
          alert("algo de errado não esta certo");
          setPsw("");
          pswRef.current.focus();
        }
        /* fieldsetRef.current.disabled = false; */
      })();

      return console.log(psw, true);
    } else {
      alert("digite a senha, 4 caracteres numericos");
      pswRef.current.focus();
      return console.log(psw, false);
    }
  };

  const handleSignIn2 = useCallback(async () => {
    if (psw.match(/^([0-9]{4})$/)) {
      return console.log(psw.length);
    } else {
      alert("digite a senha, 4 caracteres");
      pswRef.current.focus();
    }
    //console.clear();
    return console.log(psw.length);
    if (psw.toString().length >= 4) {
      //fieldsetRef.current.disabled = true;
      return console.log(usr, psw);

      (async () => {
        let AuthLogin = await signIn(usr, psw).then((res) => {
          console.log("res 31", res.user.name);
          fieldsetRef.current.disabled = false;
        });
      })();
    }

    /* if(psw.match(/^([0-9]{4})$/)) {      
    } else {
      alert("digite a senha, 4 caracteres");
      pswRef.current.focus();
    } */
  }, []);

  if (auth) {
    return <Navigate to="/" replace={true} />;
  }

  return (
    <section>
      <ul>
        {savedUsers.map((user, key) => (
          <li key={key}>
            Olá {user.name}, digite sua senha {user.mail}
          </li>
        ))}
      </ul>
      {usr}
      <fieldset ref={fieldsetRef}>
        <label htmlFor="user">
          <input
            type="text"
            id="user"
            placeholder="user"
            name="user"
            ref={usrRef}
            value={usr}
            onChange={(e) => setUsr(e.target.value)}
          />
        </label>
        <label htmlFor="pass">
          <input
            type="password"
            id="pass"
            placeholder="pass"
            name="pass"
            ref={pswRef}
            /* ref={(pswRef) => pswRef && pswRef.focus()} */
            value={psw}
            onChange={(e) => setPsw(e.target.value)}
          />
        </label>

        <input
          type="checkbox"
          checked={saveUser}
          onChange={(e) => setSaveUser(!saveUser)}
        />

        <button onClick={() => handleSignIn()}>go</button>
      </fieldset>
      <br />
      <br />
      <button
        className="btnLogin"
        onClick={() => signIn("pix@rsantana.us", "4586")}
      >
        pix
        {/* host.update,host.create,host.view,client.update,client.view  */}
      </button>
      <button
        className="btnLogin"
        onClick={() => signIn("m@rsantana.us", "4586")}
      >
        m
        {/* host.create,host.view,client.all,user.update,invoice.update,invoice.update,user.create,user.delete  */}
      </button>
      <button
        className="btnLogin"
        onClick={() => signIn("vtxcloud@rsantana.us", "4586")}
      >
        vtxcloud
        {/* * */}
      </button>
    </section>
  );
};
