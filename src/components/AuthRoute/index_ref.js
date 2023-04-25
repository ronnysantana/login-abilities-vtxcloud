import { Navigate, useNavigate } from "react-router-dom";

import { useAuth } from "../../contexts/AuthContext";

import { useLoading } from "../../contexts/LoadingContext";

export function AuthRoute({ children, abilities }) {
  if (abilities) {
    abilities.push("*");
  }

  const { loading } = useLoading();

  const { auth, abilities: userAbilities, user } = useAuth();

  const navigate = useNavigate();

  if (loading === false) {
    if (!auth) {
      console.log(
        "if !auth AuthRoute:index 22",
        `loading ${loading} | auth ${auth}`,
        user
      );
      return <Navigate to="/login" replace={true} />;
    }

    if (auth && !abilities) {
      console.log("if auth && !abilities AuthRoute:index 30", auth, user);
      return children;
    }

    if (
      abilities.some((abilitie) => {
        return userAbilities?.split(",").includes(abilitie);
      }) ||
      userAbilities?.split(",").includes("*")
    ) {
      console.log("if some abilities AuthRoute:index 40", auth, user);
      return children;
    } else {
      return navigate("/");
    }
  }
  console.log("pos if loading===false - l45", auth, loading);
  /*  return <Navigate to="/login" replace={true} />; */
}
