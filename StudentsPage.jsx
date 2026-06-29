import {

    useEffect,

    useState

} from "react";



import api from "../services/api";





function StudentsPage() {

    // =========================================
    // STATES
    // =========================================

    const [students, setStudents] = useState([]);

    const [firstName, setFirstName] = useState("");

    const [lastName, setLastName] = useState("");

    const [email, setEmail] = useState("");

    const [studentNumber, setStudentNumber] = useState("");

    const [faculty, setFaculty] = useState("");

    const [department, setDepartment] = useState("");



    const [

        editingStudentId,

        setEditingStudentId

    ] = useState(null);





    // =========================================
    // FETCH STUDENTS
    // =========================================

    const fetchStudents = async () => {

        try {

            const response = await api.get(

                "/admin/students"
            );



            setStudents(response.data);



        } catch (error) {

            console.error(error);
        }
    };





    useEffect(() => {

        fetchStudents();

    }, []);





    // =========================================
    // CREATE OR UPDATE STUDENT
    // =========================================

    const handleSubmitStudent = async (

        e

    ) => {

        e.preventDefault();





        try {

            const studentData = {

                first_name: firstName,

                last_name: lastName,

                email: email,

                student_number: studentNumber,

                faculty: faculty,

                department: department,



                // =========================================
                // RANDOM PASSWORD GENERATED
                // BY BACKEND
                // =========================================

                password: ""
            };





            // =========================================
            // UPDATE STUDENT
            // =========================================

            if (

                editingStudentId !== null

            ) {

                await api.put(

                    `/admin/students/${editingStudentId}`,

                    studentData
                );



                alert(

                    "Student updated successfully"
                );



            } else {

                // =========================================
                // CREATE STUDENT
                // =========================================

                await api.post(

                    "/admin/students",

                    studentData
                );



                alert(

                    "Student created successfully"
                );
            }





            // =========================================
            // RESET FORM
            // =========================================

            setFirstName("");

            setLastName("");

            setEmail("");

            setStudentNumber("");

            setFaculty("");

            setDepartment("");



            setEditingStudentId(

                null
            );





            fetchStudents();



        } catch (error) {

            console.error(error);





            alert(

                error.response?.data?.detail ||

                "Operation failed"
            );
        }
    };





    // =========================================
    // EDIT STUDENT
    // =========================================

    const handleEditStudent = (

        student

    ) => {

        setEditingStudentId(

            student.id
        );



        setFirstName(

            student.first_name
        );



        setLastName(

            student.last_name
        );



        setEmail(

            student.email
        );



        setStudentNumber(

            student.student_number
        );



        setFaculty(

            student.faculty
        );



        setDepartment(

            student.department
        );
    };





    // =========================================
    // CANCEL EDIT
    // =========================================

    const handleCancelEdit = () => {

        setEditingStudentId(

            null
        );



        setFirstName("");

        setLastName("");

        setEmail("");

        setStudentNumber("");

        setFaculty("");

        setDepartment("");
    };





    // =========================================
    // DELETE STUDENT
    // =========================================

    const handleDeleteStudent = async (

        id

    ) => {

        try {

            await api.delete(

                `/admin/students/${id}`
            );



            fetchStudents();



        } catch (error) {

            console.error(error);
        }
    };





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





                {/* ========================================= */}
                {/* HEADER */}
                {/* ========================================= */}

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
                        gap-2
                    ">

                        <h1 className="
                            text-5xl
                            font-black
                        ">

                            Students

                        </h1>





                        <p className="
                            text-lg
                            opacity-90
                        ">

                            Manage all registered students.

                        </p>

                    </div>

                </div>





                {/* ========================================= */}
                {/* CREATE / UPDATE FORM */}
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

                            {

                                editingStudentId !== null

                                    ? "Update Student"

                                    : "Create Student"
                            }

                        </h2>





                        <form
                            onSubmit={
                                handleSubmitStudent
                            }
                            autoComplete="off"
                            className="
                                grid
                                grid-cols-1
                                md:grid-cols-2
                                gap-4
                            "
                        >

                            <input
                                type="text"
                                placeholder="First Name"
                                className="
                                    input
                                    input-bordered
                                    w-full
                                "
                                value={firstName}
                                onChange={(e) =>
                                    setFirstName(
                                        e.target.value
                                    )
                                }
                            />





                            <input
                                type="text"
                                placeholder="Last Name"
                                className="
                                    input
                                    input-bordered
                                    w-full
                                "
                                value={lastName}
                                onChange={(e) =>
                                    setLastName(
                                        e.target.value
                                    )
                                }
                            />





                            <input
                                type="email"
                                placeholder="Email"
                                className="
                                    input
                                    input-bordered
                                    w-full
                                "
                                value={email}
                                onChange={(e) =>
                                    setEmail(
                                        e.target.value
                                    )
                                }
                            />





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
                                type="text"
                                placeholder="Faculty"
                                className="
                                    input
                                    input-bordered
                                    w-full
                                "
                                value={faculty}
                                onChange={(e) =>
                                    setFaculty(
                                        e.target.value
                                    )
                                }
                            />





                            <input
                                type="text"
                                placeholder="Department"
                                className="
                                    input
                                    input-bordered
                                    w-1/2
                                "
                                value={department}
                                onChange={(e) =>
                                    setDepartment(
                                        e.target.value
                                    )
                                }
                            />





                            <div className="
                                alert
                                alert-info
                                md:col-span-2
                            ">

                                <span>

                                    Password generated
                                    automatically by backend.

                                </span>

                            </div>





                            <button
                                type="submit"
                                className="
                                    btn
                                    btn-primary
                                    rounded-x1
                                "
                            >

                                {

                                    editingStudentId !== null

                                        ? "Update Student"

                                        : "Create Student"
                                }

                            </button>





                            {

                                editingStudentId !== null && (

                                    <button
                                        type="button"
                                        onClick={
                                            handleCancelEdit
                                        }
                                        className="
                                            btn
                                            btn-outline
                                            rounded-xl
                                        "
                                    >

                                        Cancel

                                    </button>
                                )
                            }

                        </form>

                    </div>

                </div>





                {/* ========================================= */}
                {/* STUDENTS TABLE */}
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

                                All Students

                            </h2>





                            <div className="
                                badge
                                badge-primary
                                badge-lg
                            ">

                                {students.length} Students

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

                                        <th>Name</th>

                                        <th>Email</th>

                                        <th>Student Number</th>

                                        <th>Faculty</th>

                                        <th>Department</th>

                                        <th>Password</th>

                                        <th>Actions</th>

                                    </tr>

                                </thead>





                                <tbody>

                                    {

                                        students.map(

                                            (student) => (

                                                <tr
                                                    key={student.id}
                                                >

                                                    <td>

                                                        {student.id}

                                                    </td>





                                                    <td>

                                                        <div className="
                                                            font-semibold
                                                        ">

                                                            {

                                                                student.first_name
                                                            }{" "}

                                                            {

                                                                student.last_name
                                                            }

                                                        </div>

                                                    </td>





                                                    <td>

                                                        {

                                                            student.email
                                                        }

                                                    </td>





                                                    <td>

                                                        <span
                                                            className="
                                                                badge
                                                                badge-secondary
                                                            "
                                                        >

                                                            {

                                                                student.student_number
                                                            }

                                                        </span>

                                                    </td>





                                                    <td>

                                                        {

                                                            student.faculty
                                                        }

                                                    </td>





                                                    <td>

                                                        {

                                                            student.department
                                                        }

                                                    </td>





                                                    <td>

                                                        <span
                                                            className="
                                                                badge
                                                                badge-outline
                                                            "
                                                        >

                                                            {

                                                                student.password ||
                                                                "Generated"
                                                            }

                                                        </span>

                                                    </td>





                                                    <td>

                                                        <div className="
                                                            flex
                                                            gap-2
                                                        ">

                                                            <button
                                                                onClick={() =>
                                                                    handleEditStudent(
                                                                        student
                                                                    )
                                                                }
                                                                className="
                                                                    btn
                                                                    btn-warning
                                                                    btn-sm
                                                                    rounded-xl
                                                                "
                                                            >

                                                                Edit

                                                            </button>





                                                            <button
                                                                onClick={() =>
                                                                    handleDeleteStudent(
                                                                        student.id
                                                                    )
                                                                }
                                                                className="
                                                                    btn
                                                                    btn-error
                                                                    btn-sm
                                                                    rounded-xl
                                                                "
                                                            >

                                                                Delete

                                                            </button>

                                                        </div>

                                                    </td>

                                                </tr>
                                            )
                                        )
                                    }

                                </tbody>

                            </table>

                        </div>

                    </div>

                </div>

            </div>

        </main>
    );
}

export default StudentsPage;