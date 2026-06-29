// function DashboardPage() {

//     return (

//         <main className="
//             min-h-screen
//             bg-base-200
//             p-6
//         ">

//             <div className="
//                 max-w-7xl
//                 mx-auto
//                 flex
//                 flex-col
//                 gap-8
//             ">





//                 {/* ========================================= */}
//                 {/* HEADER */}
//                 {/* ========================================= */}

//                 <div className="
//                     bg-gradient-to-r
//                     from-primary
//                     to-secondary
//                     text-white
//                     rounded-3xl
//                     shadow-2xl
//                     p-8
//                 ">

//                     <div className="
//                         flex
//                         flex-col
//                         gap-3
//                     ">

//                         <h1 className="
//                             text-5xl
//                             font-black
//                         ">

//                             Admin Dashboard

//                         </h1>





//                         <p className="
//                             text-lg
//                             opacity-90
//                         ">

//                             Welcome to Academic Document Manager.

//                         </p>

//                     </div>

//                 </div>





//                 {/* ========================================= */}
//                 {/* QUICK STATS */}
//                 {/* ========================================= */}

//                 <div className="
//                     grid
//                     grid-cols-1
//                     md:grid-cols-2
//                     xl:grid-cols-4
//                     gap-6
//                 ">

//                     <div className="
//                         card
//                         bg-base-100
//                         shadow-2xl
//                         rounded-3xl
//                     ">

//                         <div className="
//                             card-body
//                             gap-3
//                         ">

//                             <div className="
//                                 flex
//                                 items-center
//                                 justify-between
//                             ">

//                                 <h2 className="
//                                     text-xl
//                                     font-bold
//                                 ">

//                                     Students

//                                 </h2>





//                                 <div className="
//                                     badge
//                                     badge-primary
//                                     badge-lg
//                                 ">

//                                     CRUD

//                                 </div>

//                             </div>





//                             <p className="
//                                 opacity-70
//                             ">

//                                 Manage all registered students.

//                             </p>





//                             <button className="
//                                 btn
//                                 btn-primary
//                                 rounded-xl
//                                 mt-3
//                             ">

//                                 Open Students

//                             </button>

//                         </div>

//                     </div>





//                     <div className="
//                         card
//                         bg-base-100
//                         shadow-2xl
//                         rounded-3xl
//                     ">

//                         <div className="
//                             card-body
//                             gap-3
//                         ">

//                             <div className="
//                                 flex
//                                 items-center
//                                 justify-between
//                             ">

//                                 <h2 className="
//                                     text-xl
//                                     font-bold
//                                 ">

//                                     Documents

//                                 </h2>





//                                 <div className="
//                                     badge
//                                     badge-secondary
//                                     badge-lg
//                                 ">

//                                     Types

//                                 </div>

//                             </div>





//                             <p className="
//                                 opacity-70
//                             ">

//                                 Manage document types and prices.

//                             </p>





//                             <button className="
//                                 btn
//                                 btn-secondary
//                                 rounded-xl
//                                 mt-3
//                             ">

//                                 Open Documents

//                             </button>

//                         </div>

//                     </div>





//                     <div className="
//                         card
//                         bg-base-100
//                         shadow-2xl
//                         rounded-3xl
//                     ">

//                         <div className="
//                             card-body
//                             gap-3
//                         ">

//                             <div className="
//                                 flex
//                                 items-center
//                                 justify-between
//                             ">

//                                 <h2 className="
//                                     text-xl
//                                     font-bold
//                                 ">

//                                     Requests

//                                 </h2>





//                                 <div className="
//                                     badge
//                                     badge-warning
//                                     badge-lg
//                                 ">

//                                     Pending

//                                 </div>

//                             </div>





//                             <p className="
//                                 opacity-70
//                             ">

//                                 Review and validate requests.

//                             </p>





//                             <button className="
//                                 btn
//                                 btn-warning
//                                 rounded-xl
//                                 mt-3
//                             ">

//                                 Open Requests

//                             </button>

//                         </div>

//                     </div>





//                     <div className="
//                         card
//                         bg-base-100
//                         shadow-2xl
//                         rounded-3xl
//                     ">

//                         <div className="
//                             card-body
//                             gap-3
//                         ">

//                             <div className="
//                                 flex
//                                 items-center
//                                 justify-between
//                             ">

//                                 <h2 className="
//                                     text-xl
//                                     font-bold
//                                 ">

//                                     Payments

//                                 </h2>





//                                 <div className="
//                                     badge
//                                     badge-success
//                                     badge-lg
//                                 ">

//                                     Finance

//                                 </div>

//                             </div>





//                             <p className="
//                                 opacity-70
//                             ">

//                                 Track and validate payments.

//                             </p>





//                             <button className="
//                                 btn
//                                 btn-success
//                                 rounded-xl
//                                 mt-3
//                             ">

//                                 Open Payments

//                             </button>

//                         </div>

//                     </div>

//                 </div>





//                 {/* ========================================= */}
//                 {/* SYSTEM OVERVIEW */}
//                 {/* ========================================= */}

//                 <div className="
//                     card
//                     bg-base-100
//                     shadow-2xl
//                     rounded-3xl
//                 ">

//                     <div className="
//                         card-body
//                         gap-5
//                     ">

//                         <h2 className="
//                             text-3xl
//                             font-bold
//                         ">

//                             System Overview

//                         </h2>





//                         <div className="
//                             grid
//                             grid-cols-1
//                             md:grid-cols-2
//                             gap-6
//                         ">

//                             <div className="
//                                 p-6
//                                 rounded-2xl
//                                 bg-base-200
//                             ">

//                                 <h3 className="
//                                     text-xl
//                                     font-bold
//                                     mb-2
//                                 ">

//                                     Academic Management

//                                 </h3>





//                                 <p className="
//                                     opacity-70
//                                     leading-relaxed
//                                 ">

//                                     Manage students, academic documents,
//                                     requests and payments through one
//                                     centralized dashboard.

//                                 </p>

//                             </div>





//                             <div className="
//                                 p-6
//                                 rounded-2xl
//                                 bg-base-200
//                             ">

//                                 <h3 className="
//                                     text-xl
//                                     font-bold
//                                     mb-2
//                                 ">

//                                     Secure Workflow

//                                 </h3>





//                                 <p className="
//                                     opacity-70
//                                     leading-relaxed
//                                 ">

//                                     Track requests from creation to
//                                     delivery with status updates and
//                                     payment validation.

//                                 </p>

//                             </div>

//                         </div>

//                     </div>

//                 </div>

//             </div>

//         </main>
//     );
// }

// export default DashboardPage;
import AdminStats from "../components/AdminStats";

function DashboardPage() {

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
                {/* HEADER */}
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
                        gap-3
                    ">
                        <h1 className="
                            text-5xl
                            font-black
                        ">
                            Admin Dashboard
                        </h1>
                        <p className="
                            text-lg
                            opacity-90
                        ">
                            Welcome to Academic Document Manager.
                        </p>
                    </div>
                </div>

                {/* ========================================= */}
                {/* STATISTIQUES - NOUVEAU MODULE */}
                {/* ========================================= */}

                <AdminStats />

                {/* QUICK STATS */}
                <div className="
                    grid
                    grid-cols-1
                    md:grid-cols-2
                    xl:grid-cols-4
                    gap-6
                ">
                    {/* ... le reste des 4 cartes ... */}
                </div>

                {/* SYSTEM OVERVIEW */}
                {/* ... le reste ... */}

            </div>
        </main>
    );
}

export default DashboardPage;