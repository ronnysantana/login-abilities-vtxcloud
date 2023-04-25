import { useEffect } from "react";

import { useAuth } from "../contexts/AuthContext";

export const Logout = () => {
	//console.log("Logout");
	const { signOut, auth } = useAuth();

	useEffect(() => {
		if (auth) {
			signOut();
		}
	}, []);
};
