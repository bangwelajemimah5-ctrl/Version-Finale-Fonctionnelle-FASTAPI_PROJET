// import api from "./api";



// // =========================================
// // ADMIN LOGIN
// // =========================================

// const loginUser = async (

//     username,

//     password

// ) => {

//     const formData = new URLSearchParams();





//     formData.append(

//         "username",

//         username
//     );



//     formData.append(

//         "password",

//         password
//     );





//     const response = await api.post(

//         "/auth/login",

//         formData,

//         {

//             headers: {

//                 "Content-Type":

//                     "application/x-www-form-urlencoded"
//             }
//         }
//     );



//     return response.data;
// };





// export {

//     loginUser

// };
import api from "./api";

// =========================================
// ADMIN LOGIN
// =========================================
const loginUser = async (username, password) => {
    // On prépare les données au format 'x-www-form-urlencoded' 
    // que OAuth2PasswordRequestForm attend dans ton backend FastAPI
    const formData = new URLSearchParams();
    formData.append("username", username);
    formData.append("password", password);

    try {
        // CORRECTION : Appel de la route /admin/login 
        // Vérifie bien que ton api.js n'ajoute pas de préfixe parasite
        const response = await api.post("/admin/login", formData, {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        });

        // Si la connexion réussit, on retourne les données
        return response.data;
    } catch (error) {
        // Affiche l'erreur détaillée dans la console pour déboguer
        console.error("Erreur lors de la connexion:", error.response?.data || error.message);
        throw error;
    }
};

export {
    loginUser
};