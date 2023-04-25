import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";

export const Invoices = () => {
  //console.log("Invoices");

  const { user } = useAuth();

  //console.log(user);

  return (
    <section>
      <h1>Invoices</h1>
    </section>
  );
};
