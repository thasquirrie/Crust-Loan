import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login/Login";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                {/* <Route path="/" element={<Home />} /> */}
                {/* <Route path="users/*" element={<Users />} /> */}
                <Route path="auth">
                    <Route path="login" element={<Login />} />
                    {/* <Route path=":id" element={<UserProfile />} /> */}
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
