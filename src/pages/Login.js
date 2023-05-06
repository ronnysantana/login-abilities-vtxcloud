import React, { useState, useCallback, useEffect, useRef } from "react";

import { useAuth } from "../contexts/AuthContext";
import { useLoading } from "../contexts/LoadingContext";
import { Navigate } from "react-router-dom";

import { useLocalStorage } from "../components/useLocalStorage";

import { api } from "../components/api";
import Auth from "../components/api/auth";
import { validatePassword } from "../components/utils/RegExp";

export const Login = () => {
  const { auth, signIn, savedUsers, setSavedUsers, saveUser, setSaveUser } =
    useAuth();

  /*const [savedUsers, setSavedUsers] = useLocalStorage("VTXCloud@Login:SavedUsers", []);
  const [saveUser, setSaveUser] = useState(false);*/

  const [usr, setUsr] = useState("pix@rsantana.us");
  const [psw, setPsw] = useState("");
  const [pswPlaceHolder, setPswPlaceHolder] = useState("Senha");
  const fieldsetRef = useRef();
  const usrRef = useRef();
  const pswRef = useRef();

  const [sadsa, setsadsa] = useState();

  const handleSignIn = (event = 0) => {
    //return console.log(savedUsers.find((savedUser) => savedUser.mail == usr));
    if (validatePassword.test(psw)) {
      fieldsetRef.current.disabled = true;
      (async () => {
        let AuthLogin = await signIn(usr, psw);
        console.log(AuthLogin);
        if (AuthLogin) {
          if (saveUser == true) {
            if (!savedUsers.find((savedUser) => savedUser.mail == usr)) {
              console.log("não existe", savedUsers.mail, usr);
              setSavedUsers((prevState) => [
                ...prevState,
                { mail: usr, name: AuthLogin.user.name },
              ]); //AuthLogin.user.name
            }
          }
        } else {
          console.log(AuthLogin);
          setPswPlaceHolder("algo de errado não esta certo");
          setPsw("");
          pswRef.current.focus();
        }
        /* fieldsetRef.current.disabled = false; */
      })();

      return console.log(psw, true);
    } else {
      setPswPlaceHolder("digite a senha, 4 caracteres numericos");
      setPsw("");
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

  const activeUserSaved = (user, key) => {
    setUsr(user.mail);
    pswRef.current.focus();
    setsadsa(`${sadsa} ${user}+${key})`);
    console.log(user, key, sadsa);
  };

  const savedUsersComponentStructure = (user, key) => {
    return (
      <li onClick={() => activeUserSaved(user, key)} key={key}>
        <p>Olá {user.name}, digite sua senha</p>
        <label className="lblLogin" htmlFor="pass">
          <i></i>
          <input
            type="password"
            id="pass"
            placeholder={pswPlaceHolder}
            name="pass"
            ref={pswRef}
            /* ref={(pswRef) => pswRef && pswRef.focus()} */
            value={psw}
            onChange={(e) => setPsw(e.target.value)}
            /* onKeyPress={handleSignIn} */
          />
          <button onClick={() => handleSignIn()} className="btnLogin go">
            go
          </button>
        </label>
      </li>
    );
  };

  return (
    <section>
      {savedUsers.length >= 1 && (
        <ul className="structureSavedUserContainer">
          {savedUsers.map((user, key) =>
            savedUsersComponentStructure(user, key)
          )}
        </ul>
      )}

      {/* {usr} */}
      {console.log(savedUsers)}
      <fieldset className="fstLogin" ref={fieldsetRef}>
        <label className="lblLogin" htmlFor="user">
          <i>Usuário</i>
          <input
            type="text"
            id="user"
            placeholder={"user"}
            name="user"
            ref={usrRef}
            value={usr}
            onChange={(e) => setUsr(e.target.value)}
          />
          <input
            type="checkbox"
            checked={saveUser}
            className="apple-switch"
            onChange={(e) => setSaveUser(!saveUser)}
          />
        </label>
        <label className="lblLogin" htmlFor="pass">
          <i>Senha</i>
          <input
            type="password"
            id="pass"
            placeholder={pswPlaceHolder}
            name="pass"
            ref={pswRef}
            /* ref={(pswRef) => pswRef && pswRef.focus()} */
            value={psw}
            onChange={(e) => setPsw(e.target.value)}
            /* onKeyPress={handleSignIn} */
          />
          <button onClick={() => handleSignIn()} className="btnLogin go">
            go
          </button>
        </label>
      </fieldset>
      <br />
      <br />

      {/*}
      
      <button
        className="btnLogin"
        onClick={() => signIn("pix@rsantana.us", "4586")}
      >
        pix
        // host.update,host.create,host.view,client.update,client.view
      </button>
      <button
        className="btnLogin"
        onClick={() => signIn("m@rsantana.us", "4586")}
      >
        m
        // host.create,host.view,client.all,user.update,invoice.update,invoice.update,user.create,user.delete
      </button>
      <button
        className="btnLogin"
        onClick={() => signIn("vtxcloud@rsantana.us", "4586")}
      >
        vtxcloud
        
      </button>
      
      {*/}
    </section>
  );
};
