import { useState, useEffect } from "react";

/*
https://codepen.io/rsantana/pen/BaOEvxB?editors=0011
*/

function getStorageValue(key, defaultValue) {
	// getting stored value
	const saved = localStorage.getItem(key);
	const initial = JSON.parse(saved);
	return initial || defaultValue;
}

export const useLocalStorage = (key, defaultValue) => {
	const [value, setValue] = useState(() => {
		return getStorageValue(key, defaultValue);
	});

	useEffect(() => {
		// storing input name
		localStorage.setItem(key, JSON.stringify(value));
	}, [key, value]);

	return [value, setValue];
};
