import { useState, useEffect, useCallback } from "react";
import { Navigate, Redirect, useNavigate } from "react-router-dom";

import { useAuth } from "../../contexts/AuthContext";

import { useLoading } from "../../contexts/LoadingContext";

export function AuthRoute({ children, abilities }) {
  if (abilities) {
    abilities.push("*");
  }

  const { loading, setLoading } = useLoading();

  const {
    auth,
    abilities: userAbilities,
    setNotAccessAbilitie,
    authToken,
    user,
  } = useAuth();

  console.log("AuthRoute 23", auth);

  const navigate = useNavigate();

  const fc_notAccessAbilitie = useCallback((bool) => {
    setNotAccessAbilitie(true);
  }, []);

  /* if (!auth && loading) {
    return null;
  } */

  //console.log(auth);

  if (!auth) {
    return (
      <>
        <Navigate to="/login" replace={true} />
        {console.log("if !auth AuthRoute:index 39", auth, user)}
      </>
    );
  }

  if (auth && !abilities) {
    return children;
  }

  if (
    abilities.some((abilitie) => {
      return userAbilities?.split(",").includes(abilitie);
    }) ||
    userAbilities?.split(",").includes("*")
  ) {
    return children;
  } else {
    return navigate("/");
    /* return (
			<>
				{fc_notAccessAbilitie(true)}
				{setInterval(() => navigate("/"), 3000)}
			</>
		); */
  }
}
