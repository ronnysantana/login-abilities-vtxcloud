import { useState, useEffect, useCallback } from "react";
import { Navigate, redirect } from "react-router-dom";

import { useToast } from "izitoast-react";
import "izitoast-react/dist/iziToast.css";

import { useAuth } from "../../contexts/AuthContext";

import { Login } from "../../pages/Login";
import { Home } from "../../pages/Home";

export function AuthRoute({ children, abilities }) {
	//const { user } = useUser();
	const {
		auth,
		user,
		abilities: ablts,
		notAccessAbilitie,
		setNotAccessAbilitie
	} = useAuth();

	const [abilitiesUser, setAbilitiesUser] = useState(false);

	const fc_notAccessAbilitie = (bool) => {
		setNotAccessAbilitie(bool);
	};

	useEffect(() => {
		const abilitiesCan = abilities?.split(",");
		abilitiesCan?.push("*");

		const findAbilities = ablts
			?.split(",")
			.some((find) => abilitiesCan.includes(find));

		setAbilitiesUser(findAbilities);

		/* const signIn = useCallback((username) => {
			
		}, []); */

		//console.log(abilitiesUser, findAbilities);
		/* console.log(user2.abilities); */

		//console.log(":entrou no useEffect do authRoute");
		/*  const checkToken = async () => {
      console.log(data?.user);
      if (data?.user) {
        setAuth(data?.user);
        //setAuth(storageData.user);
      }
    };
    checkToken(); */
	}, [auth, ablts, abilities]); /* [abilities, auth, ablts] */

	//console.log(abilitiesUser, auth, user, user2);
	/* const isAuth = true; */

	/*   const isAuth = storage.getToken(); */
	let ulia = abilitiesUser ? "abilitiesUser true" : "abilitiesUser false";

	const toastTes = useToast({
		title: "",
		message: "você não tem acesso a esta página ou recurso",
		theme: "dark",
		icon: "warn"
	});

	if (!auth) {
		//console.log(`AuthRoute if!auth linha 34 ˜ ${auth}`);
		// && storage.getToken() === false
		// return <Navigate to='/login'/>
		return (
			<>
				<h3>{ulia} linha 57</h3>
				<Login />
				{console.log("if !auth")}
			</>
		);
	}

	if (abilities == "*" && auth) {
		return (
			<>
				<h3>{ulia} linha 66</h3>
				{children}
				{console.log("if abilities == " * " && auth")}
			</>
		);
	}

	if (!abilities && auth) {
		return (
			<>
				<h3>{ulia} linha 75</h3>
				{children}
				{console.log("!abilities && auth")}
			</>
		);
	}

	/* if (abilitiesUser) {
    return { children };
  } else {
    return redirect("/");
  } */

	return abilitiesUser ? (
		<>
			<h3>{ulia} linha 84</h3>
			{/* fc_notAccessAbilitie(false) */}
			{children}
			{console.log("FINAL abilitiesUser ?")}
		</>
	) : (
		<>
			<h3>{ulia} linha 85</h3>
			{/* fc_notAccessAbilitie(true) */}
			<Home />
			{/* toastTes() */}
			{console.log("FINAL abilitiesUser :")}
			{/* redirect("/") */}
		</>
	);

	//return children;
}
