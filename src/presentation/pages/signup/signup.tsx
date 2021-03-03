import React, { useState } from "react";
import Context from "@/presentation/contexts/form/form-context";
import {
    LoginHeader,
    Footer,
    Input,
    FormStatus,
} from "@/presentation/components";
import Styles from "./signup-styles.scss";

const SignUp: React.FC = () => {
    const [state] = useState({
        isLoading: false,
        nameError: "Field is required",
        emailError: "Field is required",
        passwordError: "Field is required",
        passwordConfirmationError: "Field is required",
        mainError: "",
    });

    return (
        <div className={Styles.signup}>
            <LoginHeader />
            <Context.Provider value={{ state }}>
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
                    <button
                        data-testid="submit"
                        className={Styles.submit}
                        type="submit"
                        disabled
                    >
                        Create
                    </button>
                    <span className={Styles.link}>Go back to Login</span>
                    <FormStatus />
                </form>
            </Context.Provider>
            <Footer />
        </div>
    );
};

export default SignUp;
