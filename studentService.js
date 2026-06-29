import api from "./api";



// =========================================
// GET STUDENTS
// =========================================

export const getStudents = async () => {

    const response = await api.get(
        "/admin/students"
    );

    return response.data;
};



// =========================================
// CREATE STUDENT
// =========================================

export const createStudent = async (
    studentData
) => {

    const response = await api.post(

        "/admin/students",

        studentData

    );

    return response.data;
};



// =========================================
// DELETE STUDENT
// =========================================

export const deleteStudent = async (
    studentId
) => {

    const response = await api.delete(

        `/admin/students/${studentId}`

    );

    return response.data;
};
// =========================================
// UPDATE STUDENT
// =========================================

export const updateStudent = async (

    studentId,

    studentData

) => {

    const response = await api.put(

        `/admin/students/${studentId}`,

        studentData

    );



    return response.data;
};