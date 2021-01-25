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
    validationStub: ValidationStub;
};

const makeSut = (): SutTypes => {
    const validationStub = new ValidationStub();
    validationStub.errorMessage = faker.random.words();
    const sut = render(<Login validation={validationStub} />);

    return {
        sut,
        validationStub,
    };
};

describe("Login Component", () => {
    afterEach(cleanup);

    test("Should start with initial state", () => {
        const { sut, validationStub } = makeSut();

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
        expect(emailStatus.title).toBe(validationStub.errorMessage);
        expect(emailErrorIcon).toBeTruthy();
        expect(passwordStatus.title).toBe(validationStub.errorMessage);
        expect(passwordErrorIcon).toBeTruthy();
    });

    test("Should show email error if Validation fails", () => {
        const { sut, validationStub } = makeSut();
        const emailInput = sut.getByTestId("email");
        const emailErrorIcon = sut.getByTestId(
            "email-error-icon",
        ) as IconBaseProps;

        fireEvent.input(emailInput, {
            target: { value: faker.internet.email() },
        });

        const emailStatus = sut.getByTestId("email-status");
        expect(emailStatus.title).toBe(validationStub.errorMessage);
        // expect(emailStatus.textContent).toBe(errorMessage);
        expect(emailErrorIcon).toBeTruthy();
    });

    test("Should show password error if Validation fails", () => {
        const { sut, validationStub } = makeSut();
        const passwordInput = sut.getByTestId("password");
        const passwordErrorIcon = sut.getByTestId(
            "password-error-icon",
        ) as IconBaseProps;

        fireEvent.input(passwordInput, {
            target: { value: faker.internet.password() },
        });

        const passwordStatus = sut.getByTestId("password-status");
        expect(passwordStatus.title).toBe(validationStub.errorMessage);
        // expect(passwordStatus.textContent).toBe(errorMessage);
        expect(passwordErrorIcon).toBeTruthy();
    });

    test("Should show valid password state if Validation succeeds", () => {
        const { sut, validationStub } = makeSut();
        validationStub.errorMessage = null;
        const passwordInput = sut.getByTestId("password");
        // const passwordSuccessIcon = sut.getByTestId(
        //     "password-success-icon",
        // ) as IconBaseProps;

        fireEvent.input(passwordInput, {
            target: { value: faker.internet.password() },
        });

        const passwordStatus = sut.getByTestId("password-status");
        expect(passwordStatus.title).toBe("All good");
        // expect(passwordSuccessIcon).toBeTruthy();
    });
});
