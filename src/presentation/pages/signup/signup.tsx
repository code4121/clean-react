import React, { useEffect, useState } from "react";
import Context from "@/presentation/contexts/form/form-context";
import {
    LoginHeader,
    Footer,
    Input,
    FormStatus,
} from "@/presentation/components";
import { IValidation } from "@/presentation/protocols/validation";
import Styles from "./signup-styles.scss";

type Props = {
    validation: IValidation;
};

const SignUp: React.FC<Props> = ({ validation }: Props) => {
    const [state, setState] = useState({
        isLoading: false,
        name: "",
        nameError: "",
        email: "",
        emailError: "",
        passwordError: "Field is required",
        passwordConfirmationError: "Field is required",
        mainError: "",
    });

    useEffect(() => {
        setState({
            ...state,
            nameError: validation.validate("name", state.name),
            emailError: validation.validate("email", state.email),
        });
    }, [state.name, state.email]);

    return (
        <div className={Styles.signup}>
            <LoginHeader />
            <Context.Provider value={{ state, setState }}>
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
