import {

    useEffect,

    useState

} from "react";



import {

    getDocumentTypes,

    createDocumentType,

    updateDocumentType,

    deleteDocumentType,

} from "../services/documentTypeService";





function DocumentTypesPage() {

    // =========================================
    // STATES
    // =========================================

    const [documentTypes,

        setDocumentTypes]

        = useState([]);





    const [name,

        setName]

        = useState("");





    const [description,

        setDescription]

        = useState("");





    const [price,

        setPrice]

        = useState("");





    const [editingDocumentTypeId,

        setEditingDocumentTypeId]

        = useState(null);





    // =========================================
    // FETCH DOCUMENT TYPES
    // =========================================

    const fetchDocumentTypes = async () => {

        try {

            const data = await getDocumentTypes();
            


            setDocumentTypes(data);



        } catch (error) {

            console.error(error);
        }
    };





    useEffect(() => {

        fetchDocumentTypes();

    }, []);





    // =========================================
    // CREATE OR UPDATE DOCUMENT TYPE
    // =========================================

    const handleCreateDocumentType = async (

        e

    ) => {

        e.preventDefault();



        try {

            const documentTypeData = {

                name: name,

                description: description,

                price: parseInt(price),
            };





            if (

                editingDocumentTypeId !== null

            ) {

                await updateDocumentType(

                    editingDocumentTypeId,

                    documentTypeData
                );



                alert(

                    "Document type updated"
                );



            } else {

                await createDocumentType(

                    documentTypeData
                );



                alert(

                    "Document type created"
                );
            }





            fetchDocumentTypes();





            setName("");

            setDescription("");

            setPrice("");





            setEditingDocumentTypeId(

                null
            );



        } catch (error) {

            console.error(error);



            alert(

                error.response?.data?.detail ||

                "Operation failed"
            );
        }
    };





    // =========================================
    // EDIT DOCUMENT TYPE
    // =========================================

    const handleEditDocumentType = (

        documentType

    ) => {

        setEditingDocumentTypeId(

            documentType.id
        );



        setName(

            documentType.name
        );



        setDescription(

            documentType.description
        );



        setPrice(

            documentType.price
        );
    };





    // =========================================
    // DELETE DOCUMENT TYPE
    // =========================================

    const handleDeleteDocumentType = async (

        documentTypeId

    ) => {

        try {

            await deleteDocumentType(

                documentTypeId
            );



            fetchDocumentTypes();



        } catch (error) {

            console.error(error);
        }
    };





    return (

        <main className="
            min-h-screen
            bg-base-200
            p-6
        ">

            <div className="
                max-w-7xl
                mx-auto
                flex
                flex-col
                gap-8
            ">





                {/* ========================================= */}
                {/* HEADER */}
                {/* ========================================= */}

                <div className="
                    bg-gradient-to-r
                    from-primary
                    to-secondary
                    text-white
                    rounded-3xl
                    shadow-2xl
                    p-8
                ">

                    <div className="
                        flex
                        flex-col
                        gap-2
                    ">

                        <h1 className="
                            text-5xl
                            font-black
                        ">

                            Document Types

                        </h1>





                        <p className="
                            text-lg
                            opacity-90
                        ">

                            Manage academic document types and prices.

                        </p>

                    </div>

                </div>

                {/* ========================================= */}
                {/* CREATE / UPDATE FORM */}
                {/* ========================================= */}

                <div className="
                    card
                    bg-base-100
                    shadow-2xl
                    rounded-3xl
                ">

                    <div className="
                        card-body
                        gap-5
                    ">

                        <h2 className="
                            text-3xl
                            font-bold
                        ">

                            {

                                editingDocumentTypeId !==

                                null

                                    ? "Update Document Type"

                                    : "Create Document Type"
                            }

                        </h2>





                        <form
                            onSubmit={
                                handleCreateDocumentType
                            }
                            className="
                                grid
                                grid-cols-1
                                md:grid-cols-2
                                gap-4
                            "
                        >

                            <input
                                type="text"
                                placeholder="Document Name"
                                className="
                                    input
                                    input-bordered
                                    w-full
                                "
                                value={name}
                                onChange={(e) =>
                                    setName(
                                        e.target.value
                                    )
                                }
                            />





                            <input
                                type="text"
                                placeholder="Description"
                                className="
                                    input
                                    input-bordered
                                    w-full
                                "
                                value={description}
                                onChange={(e) =>
                                    setDescription(
                                        e.target.value
                                    )
                                }
                            />





                            <input
                                type="number"
                                placeholder="Price"
                                className="
                                    input
                                    input-bordered
                                    w-full
                                "
                                value={price}
                                onChange={(e) =>
                                    setPrice(
                                        e.target.value
                                    )
                                }
                            />





                            <button
                                type="submit"
                                className="
                                    btn
                                    btn-primary
                                    rounded-xl
                                "
                            >

                                {

                                    editingDocumentTypeId !==

                                    null

                                        ? "Update Document"

                                        : "Create Document"
                                }

                            </button>

                        </form>

                    </div>

                </div>





                {/* ========================================= */}
                {/* DOCUMENT TYPES TABLE */}
                {/* ========================================= */}

                <div className="
                    card
                    bg-base-100
                    shadow-2xl
                    rounded-3xl
                ">

                    <div className="card-body">

                        <div className="
                            flex
                            items-center
                            justify-between
                            mb-4
                        ">

                            <h2 className="
                                text-3xl
                                font-bold
                            ">

                                Documents List

                            </h2>





                            <div className="
                                badge
                                badge-primary
                                badge-lg
                            ">

                                {

                                    documentTypes.length
                                }

                                {" "}Documents

                            </div>

                        </div>





                        <div className="
                            overflow-x-auto
                        ">

                            <table className="
                                table
                                table-zebra
                            ">

                                <thead>

                                    <tr>

                                        <th>ID</th>

                                        <th>Name</th>

                                        <th>Description</th>

                                        <th>Price</th>

                                        <th>Actions</th>

                                    </tr>

                                </thead>





                                <tbody>

                                    {documentTypes.map(

                                        (documentType) => (

                                            <tr
                                                key={documentType.id}
                                            >

                                                <td>

                                                    {

                                                        documentType.id
                                                    }

                                                </td>





                                                <td>

                                                    <div className="
                                                        font-semibold
                                                    ">

                                                        {

                                                            documentType.name
                                                        }

                                                    </div>

                                                </td>





                                                <td className="
                                                    max-w-xs
                                                    truncate
                                                ">

                                                    {

                                                        documentType.description
                                                    }

                                                </td>





                                                <td>

                                                    <span
                                                        className="
                                                            badge
                                                            badge-success
                                                            badge-lg
                                                        "
                                                    >

                                                        {

                                                            documentType.price
                                                        }$

                                                    </span>

                                                </td>





                                                <td>

                                                    <div className="
                                                        flex
                                                        gap-2
                                                    ">

                                                        <button
                                                            type="button"
                                                            className="
                                                                btn
                                                                btn-warning
                                                                btn-sm
                                                                rounded-xl
                                                            "
                                                            onClick={() =>
                                                                handleEditDocumentType(
                                                                    documentType
                                                                )
                                                            }
                                                        >

                                                            Edit

                                                        </button>





                                                        <button
                                                            type="button"
                                                            className="
                                                                btn
                                                                btn-error
                                                                btn-sm
                                                                rounded-xl
                                                            "
                                                            onClick={() =>
                                                                handleDeleteDocumentType(
                                                                    documentType.id
                                                                )
                                                            }
                                                        >

                                                            Delete

                                                        </button>

                                                    </div>

                                                </td>

                                            </tr>
                                        )
                                    )}

                                </tbody>

                            </table>

                        </div>

                    </div>

                </div>

            </div>

        </main>
    );
}

export default DocumentTypesPage;