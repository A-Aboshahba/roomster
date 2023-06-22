import axios from 'axios';


const Roomster = axios.create({
    baseURL: "http://localhost:3030/",
});

Roomster.interceptors.request.use(
    config => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    // error => {
    //     // <CustomizedSnackbars open={true} message={error} />
    // }
);
// Roomster.interceptors.response.use(

//     config => {
//         console.log(config)
//     },
//         (error) => {
//         console.log(error);
//         // <CustomizedSnackbars  message={"ss"} />
//     }
// );

// params: {
//     api_key: '52ef927bbeb21980cd91386a29403c78',

export default Roomster;