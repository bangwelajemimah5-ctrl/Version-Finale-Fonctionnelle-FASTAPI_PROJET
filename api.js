// import axios from "axios";



// const api = axios.create({

//     baseURL:

//         "http://127.0.0.1:8000"
// });





// // =========================================
// // REQUEST INTERCEPTOR
// // =========================================

// api.interceptors.request.use(

//     (config) => {

//         // =========================================
//         // ADMIN TOKEN
//         // =========================================

//         const token = localStorage.getItem(

//             "token"
//         );





//         // =========================================
//         // STUDENT TOKEN
//         // =========================================

//         const studentToken = localStorage.getItem(

//             "student_token"
//         );





//         // =========================================
//         // ADMIN ROUTES
//         // =========================================

//         if (

//             config.url.startsWith(

//                 "/admin"

//             ) && token

//         ) {

//             config.headers.Authorization =

//                 `Bearer ${token}`;
//         }





//         // =========================================
//         // STUDENT ROUTES
//         // =========================================

//         if (

//             config.url.startsWith(

//                 "/student"

//             ) && studentToken

//         ) {

//             config.headers.Authorization =

//                 `Bearer ${studentToken}`;
//         }





//         return config;
//     }
// );





// export default api;
import axios from "axios";

const api = axios.create({
    baseURL: "http://127.0.0.1:8000"
});

api.interceptors.request.use((config) => {
    // 1. Liste des routes à ignorer (pas besoin de token pour se connecter)
    const publicRoutes = ["/admin/login", "/student/login", "/auth/register"];
    
    // Si on est sur une route publique, on laisse passer sans header Authorization
    if (publicRoutes.includes(config.url)) {
        return config;
    }

    // 2. Gestion ADMIN
    const token = localStorage.getItem("token");
    if (config.url.startsWith("/admin") && token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    // 3. Gestion ÉTUDIANT
    const studentToken = localStorage.getItem("student_token");
    if (config.url.startsWith("/student") && studentToken) {
        config.headers.Authorization = `Bearer ${studentToken}`;
    }

    return config;
});

export default api;