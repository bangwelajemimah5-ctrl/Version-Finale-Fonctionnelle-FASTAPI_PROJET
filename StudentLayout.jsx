import {

    Link,

    Outlet,

    useNavigate,

    useLocation

} from "react-router-dom";





function StudentLayout() {

    const navigate = useNavigate();

    const location = useLocation();





    // =========================================
    // LOGOUT
    // =========================================

    const handleLogout = () => {

        localStorage.removeItem(

            "student_token"
        );



        localStorage.removeItem(

            "student_id"
        );



        navigate(

            "/student-login"
        );
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
                border-b
                border-base-300
                px-6
                lg:px-10
                sticky
                top-0
                z-50
                backdrop-blur
            ">

                <div className="flex-1">

                    <div className="
                        flex
                        items-center
                        gap-4
                    ">

                        <div className="
                            flex
                            flex-col
                        ">

                            <h1 className="
                                text-2xl
                                font-black
                                tracking-tight
                            ">

                                Student Portal

                            </h1>





                            <p className="
                                text-sm
                                opacity-60
                            ">

                                Academic Document Manager

                            </p>

                        </div>

                    </div>

                </div>





                {/* ========================================= */}
                {/* NAVIGATION */}
                {/* ========================================= */}

                <div className="
                    flex
                    items-center
                    gap-3
                ">

                    <Link
                        to="/student/dashboard"
                        className={`
                            btn
                            rounded-xl

                            ${
                                location.pathname ===

                                "/student/dashboard"

                                    ? "btn-primary"

                                    : "btn-ghost"
                            }
                        `}
                    >

                        Dashboard

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
            {/* PAGE CONTAINER */}
            {/* ========================================= */}

            <div className="
                max-w-7xl
                mx-auto
                p-6
                lg:p-8
            ">

                <Outlet />

            </div>

        </main>
    );
}

export default StudentLayout;