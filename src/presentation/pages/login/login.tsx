import React, { useState, useEffect } from "react";

import Context from "@/presentation/contexts/form/form-context";

import {
    LoginHeader,
    Footer,
    Input,
    FormStatus,
} from "@/presentation/components";

import { IValidation } from "@/presentation/protocols/validation";

import Styles from "./login-styles.scss";

type Props = {
    validation: IValidation;
};

const Login: React.FC<Props> = ({ validation }: Props) => {
    const [state, setState] = useState({
        isLoading: false,
        email: "",
        emailError: "",
        password: "",
        passwordError: "",
        mainError: "",
    });

    useEffect(() => {
        setState({
            ...state,
            emailError: validation.validate("email", state.email),
            passwordError: validation.validate("password", state.password),
        });
    }, [state.email, state.password]);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
        event.preventDefault();
        setState({ ...state, isLoading: true });
    };

    return (
        <div className={Styles.login}>
            <LoginHeader />
            <Context.Provider value={{ state, setState }}>
                <form className={Styles.form} onSubmit={handleSubmit}>
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
                        disabled={!!state.emailError || !!state.passwordError}
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
