import React from "react";

import {
    LoginHeader,
    Footer,
    Input,
    FormStatus,
} from "@/presentation/components";

import Styles from "./login-styles.scss";

const Login: React.FC = () => {
    return (
        <div className={Styles.login}>
            <LoginHeader />
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
                <button className={Styles.submit} type="submit">
                    Sign In
                </button>
                <span className={Styles.link}>Register</span>
                <FormStatus />
            </form>
            <Footer />
        </div>
    );
};

export default Login;
