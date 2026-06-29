import { Link } from "react-router-dom";



function Navbar() {

    const handleLogout = () => {

        localStorage.removeItem("token");

        window.location.href = "/";
    };



    return (

        <div className="navbar bg-base-200 shadow-md px-6">

            <div className="flex-1">

                <Link
                    to="/"
                    className="text-2xl font-bold"
                >
                    Student Admin System
                </Link>

            </div>



            <div className="flex gap-2">

                <Link
                    to="/students"
                    className="btn btn-sm btn-primary"
                >
                    Students
                </Link>



                <Link
                    to="/requests"
                    className="btn btn-sm btn-secondary"
                >
                    Requests
                </Link>



                <Link
                    to="/payments"
                    className="btn btn-sm btn-accent"
                >
                    Payments
                </Link>



                <Link
                    to="/student-payment"
                    className="btn btn-sm btn-info"
                >
                    Student Payment
                </Link>



                <button
                    className="btn btn-sm btn-error"
                    onClick={handleLogout}
                >
                    Logout
                </button>

            </div>

        </div>
    );
}

export default Navbar;