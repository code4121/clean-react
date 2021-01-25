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

import { ValidationSpy } from "@/presentation/test";

import Login from "./login";

type SutTypes = {
    sut: RenderResult;
    validationSpy: ValidationSpy;
};

const makeSut = (): SutTypes => {
    const validationSpy = new ValidationSpy();
    validationSpy.errorMessage = faker.random.words();
    const sut = render(<Login validation={validationSpy} />);

    return {
        sut,
        validationSpy,
    };
};

describe("Login Component", () => {
    afterEach(cleanup);

    test("Should start with initial state", () => {
        const { sut, validationSpy } = makeSut();

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
        expect(emailStatus.title).toBe(validationSpy.errorMessage);
        expect(emailErrorIcon).toBeTruthy();
        expect(passwordStatus.title).toBe("Required field");
        expect(passwordErrorIcon).toBeTruthy();
    });

    test("Should call Validation with correct email", () => {
        const { sut, validationSpy } = makeSut();
        const email = faker.internet.email();

        const emailInput = sut.getByTestId("email");

        fireEvent.input(emailInput, { target: { value: email } });

        expect(validationSpy.fieldName).toBe("email");
        expect(validationSpy.fieldValue).toBe(email);
    });

    test("Should call Validation with correct password", () => {
        const { sut, validationSpy } = makeSut();
        const password = faker.internet.password();

        const passwordInput = sut.getByTestId("password");

        fireEvent.input(passwordInput, { target: { value: password } });

        expect(validationSpy.fieldName).toBe("password");
        expect(validationSpy.fieldValue).toBe(password);
    });

    test("Should show email error if Validation fails", () => {
        const { sut, validationSpy } = makeSut();
        const emailInput = sut.getByTestId("email");
        const emailErrorIcon = sut.getByTestId(
            "email-error-icon",
        ) as IconBaseProps;

        fireEvent.input(emailInput, {
            target: { value: faker.internet.email() },
        });

        const emailStatus = sut.getByTestId("email-status");
        expect(emailStatus.title).toBe(validationSpy.errorMessage);
        // expect(emailStatus.textContent).toBe(errorMessage);
        expect(emailErrorIcon).toBeTruthy();
    });
});
