import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login/Login";
import Dashboard from "./pages/Dashboard/Dashboard";
import Transactions from "./pages/Transactions/Transactions";
import "rsuite/dist/rsuite.min.css";
import "./App.css";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Dashboard />} />
                {/* <Route path="users/*" element={<Users />} /> */}
                <Route path="transactions" element={<Transactions />} />
                <Route path="auth">
                    <Route path="login" element={<Login />} />
                    {/* <Route path=":id" element={<UserProfile />} /> */}
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
