import React from "react";
import { Link } from "react-router-dom";
import Context from "@/presentation/contexts/form/form-context";
import {
    LoginHeader,
    Footer,
    Input,
    FormStatus,
} from "@/presentation/components";
import Styles from "./signup-styles.scss";

const SignUp: React.FC = () => {
    return (
        <div className={Styles.signup}>
            <LoginHeader />
            <Context.Provider value={{ state: {} }}>
                <form className={Styles.form}>
                    <h2>Create your account</h2>
                    <Input
                        type="text"
                        name="name"
                        placeholder="Enter your name"
                    />
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
                    <Input
                        type="password"
                        name="passwordConfirmation"
                        placeholder="Re-enter your password"
                    />
                    <button className={Styles.submit} type="submit">
                        Create
                    </button>
                    <Link
                        data-testid="register"
                        to="/login"
                        className={Styles.link}
                    >
                        Go back to Login
                    </Link>
                    <FormStatus />
                </form>
            </Context.Provider>
            <Footer />
        </div>
    );
};

export default SignUp;
