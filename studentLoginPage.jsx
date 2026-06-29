import { useState } from "react";

import {

    Link

} from "react-router-dom";

import {

    studentLogin

} from "../services/studentAuthService";





function StudentLoginPage() {

    // =========================================
    // STATES
    // =========================================

    const [studentNumber,

        setStudentNumber]

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
            // CLEAR ADMIN SESSION
            // =========================================

            localStorage.removeItem(

                "token"
            );





            // =========================================
            // LOGIN
            // =========================================

            const data = await studentLogin(

                studentNumber,

                password
            );





            // =========================================
            // SAVE TOKEN
            // =========================================

            localStorage.setItem(

                "student_token",

                data.access_token
            );





            // =========================================
            // SAVE STUDENT ID
            // =========================================

            localStorage.setItem(

                "student_id",

                data.student.id
            );





            // =========================================
            // REDIRECT
            // =========================================

            window.location.href =

                "/student/dashboard";



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

                            Student Login

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
                            placeholder="Student Number"
                            className="
                                input
                                input-bordered
                                w-full
                            "
                            value={studentNumber}
                            onChange={(e) =>

                                setStudentNumber(
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
                            to="/"
                            className="
                                btn
                                btn-outline
                                rounded-xl
                            "
                        >

                            Admin Login

                        </Link>

                    </form>

                </div>

            </div>

        </main>
    );
}

export default StudentLoginPage;