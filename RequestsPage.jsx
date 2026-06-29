// import { useEffect, useState } from "react";
// import { getRequests, updateRequest, deleteRequest } from "../services/requestService";

// function RequestsPage() {
//     // =========================================
//     // STATES
//     // =========================================
//     const [requests, setRequests] = useState([]);
//     const [editingRequestId, setEditingRequestId] = useState(null);
//     const [status, setStatus] = useState("");

//     // =========================================
//     // FETCH REQUESTS
//     // =========================================
//     const fetchRequests = async () => {
//         try {
//             const data = await getRequests();
//             setRequests(data);
//         } catch (error) {
//             console.error("Erreur lors de la récupération :", error);
//         }
//     };

//     useEffect(() => {
//         fetchRequests();
//     }, []);

//     // =========================================
//     // EDIT REQUEST
//     // =========================================
//     const handleEditRequest = (request) => {
//         setEditingRequestId(request.id);
//         setStatus(request.status);
//     };

   
//    // =========================================
// // UPDATE REQUEST
// // =========================================
// const handleUpdateRequest = async (request) => {
//     try {
//         // 1. Nettoyage de l'ID de la requête
//         const cleanId = parseInt(String(request.id).split(':')[0], 10);

//         // 2. Formatage de la date au format strict YYYY-MM-DD
//         let cleanDate = null;
//         if (request.request_date) {
//             cleanDate = String(request.request_date).split('T')[0];
//         }

//         // 3. Payload ultra-léger adapté à ton backend existant
//         const updatedPayload = {
//             reason: String(request.reason || ""),
//             status: String(status), // Reprend la valeur du select React
//             request_date: cleanDate
//         };

//         console.log("Payload allégé envoyé au backend :", updatedPayload);

//         // Envoi à l'API
//         await updateRequest(cleanId, updatedPayload);

//         alert("Request updated successfully");
//         setEditingRequestId(null);
//         setStatus("");
//         fetchRequests(); // Rafraîchit le tableau

//     } catch (error) {
//         console.error("Erreur lors de la mise à jour :", error);
        
//         if (error.response && error.response.data && error.response.data.detail) {
//             const details = error.response.data.detail;
//             const errorMessages = details.map(err => 
//                 `Champ [${err.loc.join('.')}] : ${err.msg}`
//             ).join('\n');
            
//             alert(`Erreur 422 (Validation Backend) :\n${errorMessages}`);
//         } else {
//             alert("Erreur lors de la mise à jour. Vérifie le serveur.");
//         }
//     }
// };

//     // =========================================
//     // DELETE REQUEST
//     // =========================================
//     const handleDeleteRequest = async (requestId) => {
//         try {
//             await deleteRequest(requestId);
//             fetchRequests();
//         } catch (error) {
//             console.error("Erreur lors de la suppression :", error);
//         }
//     };

//     return (
//         <main className="min-h-screen bg-base-200 p-6">
//             <div className="max-w-7xl mx-auto flex flex-col gap-8">

//                 {/* HEADER */}
//                 <div className="bg-gradient-to-r from-primary to-secondary text-white rounded-3xl shadow-2xl p-8">
//                     <div className="flex flex-col gap-2">
//                         <h1 className="text-5xl font-black">Requests</h1>
//                         <p className="text-lg opacity-90">Manage all document requests.</p>
//                     </div>
//                 </div>

//                 {/* REQUESTS TABLE */}
//                 <div className="card bg-base-100 shadow-2xl rounded-3xl">
//                     <div className="card-body">
//                         <div className="flex items-center justify-between mb-4">
//                             <h2 className="text-3xl font-bold">Requests List</h2>
//                             <div className="badge badge-primary badge-lg">
//                                 {requests.length} Requests
//                             </div>
//                         </div>

//                         <div className="overflow-x-auto">
//                             <table className="table table-zebra">
//                                 <thead>
//                                     <tr>
//                                         <th>ID</th>
//                                         <th>Student</th>
//                                         <th>Document</th>
//                                         <th>Reason</th>
//                                         <th>Status</th>
//                                         <th>Actions</th>
//                                     </tr>
//                                 </thead>

