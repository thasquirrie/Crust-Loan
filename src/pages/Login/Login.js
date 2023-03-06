import React from "react";

import Navbar from "../../components/common/Navbar";
import { Container, ForgotPassword, SignInContainer } from "./LoginStyles";
import InputCommon from "../../components/common/InputCommon";
import InputCommonWithIcon from "../../components/common/InputCommonWithIcon";
import eye_off from "../../assets/common/eye-off.svg";
import { Link } from "react-router-dom";
import ButtonCommon from "../../components/common/ButtonCommon";

function Login() {
    return (
        <>
            <Navbar />
            <Container>
                <SignInContainer>
                    <h4>Sign in</h4>
                    <InputCommon inputType={"email"} inputLabel={"Crust Email Address"} />
                    <InputCommonWithIcon
                        inputType={"password"}
                        inputLabel={"Password"}
                        icon={eye_off}
                        marginTop={"2rem"}
                    />
                    <ForgotPassword>
                        <Link to="/">Forgot Password?</Link>
                    </ForgotPassword>
                    <ButtonCommon
                        text={"Sign in"}
                        marginTop={"2rem"}
                        textColor={"#ffffff"}
                        disabled={true}
                    />
                </SignInContainer>
            </Container>
        </>
    );
}

export default Login;
