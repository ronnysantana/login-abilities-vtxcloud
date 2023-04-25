import React, { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";

export default function CanAbilities({ abilities, children }) {
  const { user } = useAuth();

  if (
    abilities.some((abilitie) => {
      return user?.abilities?.includes(abilitie);
    }) ||
    user?.abilities?.includes("*")
  ) {
    return children;
  }

  //return <>{abilitiesUser && children}</>;
}
