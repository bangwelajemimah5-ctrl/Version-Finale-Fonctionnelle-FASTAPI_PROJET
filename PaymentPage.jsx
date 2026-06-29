import { useEffect, useState } from "react";
import api from "../services/api";

function PaymentPage() {
    // =========================================
    // STATES
    // =========================================
    const [payments, setPayments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // =========================================
    // FETCH PAYMENTS
    // =========================================
    const fetchPayments = async () => {
        try {
            setLoading(true);
            setError("");
            const response = await api.get("/admin/payments");
            
            if (Array.isArray(response.data)) {
                setPayments(response.data);
            } else {
                setPayments([]);
            }
        } catch (error) {
            console.error(error);
            setError("Impossible de récupérer la liste des paiements.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPayments();
    }, []);

    // =========================================
    // DELETE PAYMENT
    // =========================================
    const handleDeletePayment = async (paymentId) => {
        if (!window.confirm("Voulez-vous vraiment supprimer ce paiement ?")) return;
        
        try {
            await api.delete(`/admin/payments/${paymentId}`);
            alert("Payment deleted successfully");
            fetchPayments();
        } catch (error) {
            console.error(error);
            alert("Failed to delete payment");
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-base-200 flex items-center justify-center">
                <span className="loading loading-spinner loading-lg text-primary"></span>
            </div>
        );
    }

    return (
        <main className="min-h-screen bg-base-200 p-6">
            <div className="max-w-7xl mx-auto flex flex-col gap-8">

                {/* ========================================= */}
                {/* HEADER */}
                {/* ========================================= */}
                <div className="bg-gradient-to-r from-primary to-secondary text-white rounded-3xl shadow-2xl p-8">
                    <div className="flex flex-col gap-2">
                        <h1 className="text-5xl font-black">Payments</h1>
                        <p className="text-lg opacity-90">Manage all student payments.</p>
                    </div>
                </div>

                {/* ========================================= */}
                {/* PAYMENTS TABLE */}
                {/* ========================================= */}
                <div className="card bg-base-100 shadow-2xl rounded-3xl">
                    <div className="card-body">

                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-3xl font-bold">Payments List</h2>
                            <div className="badge badge-primary badge-lg font-bold">
                                {payments.length} Payments
                            </div>
                        </div>

                        {error && <div className="alert alert-error mb-4 font-medium">{error}</div>}

                        {payments.length === 0 ? (
                            <p className="text-gray-500 italic text-center py-6">Aucun paiement enregistré pour le moment.</p>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="table table-zebra w-full">
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Student</th>
                                            <th>Document</th>
                                            <th>Amount</th>
                                            <th>Method</th>
                                            <th>Status</th>
                                            <th>Date</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {payments.map((payment) => (
                                            <tr key={payment.id}>
                                                <td>
                                                    <span className="font-semibold">#{payment.id}</span>
                                                </td>
                                                <td>
                                                    <span className="badge badge-secondary font-medium">
                                                        {payment.student_name}
                                                    </span>
                                                </td>
                                                <td>
                                                    <span className="badge badge-accent font-medium">
                                                        {payment.document_name}
                                                    </span>
                                                </td>
                                                <td>
                                                    <span className="badge badge-success text-white font-bold">
                                                        {payment.amount} USD
                                                    </span>
                                                </td>
                                                <td>
                                                    <span className="badge badge-ghost font-medium">
                                                        {payment.payment_method}
                                                    </span>
                                                </td>
                                                <td>
                                                    <span className="badge badge-info font-bold">
                                                        {/* Statut calculé ou par défaut */}
                                                        {payment.status ? payment.status : "processing"}
                                                    </span>
                                                </td>
                                                <td className="opacity-70">
                                                    {payment.payment_date
                                                        ? new Date(payment.payment_date).toLocaleDateString("fr-FR")
                                                        : "N/A"}
                                                </td>
                                                <td>
                                                    <button
                                                        className="btn btn-error btn-sm rounded-xl text-white font-bold"
                                                        onClick={() => handleDeletePayment(payment.id)}
                                                    >
                                                        Delete
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}

                    </div>
                </div>

            </div>
        </main>
    );
}

export default PaymentPage;
