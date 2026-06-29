import { useState } from "react";

import {

    useNavigate,

    Link

} from "react-router-dom";

import {

    loginUser

} from "../services/authService";





function LoginPage() {

    const navigate = useNavigate();





    const [username,

        setUsername]

        = useState("");





    const [password,

        setPassword]

        = useState("");





    // =========================================
    // HANDLE LOGIN
    // =========================================

    const handleLogin = async (e) => {

        e.preventDefault();

        

        try {

            // =========================================
            // REMOVE STUDENT TOKEN
            // =========================================

            localStorage.removeItem(

                "student_token"
            );





            const data = await loginUser(

                username,

                password
            );





            // =========================================
            // SAVE ADMIN TOKEN
            // =========================================

            localStorage.setItem(

                "token",

                data.access_token
            );





            // =========================================
            // REDIRECT
            // =========================================
            
            window.location.href =

                "/admin/dashboard";



        } catch (error) {

            console.error(error);





            alert(

                "Invalid credentials"
            );
        }
    };





    return (

        <main
            className="
                min-h-screen
                flex
                items-center
                justify-center
                bg-base-200
                p-6
            "
        >

            <div
                className="
                    card
                    bg-base-100
                    shadow-2xl
                    rounded-3xl
                    w-full
                    max-w-md
                "
            >

                <div className="
                    card-body
                    p-8
                    gap-6
                ">





                    {/* ========================================= */}
                    {/* HEADER */}
                    {/* ========================================= */}

                    <div className="
                        text-center
                        flex
                        flex-col
                        gap-2
                    ">

                        <h1
                            className="
                                text-4xl
                                font-black
                            "
                        >

                            Admin Login

                        </h1>





                        <p className="
                            opacity-70
                        ">

                            Academic Document Manager

                        </p>

                    </div>





                    {/* ========================================= */}
                    {/* FORM */}
                    {/* ========================================= */}

                    <form
                        onSubmit={handleLogin}
                        className="
                            flex
                            flex-col
                            gap-4
                        "
                    >

                        <input
                            type="text"
                            placeholder="Username"
                            className="
                                input
                                input-bordered
                                w-full
                            "
                            value={username}
                            onChange={(e) =>

                                setUsername(
                                    e.target.value
                                )
                            }
                        />





                        <input
                            type="password"
                            placeholder="Password"
                            className="
                                input
                                input-bordered
                                w-full
                            "
                            value={password}
                            onChange={(e) =>

                                setPassword(
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
                                mt-2
                            "
                        >

                            Login

                        </button>





                        <Link
                            to="/student-login"
                            className="
                                btn
                                btn-outline
                                rounded-xl
                            "
                        >

                            Student Login

                        </Link>

                    </form>

                </div>

            </div>

        </main>
    );
}

export default LoginPage;