import React from "react";
import {
    render,
    RenderResult,
    fireEvent,
    cleanup,
} from "@testing-library/react";
import { IconBaseProps } from "react-icons";
import { FaExclamationCircle } from "react-icons/fa";
import faker from "faker";

import { ValidationStub } from "@/presentation/test";

import Login from "./login";

type SutTypes = {
    sut: RenderResult;
};

type SutParams = {
    validationError: string;
};

const makeSut = (params?: SutParams): SutTypes => {
    const validationStub = new ValidationStub();

    validationStub.errorMessage = params?.validationError;

    const sut = render(<Login validation={validationStub} />);

    return { sut };
};

describe("Login Component", () => {
    afterEach(cleanup);

    test("Should start with initial state", () => {
        const validationError = faker.random.words();
        const { sut } = makeSut({ validationError });

        const errorWrap = sut.getByTestId("error-wrap");
        const submitButton = sut.getByTestId("submit") as HTMLButtonElement;
        const emailStatus = sut.getByTestId("email-status");
        const emailErrorIcon = sut.getByTestId(
            "email-error-icon",
        ) as IconBaseProps;
        const passwordStatus = sut.getByTestId("password-status");
        const passwordErrorIcon = sut.getByTestId(
            "password-error-icon",
        ) as IconBaseProps;

        expect(errorWrap.childElementCount).toBe(0);
        expect(submitButton.disabled).toBe(true);
        expect(emailStatus.title).toBe(validationError);
        expect(emailErrorIcon).toBeTruthy();
        expect(passwordStatus.title).toBe(validationError);
        expect(passwordErrorIcon).toBeTruthy();
    });

    test("Should show email error if Validation fails", () => {
        const validationError = faker.random.words();
        const { sut } = makeSut({ validationError });
        const emailInput = sut.getByTestId("email");
        const emailErrorIcon = sut.getByTestId(
            "email-error-icon",
        ) as IconBaseProps;

        fireEvent.input(emailInput, {
            target: { value: faker.internet.email() },
        });

        const emailStatus = sut.getByTestId("email-status");
        expect(emailStatus.title).toBe(validationError);
        expect(emailErrorIcon).toBeTruthy();
    });

    test("Should show password error if Validation fails", () => {
        const validationError = faker.random.words();
        const { sut } = makeSut({ validationError });
        const passwordInput = sut.getByTestId("password");
        const passwordErrorIcon = sut.getByTestId(
            "password-error-icon",
        ) as IconBaseProps;

        fireEvent.input(passwordInput, {
            target: { value: faker.internet.password() },
        });

        const passwordStatus = sut.getByTestId("password-status");
        expect(passwordStatus.title).toBe(validationError);
        expect(passwordErrorIcon).toBeTruthy();
    });

    test("Should show valid email state if Validation succeeds", () => {
        const { sut } = makeSut();
        const emailInput = sut.getByTestId("email");

        fireEvent.input(emailInput, {
            target: { value: faker.internet.email() },
        });

        const emailStatus = sut.getByTestId("email-status");
        expect(emailStatus.title).toBe("All good");
    });

    test("Should show valid password state if Validation succeeds", () => {
        const { sut } = makeSut();
        const passwordInput = sut.getByTestId("password");

        fireEvent.input(passwordInput, {
            target: { value: faker.internet.password() },
        });

        const passwordStatus = sut.getByTestId("password-status");
        expect(passwordStatus.title).toBe("All good");
    });

    test("Should enable submit button if form is valid", () => {
        const { sut } = makeSut();

        const emailInput = sut.getByTestId("email");
        fireEvent.input(emailInput, {
            target: { value: faker.internet.email() },
        });

        const passwordInput = sut.getByTestId("password");
        fireEvent.input(passwordInput, {
            target: { value: faker.internet.password() },
        });

        const submitButton = sut.getByTestId("submit") as HTMLButtonElement;
        expect(submitButton.disabled).toBe(false);
    });
});
