import React from "react";
import ReactDOM from "react-dom/client";
import { combineProviders } from "react-combine-provider";
import { BrowserRouter } from "react-router-dom";

import AuthProvider from "./contexts/AuthContext";
import UserProvider from "./contexts/UserContext";
import LoadingProvider from "./contexts/LoadingContext";

const AppProviders = combineProviders([AuthProvider, LoadingProvider]); //UserProvider

import App from "./App";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AppProviders>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AppProviders>
  </React.StrictMode>
);

/*
{
	"return": "202",
	"token": "28|UX3U8kzyMpLp0W8hp8Awwoo2xlT4AH7qubf2iSxm",
	"user": {
		"id": 3,
		"name": "Ronny SantGom",
		"img": "rsagomes.png",
		"mail": "pix@rsantana.us",
		"admin_level": 9,
		"abilities": "host.update,host.create,host.view,client.update,client.view",
		"status": 1,
		"modules": {
			"0": "host",
			"3": "client"
		}
	}
}
*/
