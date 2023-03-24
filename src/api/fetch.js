const baseURL = "http://prakashpun22.pythonanywhere.com/api/v1/auth/";
const api = null;
export const login = async (data) => {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };
  const res = await fetch(`${baseURL}token/`, requestOptions);
  return res.json();
};

export const fetchProfile = async (token) => {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `JWT ${token}`,
    },
  };
  const res = await fetch(`${baseURL}profile/`, requestOptions);
  return res.json();
};

export const updateProfile = async (token, data, username) => {
  const requestOptions = {
    method: "PATCH",
    headers: {
      "Content-type": "application/json",
      Authorization: `JWT ${token}`,
    },
    body: JSON.stringify(data),
  };

  const res = await fetch(
    `${baseURL}user/profile/${username}/`,
    requestOptions
  );
  return res.json();
};

export const logout = async (token) => {
  const requestOptions = {
    method: "DELETE",
    headers: {
      "Content-type": "application/json",
      Authorization: `JWT ${token}`,
    },
  };

  const res = await fetch(`${baseURL}user/logout/`, requestOptions);
  return res.json();
};

export default api;
