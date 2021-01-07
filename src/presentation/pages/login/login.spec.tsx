import React from "react";
import {
    render,
    RenderResult,
    fireEvent,
    cleanup,
} from "@testing-library/react";
import { IconBaseProps } from "react-icons";
import { FaExclamationCircle } from "react-icons/fa";
import { IValidation } from "@/presentation/protocols/validation";

import Login from "./login";

type SutTypes = {
    sut: RenderResult;
    validationSpy: ValidationSpy;
};

class ValidationSpy implements IValidation {
    errorMessage: string;
    input: object;

    validate(input: object): string {
        this.input = input;
        return this.errorMessage;
    }
}

const makeSut = (): SutTypes => {
    const validationSpy = new ValidationSpy();
    const sut = render(<Login validation={validationSpy} />);

    return {
        sut,
        validationSpy,
    };
};

describe("Login Component", () => {
    afterEach(cleanup);

    test("Should start with initial state", () => {
        const { sut } = makeSut();

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
        expect(emailStatus.title).toBe("Required field");
        expect(emailErrorIcon).toBeTruthy();
        expect(passwordStatus.title).toBe("Required field");
        expect(passwordErrorIcon).toBeTruthy();
    });

    test("Should call Validation with correct email", () => {
        const { sut, validationSpy } = makeSut();

        const emailInput = sut.getByTestId("email");

        fireEvent.input(emailInput, { target: { value: "any_email" } });

        expect(validationSpy.input).toEqual({
            email: "any_email",
        });
    });
});
