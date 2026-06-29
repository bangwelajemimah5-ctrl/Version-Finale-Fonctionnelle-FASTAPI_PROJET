import api from "./api";



export const getStudentRequests = async () => {

    const token = localStorage.getItem("token");

    const response = await api.get(
        "/admin/document_requests",
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    return response.data;
};





export const createStudentRequest = async (
    requestData
) => {

    const token = localStorage.getItem("token");

    const response = await api.post(
        "/admin/document_requests",
        requestData,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    return response.data;
};