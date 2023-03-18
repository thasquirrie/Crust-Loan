import React, { useState } from "react";
import Navbar from "../../components/common/Navbar";
import { Container, ForgotPassword, SignInContainer } from "./LoginStyles";
import InputCommon from "../../components/common/InputCommon";
import InputCommonWithIcon from "../../components/common/InputCommonWithIcon";
import eye_off from "../../assets/common/eye-off.svg";
import { Link, useNavigate } from "react-router-dom";
import ButtonCommon from "../../components/common/ButtonCommon";
import { useDispatch } from "react-redux";
import { useLoginMutation } from "../../app/services/auth";
import { setCredentials } from "../../features/auth/authSlice";
import encryptData from "../../utils/utils";
import { FormControl, FormHelperText, Snackbar } from "@mui/material";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [loginError, setLoginError] = useState("");
    const [invalidEmail, setInvalidEmail] = useState(false);

    const [openSnackbar, setOpenSnackbar] = useState(false);

    const handleClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }

        setOpenSnackbar(false);
        setLoginError("");
    };

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [login, { isLoading }] = useLoginMutation();

    const handleEmailChange = (e) => {
        const emailCheckRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,12})+$/;
        setEmail(e.target.value);
        if (e.target.value.length > 0 && !emailCheckRegex.test(e.target.value)) {
            setInvalidEmail(true);
        } else {
            setInvalidEmail(false);
        }
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const result = await login({
                username: email,
                password: encryptData(password),
            }).unwrap();
            const { data } = result;
            dispatch(setCredentials({ user: { user: data.user, token: data.access_token } }));
            navigate("/");
        } catch (err) {
            if (err.data.message) {
                setLoginError(err.data.message);
            } else {
                setLoginError("Something went wrong, Try again later!");
            }
            setOpenSnackbar(true);
        }
    };

    return (
        <>
            <Navbar />
            <Snackbar
                open={openSnackbar}
                onClose={handleClose}
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
                autoHideDuration={4000}
            >
                <Alert onClose={handleClose} severity={"error"} sx={{ width: "100%" }}>
                    {loginError}
                </Alert>
            </Snackbar>
            <Container>
                <SignInContainer>
                    <h4>Sign in</h4>
                    <InputCommon
                        inputType={"email"}
                        inputLabel={"Crust Email Address"}
                        onChange={handleEmailChange}
                        value={email}
                    />
                    {invalidEmail && (
                        <FormControl error={invalidEmail} variant="standard">
                            <FormHelperText>Enter a valid email address</FormHelperText>
                        </FormControl>
                    )}
                    <InputCommonWithIcon
                        inputType={showPassword ? "text" : "password"}
                        inputLabel={"Password"}
                        icon={eye_off}
                        marginTop={"2rem"}
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        onClickIcon={() => setShowPassword(!showPassword)}
                    />
                    <ForgotPassword>
                        <Link to="/">Forgot Password?</Link>
                    </ForgotPassword>
                    <ButtonCommon
                        text={"Sign in"}
                        marginTop={"2rem"}
                        textColor={"#ffffff"}
                        disabled={!(email && password.length >= 8) || isLoading}
                        onClick={handleLogin}
                        isLoading={isLoading}
                    />
                </SignInContainer>
            </Container>
        </>
    );
}

export default Login;
