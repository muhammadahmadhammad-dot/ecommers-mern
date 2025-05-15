import axios from "axios";

const login = async (data) => {
    console.log(data);
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_BACKEND_BASE_URL}/users/login`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    
    window.localStorage.setItem("auth", JSON.stringify(response.data.user));
    window.localStorage.setItem("token", response.data?.token);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};
const authService = {login}

export default authService