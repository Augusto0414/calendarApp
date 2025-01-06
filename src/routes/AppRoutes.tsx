import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import { AuthPage } from "../auth/pages";
import { CalendarPage } from "../calendar/pages/CalendarPage";
import { useAuthStore } from "../hooks";
import { useEffect } from "react";
export const AppRoutes = (): JSX.Element => {

    const { checkAuthToken, status } = useAuthStore();

    useEffect(() => {
        checkAuthToken();
    }, [])

    if (status === 'checking') {
        return (
            <div>Loading...</div>
        )
    }

    return (
        <Router>
            <Routes>
                {
                    (
                        (status === 'not-authenticated')
                            ? (
                                <>
                                    < Route path="/auth/*" element={<AuthPage />} />
                                    <Route path="/*" element={<Navigate to="/auth/login" />} />
                                </>
                            )
                            :
                            (
                                <>
                                    <Route path="/" element={<CalendarPage />} />
                                    <Route path="/*" element={<Navigate to="/" />} />
                                </>
                            )
                    )
                }

            </Routes>
        </Router>

    )
}
