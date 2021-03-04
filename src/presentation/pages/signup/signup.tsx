import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import Context from "@/presentation/contexts/form/form-context";
import {
    LoginHeader,
    Footer,
    Input,
    FormStatus,
} from "@/presentation/components";
import { IValidation } from "@/presentation/protocols/validation";
import Styles from "./signup-styles.scss";
import { IAddAccount, ISaveAccessToken } from "@/domain/usecases";

type Props = {
    validation: IValidation;
    addAccount: IAddAccount;
    saveAccessToken: ISaveAccessToken;
};

const SignUp: React.FC<Props> = ({
    validation,
    addAccount,
    saveAccessToken,
}: Props) => {
    const history = useHistory();
    const [state, setState] = useState({
        isLoading: false,
        isFormInvalid: true,
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
        const nameError = validation.validate("name", state.name);
        const emailError = validation.validate("email", state.email);
        const passwordError = validation.validate("password", state.password);
        const passwordConfirmationError = validation.validate(
            "passwordConfirmation",
            state.passwordConfirmation,
        );

        setState({
            ...state,
            nameError,
            emailError,
            passwordError,
            passwordConfirmationError,
            isFormInvalid:
                !!nameError ||
                !!emailError ||
                !!passwordError ||
                !!passwordConfirmationError,
        });
    }, [state.name, state.email, state.password, state.passwordConfirmation]);

    const handleSubmit = async (
        event: React.FormEvent<HTMLFormElement>,
    ): Promise<void> => {
        try {
            event.preventDefault();

            if (state.isLoading || state.isFormInvalid) return;

            setState({ ...state, isLoading: true });

            const account = await addAccount.add({
                name: state.name,
                email: state.email,
                password: state.password,
                passwordConfirmation: state.passwordConfirmation,
            });

            await saveAccessToken.save(account.accessToken);

            history.replace("/");
        } catch (error) {
            setState({
                ...state,
                isLoading: false,
                mainError: error.message,
            });
        }
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
                        disabled={state.isFormInvalid}
                    >
                        Create
                    </button>
                    <Link
                        data-testid="login-link"
                        replace
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
