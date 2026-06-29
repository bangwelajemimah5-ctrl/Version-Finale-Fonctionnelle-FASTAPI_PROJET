import api from "./api";



// =========================================
// GET DOCUMENT TYPES
// =========================================

export const getDocumentTypes = async () => {

    const response = await api.get(
        "/admin/document_types"
    );

    return response.data;
};



// =========================================
// CREATE DOCUMENT TYPE
// =========================================

export const createDocumentType = async (
    documentTypeData
) => {

    const response = await api.post(

        "/admin/document-types",

        documentTypeData

    );

    return response.data;
};



// =========================================
// UPDATE DOCUMENT TYPE
// =========================================

export const updateDocumentType = async (

    documentTypeId,

    documentTypeData

) => {

    const response = await api.put(

        `/admin/document-types/${documentTypeId}`,

        documentTypeData

    );



    return response.data;
};



// =========================================
// DELETE DOCUMENT TYPE
// =========================================

export const deleteDocumentType = async (
    documentTypeId
) => {

    const response = await api.delete(

        `/admin/document-types/${documentTypeId}`

    );



    return response.data;
};