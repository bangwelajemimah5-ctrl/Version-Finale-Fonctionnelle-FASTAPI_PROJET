import {

    Link,

    Outlet,

    useNavigate

} from "react-router-dom";





function AdminLayout() {

    const navigate = useNavigate();





    // =========================================
    // LOGOUT
    // =========================================

    const handleLogout = () => {

        localStorage.removeItem(

            "token"
        );



        navigate("/");
    };





    return (

        <main className="
            min-h-screen
            bg-base-200
        ">





            {/* ========================================= */}
            {/* NAVBAR */}
            {/* ========================================= */}

            <div className="
                navbar
                bg-base-100
                shadow-2xl
                px-8
                sticky
                top-0
                z-50
            ">

                <div className="flex-1">

                    <div>

                        <h1 className="
                            text-2xl
                            font-black
                        ">

                            Admin Panel

                        </h1>





                        <p className="
                            text-sm
                            opacity-60
                        ">

                            Academic Document Manager

                        </p>

                    </div>

                </div>





                <div className="
                    flex
                    items-center
                    gap-3
                    flex-wrap
                ">

                    <Link
                        to="/admin/dashboard"
                        className="
                            btn
                            btn-ghost
                            rounded-xl
                        "
                    >

                        Dashboard

                    </Link>





                    <Link
                        to="/admin/students"
                        className="
                            btn
                            btn-ghost
                            rounded-xl
                        "
                    >

                        Students

                    </Link>





                    <Link
                        to="/admin/document-types"
                        className="
                            btn
                            btn-ghost
                            rounded-xl
                        "
                    >

                        Documents

                    </Link>





                    <Link
                        to="/admin/requests"
                        className="
                            btn
                            btn-ghost
                            rounded-xl
                        "
                    >

                        Requests

                    </Link>





                    <Link
                        to="/admin/payments"
                        className="
                            btn
                            btn-ghost
                            rounded-xl
                        "
                    >

                        Payments

                    </Link>





                    <button
                        onClick={handleLogout}
                        className="
                            btn
                            btn-error
                            rounded-xl
                        "
                    >

                        Logout

                    </button>

                </div>

            </div>





            {/* ========================================= */}
            {/* PAGE CONTENT */}
            {/* ========================================= */}

            <div className="
                p-6
                md:p-8
                max-w-7xl
                mx-auto
            ">

                <Outlet />

            </div>

        </main>
    );
}

export default AdminLayout;