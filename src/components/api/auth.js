import api from "../api";

export default {
  Login: async (mail, password) => {
    const response = await api.post("auth", { mail, password });

    if (response.status === 202) {
      api.defaults.headers.common["Authorization"] = `Bearer ${response.data.token}`;
    }

    return response;
    /* return await api.post("auth", {mail:u,password:p}); */
  },

  CheckToken: async (token) => {
    //console.log(token);
    const response = await api.get("auth", {
      headers: { Authorization: ` Bearer ${token}` },
    });

    if (response.status === 202) {
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }

    //(response);
    return response;
    /* return await api.post("auth", {mail:u,password:p}); */
  },

  Logout: async () => {
    const response = await api.delete("auth");
    return response;
    /* return await api.post("auth", {mail:u,password:p}); */
  },

  Abilities: async () => {
    const response = await api.get("users/abilities");
    return response;
    /* return await api.post("auth", {mail:u,password:p}); */
  },
};
