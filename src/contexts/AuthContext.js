import React, {
  createContext,
  useState,
  useContext,
  useCallback,
  useEffect,
} from "react";

import { Navigate, useNavigate } from "react-router-dom";

import Auth from "../components/api/auth";

import { useLocalStorage as useStorageState } from "../components/useLocalStorage";

import { useLoading } from "./LoadingContext";

const AuthContext = createContext();

/*
  savedUsers //array
  saveUser //boolean
*/

export default function AuthProvider({ children }) {
  const [auth, setAuth] = useState(null);
  const [user, setUser] = useState({});
  const [abilities, setAbilities] = useState();

  const [notAccessAbilitie, setNotAccessAbilitie] = useState(false);

  const [savedUsers, setSavedUsers] = useStorageState( //array
    `${process.env.REACT_APP_AUTH_USER}SavedUsers`,
    []
  );
  const [saveUser, setSaveUser] = useState(true); //boolean

  const { loading, setLoading } = useLoading();

  const [authToken, setAuthToken] = useStorageState(
    process.env.REACT_APP_AUTH_USER_TOKEN, //VTXCloud@AuthUser:Token
    null
  );

  //process.env.AUTH_USER_TOKEN,

  const setReqResUser = useCallback(async (setRes) => {
    if (setRes.token) {
      //localStorage.setItem("TOKEN", setRes.token);
      setAuthToken(setRes.token);
    }
    setUser(setRes.user);
    setAbilities(setRes.user.abilities);
    setAuth(true);
  }, []);

  const deleteToken = useCallback(async () => {
    localStorage.removeItem(process.env.REACT_APP_AUTH_USER_TOKEN);
    setAuthToken(null);
  }, []);

  useEffect(() => {
    (async () => {
      /*
        if(authToken) {} else {}
      */
      if (authToken) {
        setLoading(true);
        try {
          let checkTokenUser = await Auth.CheckToken(authToken);
          if (checkTokenUser.status === 202) {
            setReqResUser(checkTokenUser.data);
            console.log(checkTokenUser);
            setLoading(false);
          }
        } catch (error) {
          if (error.response.status === 401) {
            setAuth(false);
            setUser({});
            deleteToken();
            console.log(response.status, "401 Unauthorized");
            console.log(response);
            setLoading(false);
          }
        }
      } else {
        setAuth(false);
        setUser({});
        deleteToken();
        setLoading(false);
      }
    })();
  }, []);

  const signIn = useCallback(async (user, pass) => {

    //return console.log(user, pass);
    setLoading(true);
    try {
      let AuthLogin = await Auth.Login(user, pass);
      if (AuthLogin.status === 202) {
        setReqResUser(AuthLogin.data);
        setLoading(false);
        
        if(saveUser == true) {
          if (!savedUsers.find((savedUser) => savedUser.mail == user)) {
            console.log("não existe", savedUsers.mail, user);
            setSavedUsers((prevState) => [...prevState, { mail: user, name: AuthLogin.data.user.name }]); //AuthLogin.user.name
          }
        }

        return AuthLogin.data;
      }
      console.log(AuthLogin);
    } catch (error) {
      if (error.response.status === 401) {
        setAuth(false);
        setUser({});
        deleteToken();
        console.log(error.response.status, "401 Unauthorized");
        console.log(error.response);
        setLoading(false);
      }
    }
  }, []);

  const signOut = useCallback(async () => {
    /* if (auth) { */
    setLoading(true);
    try {
      const response = await Auth.Logout();
      if (response.data.return) {
        console.clear();
        setAuth(false);
        setUser({});
        setAbilities({});
        setAuthToken(false);
        deleteToken();
        setLoading(false);
        return true;
      }
    } catch (error) {
      console.log(error);
    }
    /* } */
  }, []);

  return (
    <AuthContext.Provider
      value={{
        auth,
        setAuth,
        authToken,
        user,
        setUser,
        signIn,
        signOut,
        abilities,
        setAbilities,
        notAccessAbilitie,
        setNotAccessAbilitie,
        savedUsers,
        setSavedUsers, //array
        saveUser,
        setSaveUser, //boolean
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

/* export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within a AuthProvider");
  return context;
} */

export const useAuth = () => useContext(AuthContext);
