import {

    useEffect,

    useState

} from "react";



import api from "../services/api";





function PaymentPage() {

    // =========================================
    // STATES
    // =========================================

    const [payments,

        setPayments]

        = useState([]);





    // =========================================
    // FETCH PAYMENTS
    // =========================================

    const fetchPayments = async () => {

        try {

            const response = await api.get(

                "/payments"
            );



            setPayments(response.data);

        } catch (error) {

            console.error(error);
        }
    };





    useEffect(() => {

        fetchPayments();

    }, []);





    return (

        <main>

            <h1 className="
                text-4xl
                font-bold
                mb-6
            ">

                Payments

            </h1>





            <div className="
                card
                bg-base-100
                shadow-xl
            ">

                <div className="card-body">

                    <h2 className="
                        card-title
                    ">

                        All Payments

                    </h2>





                    <div className="
                        overflow-x-auto
                    ">

                        <table className="table">

                            <thead>

                                <tr>

                                    <th>ID</th>

                                    <th>Request ID</th>

                                    <th>Amount</th>

                                    <th>Payment Method</th>

                                </tr>

                            </thead>





                            <tbody>

                                {payments.map(

                                    (payment) => (

                                        <tr
                                            key={payment.id}
                                        >

                                            <td>

                                                {payment.id}

                                            </td>





                                            <td>

                                                {

                                                    payment.request_id

                                                }

                                            </td>





                                            <td>

                                                $

                                                {

                                                    payment.amount

                                                }

                                            </td>





                                            <td>

                                                {

                                                    payment.payment_method

                                                }

                                            </td>

                                        </tr>
                                    )
                                )}

                            </tbody>

                        </table>

                    </div>

                </div>

            </div>

        </main>
    );
}

export default PaymentPage;