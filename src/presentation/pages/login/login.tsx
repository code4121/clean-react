import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import Context from "@/presentation/contexts/form/form-context";
import {
    LoginHeader,
    Footer,
    Input,
    FormStatus,
    SubmitButton,
} from "@/presentation/components";
import { IValidation } from "@/presentation/protocols/validation";
import { IAuthentication, ISaveAccessToken } from "@/domain/usecases";
import Styles from "./login-styles.scss";

type Props = {
    validation: IValidation;
    authentication: IAuthentication;
    saveAccessToken: ISaveAccessToken;
};

const Login: React.FC<Props> = ({
    validation,
    authentication,
    saveAccessToken,
}: Props) => {
    const history = useHistory();
    const [state, setState] = useState({
        isLoading: false,
        isFormInvalid: true,
        email: "",
        emailError: "",
        password: "",
        passwordError: "",
        mainError: "",
    });

    useEffect(() => {
        const emailError = validation.validate("email", state.email);
        const passwordError = validation.validate("password", state.password);

        setState({
            ...state,
            emailError,
            passwordError,
            isFormInvalid: !!emailError || !!passwordError,
        });
    }, [state.email, state.password]);

    const handleSubmit = async (
        event: React.FormEvent<HTMLFormElement>,
    ): Promise<void> => {
        event.preventDefault();

        try {
            if (state.isLoading || state.isFormInvalid) {
                return;
            }

            setState({ ...state, isLoading: true });

            const account = await authentication.auth({
                email: state.email,
                password: state.password,
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
        <div className={Styles.login}>
            <LoginHeader />
            <Context.Provider value={{ state, setState }}>
                <form
                    data-testid="form"
                    className={Styles.form}
                    onSubmit={handleSubmit}
                >
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
                    <SubmitButton text="Sign In" />
                    <Link
                        data-testid="register-link"
                        to="/signup"
                        className={Styles.link}
                    >
                        Register
                    </Link>
                    <FormStatus />
                </form>
            </Context.Provider>
            <Footer />
        </div>
    );
};

export default Login;
