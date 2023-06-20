import axios from "axios";

// const url = import.meta.env.VITE_API_KEY;

const Roomster = axios.create({
  //   baseURL: "http://localhost:3030/",
  baseURL: "http://localhost:8080/",
});

Roomster.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.log(error);
    return Promise.reject(error);
  }
);

// params: {
//     api_key: '52ef927bbeb21980cd91386a29403c78',
// }

export default Roomster;
