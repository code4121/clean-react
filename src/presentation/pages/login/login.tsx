import React from "react";

import { FaExclamationCircle } from "react-icons/fa";

import Spinner from "@/presentation/components/spinner/spinner";
import Logo from "@/presentation/components/logo/logo";

import Styles from "./login-styles.scss";

const Login: React.FC = () => {
    return (
        <div className={Styles.login}>
            <header className={Styles.header}>
                <Logo />
                <h1>4Devs - Polls for Programmers</h1>
            </header>
            <form className={Styles.form}>
                <h2>Login</h2>
                <div className={Styles.inputWrap}>
                    <input
                        type="email"
                        name="email"
                        placeholder="Enter your email"
                    />
                    {/* <span className={Styles.status}>🤦‍♂️</span> */}
                    <span className={Styles.status}>
                        <FaExclamationCircle size={16} />
                    </span>
                </div>
                <div className={Styles.inputWrap}>
                    <input
                        type="password"
                        name="password"
                        placeholder="Enter your password"
                    />
                    {/* <span className={Styles.status}>🤦‍♂️</span> */}
                    <span className={Styles.status}>
                        <FaExclamationCircle size={16} />
                    </span>
                </div>
                <button className={Styles.submit} type="submit">
                    Sign In
                </button>
                <span className={Styles.link}>Register</span>
                <div className={Styles.errorWrap}>
                    <Spinner className={Styles.spinner} />
                    <span className={Styles.error}>Error</span>
                </div>
            </form>
            <footer className={Styles.footer} />
        </div>
    );
};

export default Login;
