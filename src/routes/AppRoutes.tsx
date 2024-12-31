import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import { AuthPage } from "../auth/pages";
import { CalendarPage } from "../calendar/pages/CalendarPage";
export const AppRoutes = (): JSX.Element => {
    const authStatus = 'authorization';
    return (
        <Router>
            <Routes>
                {
                    (
                        authStatus === "authorization" ?
                            <Route path="/*" element={<CalendarPage />} />
                            :
                            <Route path="/auth/*" element={<AuthPage />} />
                    )
                }

                <Route path="/*" element={<Navigate to="/auth/login" />} />
            </Routes>
        </Router>

    )
}
