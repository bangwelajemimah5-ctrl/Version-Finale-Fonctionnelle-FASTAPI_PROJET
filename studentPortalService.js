import api from "./api";



// =========================================
// GET DOCUMENT TYPES
// =========================================

const getStudentDocumentTypes = async () => {

    const response = await api.get(

        "/student/document_types"
    );



    return response.data;
};



// =========================================
// CREATE REQUEST
// =========================================

const createStudentRequest = async (

    requestData

) => {

    const response = await api.post(

        "/student/document_requests",

        requestData
    );



    return response.data;
};



// =========================================
// GET REQUESTS
// =========================================

const getStudentRequests = async (

    studentId

) => {

    const response = await api.get(

        `/student/document_requests/${studentId}`
    );



    return response.data;
};



// =========================================
// CREATE PAYMENT
// =========================================

const createStudentPayment = async (

    paymentData

) => {

    const response = await api.post(

        "/student/payments",

        paymentData
    );



    return response.data;
};





export {

    getStudentDocumentTypes,

    createStudentRequest,

    getStudentRequests,

    createStudentPayment

};