//                                 <tbody>
//                                     {requests.map((request) => (
//                                         <tr key={request.id}>
//                                             <td>{request.id}</td>
//                                             <td>
//                                                 <span className="badge badge-secondary">
//                                                     {request.student_name}
//                                                 </span>
//                                             </td>
//                                             <td>
//                                                 <span className="badge badge-accent">
//                                                     {request.document_name}
//                                                 </span>
//                                             </td>
//                                             <td className="max-w-xs truncate">
//                                                 {request.reason}
//                                             </td>
//                                             <td>
//                                                 {editingRequestId === request.id ? (
//                                                     <select
//                                                         className="select select-bordered select-sm"
//                                                         value={status}
//                                                         onChange={(e) => setStatus(e.target.value)}
//                                                     >
//                                                         <option value="pending">pending</option>
//                                                         <option value="approved">approved</option>
//                                                         <option value="rejected">rejected</option>
//                                                         <option value="ready">ready</option>
//                                                         <option value="delivered">delivered</option>
//                                                     </select>
//                                                 ) : (
//                                                     <span className={`badge ${
//                                                         request.status === "approved" ? "badge-success"
//                                                         : request.status === "rejected" ? "badge-error"
//                                                         : request.status === "pending" ? "badge-warning"
//                                                         : request.status === "ready" ? "badge-info"
//                                                         : "badge-success"
//                                                     }`}>
//                                                         {request.status}
//                                                     </span>
//                                                 )}
//                                             </td>
//                                             <td>
//                                                 <div className="flex gap-2">
//                                                     {editingRequestId === request.id ? (
//                                                         <button
//                                                             className="btn btn-success btn-sm rounded-xl"
//                                                             onClick={() => handleUpdateRequest(request)}
//                                                         >
//                                                             Save
//                                                         </button>
//                                                     ) : (
//                                                         <button
//                                                             className="btn btn-warning btn-sm rounded-xl"
//                                                             onClick={() => handleEditRequest(request)}
//                                                         >
//                                                             Edit
//                                                         </button>
//                                                     )}
//                                                     <button
//                                                         className="btn btn-error btn-sm rounded-xl"
//                                                         onClick={() => handleDeleteRequest(request.id)}
//                                                     >
//                                                         Delete
//                                                     </button>
//                                                 </div>
//                                             </td>
//                                         </tr>
//                                     ))}
//                                 </tbody>
//                             </table>
//                         </div>

//                     </div>
//                 </div>

//             </div>
//         </main>
//     );
// }

// export default RequestsPage;
import { useEffect, useState } from "react";
import { getRequests, updateRequest, deleteRequest } from "../services/requestService";

