import axios from "axios";

/* const url = {
    env:'lht', // vtx
    lht:'http://localhost/api/',
    vtx:'https://vtxcloud.com.br/xcloudhostmanager/public/api/'
}; */

export const api = axios.create({
  /* baseURL: "http://127.0.0.1:8000/api/", */
  baseURL: "https://cloudhostmanager.vtxcloud.com.br/api/"
});

api.defaults.headers.common["DeviceApp"] = "application/react";
api.defaults.headers.common["Content-Type"] = "application/json";
// 'Content-Type': 'application/json'
//api.defaults.headers.common["Authorization"] = `Bearer ii`;

const checkToken = async () => {
  console.log("entrou no checkToken");
};

export const headerAuthorization = async () => {
  const authuser = await JSON.parse(
    window.localStorage.getItem("@app::authuser")
  );
  //console.log(authuser.token);
  if (await authuser) {
    //console.log("headerAuthorization");
    api.defaults.headers.common["Authorization"] = `Bearer ${authuser.token}`;
  }
};

export default api;
