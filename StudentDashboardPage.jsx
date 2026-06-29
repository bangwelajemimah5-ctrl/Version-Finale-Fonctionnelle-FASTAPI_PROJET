import NotificationBell from "../components/NotificationBell";
import api from "../services/api";
import {

    useEffect,

    useState

} from "react";



import {

    getStudentDocumentTypes,

    createStudentRequest,

    getStudentRequests,

    createStudentPayment

} from "../services/studentPortalService";





function StudentDashboardPage() {

    // =========================================
    // STATES
    // =========================================

    const [documentTypes,

        setDocumentTypes]

        = useState([]);





    const [requests,

        setRequests]

        = useState([]);





    const [documentTypeId,

        setDocumentTypeId]

        = useState("");





    const [reason,

        setReason]

        = useState("");





    const [requestId,

        setRequestId]

        = useState("");





    const [method,

        setMethod]

        = useState("");

    const [payments,

    setPayments]

    = useState([]);

    // =========================================
    // AUTO STUDENT ID
    // =========================================

    const studentId = localStorage.getItem(

        "student_id"
    );





    // =========================================
    // FETCH DOCUMENT TYPES
    // =========================================

    const fetchDocumentTypes = async () => {

        try {

            const data = await

                getStudentDocumentTypes();



            setDocumentTypes(data);

        } catch (error) {

            console.error(error);
        }
    };





    // =========================================
    // FETCH REQUESTS
    // =========================================

    const fetchRequests = async () => {

        if (!studentId) return;



        try {

            const data = await

                getStudentRequests(studentId);



            setRequests(data);

        } catch (error) {

            console.error(error);
        }
    };


  //=========================================
    // FETCH PAYMENTS
    //=========================================
    const fetchPayments = async () => {
        try {
            const studentId = localStorage.getItem("student_id");
            if (!studentId) return;

            // URL CORRIGÉE : suppression du /student en double
            const response = await api.get(`/student/payments/${studentId}`);
            
            console.log("Données reçues du serveur :", response.data);
            
            // Vérification de sécurité avant de mettre à jour l'état
            if (Array.isArray(response.data)) {
                setPayments(response.data);
            } else {
                console.error("Le format reçu n'est pas une liste :", response.data);
            }
        } catch (error) {
            console.error("Erreur lors de la récupération des paiements :", error);
        }
    };


    // =========================================
    // USE EFFECT
    // =========================================

    useEffect(() => {

        fetchDocumentTypes();

        fetchRequests();
        fetchPayments();
    }, []);





    // =========================================
    // CREATE REQUEST
    // =========================================

    const handleCreateRequest = async (

        e

    ) => {

        e.preventDefault();



        try {

            const requestData = {

                student_id:

                    Number(studentId),

                document_type_id:

                    Number(documentTypeId),

                reason: reason,

                status: "pending"
            };





            await createStudentRequest(

                requestData
            );



            alert(

                "Request created successfully"
            );





            fetchRequests();





            setDocumentTypeId("");

            setReason("");



        } catch (error) {

            console.error(error);
        }
    };





// =========================================
    // CREATE PAYMENT (FINAL)
    // =========================================
  const handleCreatePayment = async (e) => {
    e.preventDefault();

    try {
        // Le Backend ira chercher le prix dans la table 'DocumentType'
        // Nous n'envoyons plus 'amount' ici.
        const paymentData = {
            document_request_id: Number(requestId),
            payment_method: method
        };

        await createStudentPayment(paymentData);

        // Rafraîchissement des données
        fetchPayments();
        fetchRequests();

        alert("Paiement effectué avec succès !");

        // Réinitialisation du formulaire
        setRequestId("");
        setMethod("");
    } catch (error) {
        // En cas d'erreur 422 ou 400, l'alerte préviendra l'étudiant
        console.error("Détail de l'erreur :", error.response?.data);
        alert("Erreur lors de la création du paiement.");
    }
};

    return (

        <main className="
            flex
            flex-col
            gap-8
        ">





   {/* ========================================= */}
{/* HERO */}
{/* ========================================= */}

<div className="
    bg-linear-to-r
    from-primary
    to-secondary
    text-white
    rounded-3xl
    shadow-2xl
    p-8
    lg:p-10
">

    <div className="
        flex
        items-center
        justify-between
    ">

        <div className="flex flex-col gap-3">

            <h1 className="
                text-5xl
                font-black
                tracking-tight
            ">
                Tableau de bord étudiant
            </h1>

            <p className="
                text-lg
                opacity-90
                max-w-2xl
            ">
                Manage your academic document
                requests and payments easily.
            </p>

        </div>

        {/* ✅ CLOCHE DE NOTIFICATIONS */}
        <NotificationBell studentId={studentId} />

    </div>

</div>






            {/* ========================================= */}
            {/* REQUEST + PAYMENT */}
            {/* ========================================= */}

            <div className="
                grid
                grid-cols-1
                xl:grid-cols-2
                gap-8
            ">





                {/* ========================================= */}
                {/* CREATE REQUEST */}
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

                            Create Request

                        </h2>





                        <form
                            onSubmit={
                                handleCreateRequest
                            }
                            className="
                                flex
                                flex-col
                                gap-4
                            "
                        >

                            <select
                                className="
                                    select
                                    select-bordered
                                    w-full
                                "
                                value={documentTypeId}
                                onChange={(e) =>

                                    setDocumentTypeId(
                                        e.target.value
                                    )
                                }
                            >

                                <option value="">

                                    Select Document

                                </option>





                                {documentTypes.map(

                                    (doc) => (

                                        <option
                                            key={doc.id}
                                            value={doc.id}
                                        >

                                            {doc.name}

                                            {" - $"}

                                            {doc.price}

                                        </option>
                                    )
                                )}

                            </select>





                            <textarea
                                placeholder="Reason"
                                className="
                                    textarea
                                    textarea-bordered
                                    min-h-32
                                "
                                value={reason}
                                onChange={(e) =>

                                    setReason(
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

                                Create Request

                            </button>

                        </form>

                    </div>

                </div>
{/* ========================================= */}
{/* CREATE PAYMENT (FORMULAIRE ORIGINAL) */}
{/* ========================================= */}
<div className="card bg-base-100 shadow-2xl rounded-3xl">
    <div className="card-body gap-5">
        <h2 className="text-3xl font-bold">Effectuer un paiement</h2>

        <form onSubmit={handleCreatePayment} className="flex flex-col gap-4">
            {/* 1. Sélection de la requête */}
            <select
                className="select select-bordered w-full"
                value={requestId}
                onChange={(e) => setRequestId(e.target.value)}
                required
            >
                <option value="">Sélectionnez une requête</option>
                {requests.map((request) => (
                    <option key={request.id} value={request.id}>
                        Requête #{request.id}
                    </option>
                ))}
            </select>

            {/* 2. Sélection de la méthode (Liste déroulante) */}
           <select
           className="select select-bordered w-full"
           value={method}
           onChange={(e) => setMethod(e.target.value)}
           required
        >
         <option value="" disabled>Sélectionnez une méthode de paiement</option>
         <option value="Cash">Cash</option>
         <option value="Mobile Money">Mobile Money</option>
         <option value="Card">Card</option>
            </select>

            {/* 3. Bouton de validation */}
            <button
                type="submit"
                className="btn btn-success rounded-xl"
            >
                Create Payment
            </button>
        </form>
     </div>
    </div>
 </div>


            {/* ========================================= */}
            {/* REQUESTS TABLE */}
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

                            My Requests

                        </h2>


                        <div className="
                            badge
                            badge-primary
                            badge-lg
                        ">

                            {

                                requests.length

                            } Requests

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
            <th>Document</th>
            <th>Reason</th>
            <th>Status</th>
            <th>Date</th>
            <th>Download</th>
        </tr>
    </thead>
<tbody>
        {requests.map((request) => (
            <tr key={request.id}>
                <td>{request.id}</td>
                <td>{request.document_name}</td>
                <td>{request.reason}</td>
                <td>
                    <span className={`badge ${
                        request.status === "approved" ? "badge-success" :
                        request.status === "rejected" ? "badge-error" :
                        request.status === "processing" ? "badge-info" : "badge-warning"
                    }`}>
                        {request.status}
                    </span>
                </td>
                {/* 2. Ajout de la cellule de date */}
                <td>
                    {request.request_date 
                        ? new Date(request.request_date).toLocaleDateString() 
                        : "N/A"}
                </td>
                <td>
                    {request.status === "delivered" ? (
                        <button className="btn btn-success btn-sm rounded-xl">Download</button>
                    ) : (
                        <span className="text-gray-400">Not Available</span>
                    )}
                </td>
            </tr>
        ))}
    </tbody>
</table>

                    </div>

                </div>

            </div>
            <div className="
    card
    bg-base-100
    shadow-xl
    mt-8
">

<div className="card-body">
    <h2 className="text-3xl font-bold mb-4">My Payments</h2>
    <div className="overflow-x-auto">
       <table className="table table-zebra">
    <thead>
        <tr><th>ID</th><th>Document</th><th>Amount</th><th>Method</th><th>Date</th></tr>
    </thead>
    <tbody>
        {payments.map((payment) => (
            <tr key={payment.id}>
                <td>{payment.id}</td>
                <td>{payment.document_name}</td>
                <td>{payment.amount ? `$${payment.amount}` : "N/A"}</td>
                <td>
    <span className={`badge ${
        payment.payment_method === "Cash" ? "badge-neutral" : 
        payment.payment_method === "Mobile Money" ? "badge-primary" : 
        payment.payment_method === "Card" ? "badge-secondary" : "badge-ghost"
    }`}>
        {payment.payment_method}
    </span>
</td>
                <td>
                    {payment.payment_date 
                        ? new Date(payment.payment_date).toLocaleDateString() 
                        : "N/A"}
                </td>
            </tr>
        ))}
    </tbody>
</table>
    </div>
</div>

</div>

        </main>
    );
}

export default StudentDashboardPage;