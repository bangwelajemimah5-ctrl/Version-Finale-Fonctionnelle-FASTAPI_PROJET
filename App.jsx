import {

    BrowserRouter,

    Routes,

    Route,

    Navigate, 

} from "react-router-dom";



// =========================================
// PAGES
// =========================================

import LoginPage from "./pages/LoginPage";

import StudentLoginPage from "./pages/StudentLoginPage";

import DashboardPage from "./pages/DashboardPage";

import StudentsPage from "./pages/StudentsPage";

import DocumentTypesPage from "./pages/DocumentTypesPage";

import RequestsPage from "./pages/RequestsPage";

import PaymentPage from "./pages/PaymentPage";

import StudentDashboardPage from "./pages/StudentDashboardPage";



// =========================================
// LAYOUTS
// =========================================

import AdminLayout from "./layouts/AdminLayout";

import StudentLayout from "./layouts/StudentLayout";





function App() {

    // =========================================
    // TOKENS
    // =========================================

    const adminToken = localStorage.getItem(

        "token"
    );



    const studentToken = localStorage.getItem(

        "student_token"
    );





    return (

        <BrowserRouter>

            <Routes>



                {/* =========================================
                   PUBLIC ROUTES
                ========================================= */}

                <Route
                    path="/"
                    element={<LoginPage />}
                />



                <Route
                    path="/student-login"
                    element={<StudentLoginPage />}
                />





                {/* =========================================
                   ADMIN ROUTES
                ========================================= */}

                <Route
                    path="/admin"
                    element={

                        adminToken

                            ? <AdminLayout />

                            : <Navigate to="/" />
                    }
                >

                    <Route
                        path="dashboard"
                        element={<DashboardPage />}
                    />



                    <Route
                        path="students"
                        element={<StudentsPage />}
                    />



                    <Route
                        path="document-types"
                        element={<DocumentTypesPage />}
                    />



                    <Route
                        path="requests"
                        element={<RequestsPage />}
                    />



                    <Route
                        path="payments"
                        element={<PaymentPage />}
                    />

                </Route>





                {/* =========================================
                   STUDENT ROUTES
                ========================================= */}

                <Route
                    path="/student"
                    element={

                        studentToken

                            ? <StudentLayout />

                            : <Navigate to="/student-login" />
                    }
                >

                    <Route
                        path="dashboard"
                        element={
                            <StudentDashboardPage />
                        }
                    />

                </Route>





                {/* =========================================
                   DEFAULT REDIRECT
                ========================================= */}

                <Route
                    path="*"
                    element={<Navigate to="/" />}
                />

            </Routes>

        </BrowserRouter>
    );
}

export default App;
