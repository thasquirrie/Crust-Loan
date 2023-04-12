import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login/Login";
import Dashboard from "./pages/Dashboard/Dashboard";
import Transactions from "./pages/Transactions/Transactions";
import "rsuite/dist/rsuite.min.css";
import "./App.css";
import LoanApplication from "./pages/LoanApplication/LoanApplication";
import POSRequest from "./pages/POSRequest/POSRequest";
import PosTransaction from "./pages/POSTMSTransaction/POSTMSTransaction";
import POSTransactionActivity from "./pages/POSTransactionActivity/POSTransactionActivity";
import Agents from "./pages/Agents/Agents";
import PosDevices from "./pages/POSDevices/PosDevices";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="transaction" element={<Transactions />} />
                <Route path="agent" element={<Agents />} />
                <Route path="auth">
                    <Route path="login" element={<Login />} />
                </Route>
                <Route path="loan">
                    <Route path="application" element={<LoanApplication />} />
                </Route>
                <Route path="pos">
                    <Route path="requests" element={<POSRequest />} />
                    <Route path="tms" element={<PosTransaction />} />
                    <Route path="transaction_activity" element={<POSTransactionActivity />} />
                    <Route path="devices" element={<PosDevices />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