function RequestsPage() {
    // =========================================
    // STATES
    // =========================================
    const [requests, setRequests] = useState([]);
    const [editingRequestId, setEditingRequestId] = useState(null);
    const [status, setStatus] = useState("");

    // =========================================
    // FETCH REQUESTS
    // =========================================
    const fetchRequests = async () => {
        try {
            const data = await getRequests();
            setRequests(data);
        } catch (error) {
            console.error("Erreur lors de la récupération :", error);
        }
    };

    useEffect(() => {
        fetchRequests();
    }, []);

    // =========================================
    // EDIT REQUEST
    // =========================================
    const handleEditRequest = (request) => {
        setEditingRequestId(request.id);
        setStatus(request.status);
    };

    // =========================================
    // UPDATE REQUEST
   // =========================================

const handleUpdateRequest = async (request) => {
    try {
        const cleanId = parseInt(String(request.id).split(':')[0], 10);


        const updatedPayload = {
            student_id: request.student_id ? Number(request.student_id) : cleanId, 
            document_type_id: request.document_type_id ? Number(request.document_type_id) : cleanId,
            reason: String(request.reason || ""),
            status: String(status) // Notre select avec "ready", "rejected", etc.
        };

        console.log("Payload avec IDs forcés envoyé au backend :", updatedPayload);

        await updateRequest(cleanId, updatedPayload);

        alert("Request updated successfully");
        setEditingRequestId(null);
        setStatus("");
        fetchRequests(); 

    } catch (error) {
        console.error("Erreur lors de la mise à jour :", error);
        
        if (error.response && error.response.data && error.response.data.detail) {
            const details = error.response.data.detail;
            const errorMessages = details.map(err => 
                `Champ [${err.loc.join('.')}] : ${err.msg}`
            ).join('\n');
            
            alert(`Erreur 422 (Validation Backend) :\n${errorMessages}`);
        } else {
            alert("Erreur lors de la mise à jour. Vérifie le serveur.");
        }
    }
};
    // =========================================
    // DELETE REQUEST
    // =========================================
    const handleDeleteRequest = async (requestId) => {
        try {
            await deleteRequest(requestId);
            fetchRequests();
        } catch (error) {
            console.error("Erreur lors de la suppression :", error);
        }
    };

    return (
        <main className="min-h-screen bg-base-200 p-6">
            <div className="max-w-7xl mx-auto flex flex-col gap-8">

                {/* HEADER */}
                <div className="bg-gradient-to-r from-primary to-secondary text-white rounded-3xl shadow-2xl p-8">
                    <div className="flex flex-col gap-2">
                        <h1 className="text-5xl font-black">Requests</h1>
                        <p className="text-lg opacity-90">Manage all document requests.</p>
                    </div>
                </div>

                {/* REQUESTS TABLE */}
                <div className="card bg-base-100 shadow-2xl rounded-3xl">
                    <div className="card-body">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-3xl font-bold">Requests List</h2>
                            <div className="badge badge-primary badge-lg">
                                {requests.length} Requests
                            </div>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="table table-zebra">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Student</th>
                                        <th>Document</th>
                                        <th>Reason</th>
                                        <th>Status</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {requests.map((request) => (
                                        <tr key={request.id}>
                                            <td>{request.id}</td>
                                            <td>
                                                <span className="badge badge-secondary">
                                                    {request.student_name}
                                                </span>
                                            </td>
                                            <td>
                                                <span className="badge badge-accent">
                                                    {request.document_name}
                                                </span>
                                            </td>
                                            <td className="max-w-xs truncate">
                                                {request.reason}
                                            </td>
                                            <td>
                                                {editingRequestId === request.id ? (
                                                    <select
                                                        className="select select-bordered select-sm"
                                                        value={status}
                                                        onChange={(e) => setStatus(e.target.value)}
                                                    >
                                                        <option value="pending">pending</option>
                                                        <option value="approved">approved</option>
                                                        <option value="rejected">rejected</option>
                                                        <option value="ready">ready</option>
                                                        <option value="delivered">delivered</option>
                                                    </select>
                                                ) : (
                                                    <span className={`badge ${
                                                        request.status === "approved" ? "badge-success"
                                                        : request.status === "rejected" ? "badge-error"
                                                        : request.status === "pending" ? "badge-warning"
                                                        : request.status === "ready" ? "badge-info"
                                                        : "badge-success"
                                                    }`}>
                                                        {request.status}
                                                    </span>
                                                )}
                                            </td>
                                            <td>
                                                <div className="flex gap-2">
                                                    {editingRequestId === request.id ? (
                                                        <button
                                                            className="btn btn-success btn-sm rounded-xl"
                                                            onClick={() => handleUpdateRequest(request)}
                                                        >
                                                            Save
                                                        </button>
                                                    ) : (
                                                        <button
                                                            className="btn btn-warning btn-sm rounded-xl"
                                                            onClick={() => handleEditRequest(request)}
                                                        >
                                                            Edit
                                                        </button>
                                                    )}
                                                    <button
                                                        className="btn btn-error btn-sm rounded-xl"
                                                        onClick={() => handleDeleteRequest(request.id)}
                                                    >
                                                        Delete
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                    </div>
                </div>

            </div>
        </main>
    );
}

export default RequestsPage;