import React from "react";
import faker from "faker";
import { IconBaseProps } from "react-icons";
import { FaExclamationCircle } from "react-icons/fa";
import {
    render,
    RenderResult,
    fireEvent,
    cleanup,
} from "@testing-library/react";

import { ValidationStub, AuthenticationSpy } from "@/presentation/test";

import Login from "./login";

type SutTypes = {
    sut: RenderResult;
    authenticationSpy: AuthenticationSpy;
};

type SutParams = {
    validationError: string;
};

const makeSut = (params?: SutParams): SutTypes => {
    const validationStub = new ValidationStub();
    const authenticationSpy = new AuthenticationSpy();

    validationStub.errorMessage = params?.validationError;

    const sut = render(
        <Login
            validation={validationStub}
            authentication={authenticationSpy}
        />,
    );

    return { sut, authenticationSpy };
};

const simulateValidSubmit = (
    sut: RenderResult,
    email = faker.internet.email(),
    password = faker.internet.password(),
): void => {
    populateEmailField(sut, email);
    populatePasswordField(sut, password);

    const submitButton = sut.getByTestId("submit");
    fireEvent.click(submitButton);
};

const populateEmailField = (
    sut: RenderResult,
    email = faker.internet.email(),
): void => {
    const emailInput = sut.getByTestId("email");
    fireEvent.input(emailInput, {
        target: { value: email },
    });
};

const populatePasswordField = (
    sut: RenderResult,
    password = faker.internet.password(),
): void => {
    const passwordInput = sut.getByTestId("password");
    fireEvent.input(passwordInput, {
        target: { value: password },
    });
};

const simulateStatusForField = (
    sut: RenderResult,
    fieldName: string,
    validationError?: string,
    errorIcon?: IconBaseProps,
): void => {
    const fieldStatus = sut.getByTestId(`${fieldName}-status`);
    expect(fieldStatus.title).toBe(validationError || "All good");

    if (validationError) expect(errorIcon).toBeTruthy();
};

describe("Login Component", () => {
    afterEach(cleanup);

    test("Should start with initial state", () => {
        const validationError = faker.random.words();
        const { sut } = makeSut({ validationError });

        const errorWrap = sut.getByTestId("error-wrap");
        const submitButton = sut.getByTestId("submit") as HTMLButtonElement;
        const emailErrorIcon = sut.getByTestId(
            "email-error-icon",
        ) as IconBaseProps;

        const passwordErrorIcon = sut.getByTestId(
            "password-error-icon",
        ) as IconBaseProps;

        simulateStatusForField(sut, "email", validationError, emailErrorIcon);

        simulateStatusForField(
            sut,
            "password",
            validationError,
            passwordErrorIcon,
        );

        expect(errorWrap.childElementCount).toBe(0);
        expect(submitButton.disabled).toBe(true);
    });

    // eslint-disable-next-line jest/expect-expect
    test("Should show email error if Validation fails", () => {
        const validationError = faker.random.words();
        const { sut } = makeSut({ validationError });
        populateEmailField(sut);
        const emailErrorIcon = sut.getByTestId(
            "email-error-icon",
        ) as IconBaseProps;

        simulateStatusForField(sut, "email", validationError, emailErrorIcon);
    });

    // eslint-disable-next-line jest/expect-expect
    test("Should show password error if Validation fails", () => {
        const validationError = faker.random.words();
        const { sut } = makeSut({ validationError });
        populatePasswordField(sut);
        const passwordErrorIcon = sut.getByTestId(
            "password-error-icon",
        ) as IconBaseProps;

        simulateStatusForField(
            sut,
            "password",
            validationError,
            passwordErrorIcon,
        );
    });

    // eslint-disable-next-line jest/expect-expect
    test("Should show valid email state if Validation succeeds", () => {
        const { sut } = makeSut();
        populateEmailField(sut);

        simulateStatusForField(sut, "email");
    });

    // eslint-disable-next-line jest/expect-expect
    test("Should show valid password state if Validation succeeds", () => {
        const { sut } = makeSut();
        populatePasswordField(sut);

        simulateStatusForField(sut, "password");
    });

    test("Should enable submit button if form is valid", () => {
        const { sut } = makeSut();

        populateEmailField(sut);
        populatePasswordField(sut);

        const submitButton = sut.getByTestId("submit") as HTMLButtonElement;
        expect(submitButton.disabled).toBe(false);
    });

    test("Should show spinner on submit", () => {
        const { sut } = makeSut();

        simulateValidSubmit(sut);

        const spinner = sut.getByTestId("spinner");
        expect(spinner).toBeTruthy();
    });

    test("Should call Authentication with correct values", () => {
        const { sut, authenticationSpy } = makeSut();
        const email = faker.internet.email();
        const password = faker.internet.password();

        simulateValidSubmit(sut, email, password);

        expect(authenticationSpy.params).toEqual({
            email,
            password,
        });
    });

    test("Should call Authentication only once", () => {
        const { sut, authenticationSpy } = makeSut();

        simulateValidSubmit(sut);
        simulateValidSubmit(sut);

        expect(authenticationSpy.callsCount).toBe(1);
    });

    test("Should not call Authentication if form is invalid", () => {
        const validationError = faker.random.words();
        const { sut, authenticationSpy } = makeSut({ validationError });

        populateEmailField(sut);

        fireEvent.submit(sut.getByTestId("form"));

        expect(authenticationSpy.callsCount).toBe(0);
    });
});
