import React, { useCallback, useEffect, useState } from "react";
import Context from "@/presentation/contexts/form/form-context";
import {
    LoginHeader,
    Footer,
    Input,
    FormStatus,
} from "@/presentation/components";
import { IValidation } from "@/presentation/protocols/validation";
import Styles from "./signup-styles.scss";
import { IAddAccount } from "@/domain/usecases";

type Props = {
    validation: IValidation;
    addAccount: IAddAccount;
};

const SignUp: React.FC<Props> = ({ validation, addAccount }: Props) => {
    const [state, setState] = useState({
        isLoading: false,
        name: "",
        nameError: "",
        email: "",
        emailError: "",
        password: "",
        passwordError: "",
        passwordConfirmation: "",
        passwordConfirmationError: "",
        mainError: "",
    });

    useEffect(() => {
        setState({
            ...state,
            nameError: validation.validate("name", state.name),
            emailError: validation.validate("email", state.email),
            passwordError: validation.validate("password", state.password),
            passwordConfirmationError: validation.validate(
                "passwordConfirmation",
                state.passwordConfirmation,
            ),
        });
    }, [state.name, state.email, state.password, state.passwordConfirmation]);

    const handleSubmit = async (
        event: React.FormEvent<HTMLFormElement>,
    ): Promise<void> => {
        event.preventDefault();

        setState({ ...state, isLoading: true });

        await addAccount.add({
            name: state.name,
            email: state.email,
            password: state.password,
            passwordConfirmation: state.passwordConfirmation,
        });
    };

    return (
        <div className={Styles.signup}>
            <LoginHeader />
            <Context.Provider value={{ state, setState }}>
                <form
                    data-testid="form"
                    className={Styles.form}
                    onSubmit={handleSubmit}
                >
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
                        disabled={
                            !!state.nameError ||
                            !!state.emailError ||
                            !!state.passwordError ||
                            !!state.passwordConfirmationError
                        }
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
