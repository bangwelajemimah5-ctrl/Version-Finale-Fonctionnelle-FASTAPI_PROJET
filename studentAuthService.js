import api from "./api";



// =========================================
// STUDENT LOGIN
// =========================================

const studentLogin = async (

    studentNumber,

    password

) => {

    const response = await api.post(

        "/student/login",

        {

            student_number:

                studentNumber,

            password:

                password
        }
    );



    return response.data;
};





export {

    studentLogin

};