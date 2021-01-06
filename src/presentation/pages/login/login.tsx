import React, { useState } from "react";

import Context from "@/presentation/contexts/form/form-context";

import {
    LoginHeader,
    Footer,
    Input,
    FormStatus,
} from "@/presentation/components";

import Styles from "./login-styles.scss";

const Login: React.FC = () => {
    const [state, setState] = useState({
        isLoading: false,
        // errorMessage: "",
        // emailError: "Required field",
        // passwordError: "Required field",
    });

    const [errorState, setErrorState] = useState({
        email: "Required field",
        password: "Required field",
        main: "",
    });

    return (
        <div className={Styles.login}>
            <LoginHeader />
            <Context.Provider value={{ state, errorState }}>
                <form className={Styles.form}>
                    <h2>Login</h2>
                    <Input
                        type="email"
                        name="email"
                        placeholder="Enter your email"
                    />
                    <Input
                        type="password"
                        name="password"
                        placeholder="Enter your password"
                    />
                    <button
                        data-testid="submit"
                        className={Styles.submit}
                        type="submit"
                        disabled
                    >
                        Sign In
                    </button>
                    <span className={Styles.link}>Register</span>
                    <FormStatus />
                </form>
            </Context.Provider>
            <Footer />
        </div>
    );
};

export default Login;
