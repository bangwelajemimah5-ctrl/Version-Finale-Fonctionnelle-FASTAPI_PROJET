import api from "./api";



// =========================================
// GET REQUESTS
// =========================================

export const getRequests = async () => {

    const response = await api.get(

        "/admin/requests"
    );



    return response.data;
};



// =========================================
// UPDATE REQUEST
// =========================================

export const updateRequest = async (

    requestId,

    requestData

) => {

    const response = await api.put(

        `/admin/requests/${requestId}`,

        requestData
    );



    return response.data;
};



// =========================================
// DELETE REQUEST
// =========================================

export const deleteRequest = async (

    requestId

) => {

    const response = await api.delete(

        `/admin/requests/${requestId}`
    );



    return response.data;
};