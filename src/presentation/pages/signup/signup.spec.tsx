import React from "react";
import { RenderResult, render } from "@testing-library/react";
import SignUp from "./signup";
import { IconBaseProps } from "react-icons";

type SutTypes = {
    sut: RenderResult;
};

const makeSut = (): SutTypes => {
    const sut = render(<SignUp />);

    return { sut };
};

const testStatusForField = (
    sut: RenderResult,
    fieldName: string,
    validationError?: string,
    errorIcon?: IconBaseProps,
): void => {
    const fieldStatus = sut.getByTestId(`${fieldName}-status`);
    expect(fieldStatus.title).toBe(validationError || "All good");

    if (validationError) expect(errorIcon).toBeTruthy();
};

const testChildCount = (
    sut: RenderResult,
    fieldName: string,
    count: number,
): void => {
    const element = sut.getByTestId(fieldName);
    expect(element.childElementCount).toBe(count);
};

const testButtonIsDisabled = (
    sut: RenderResult,
    fieldName: string,
    isDisabled: boolean,
): void => {
    const button = sut.getByTestId(fieldName) as HTMLButtonElement;
    expect(button.disabled).toBe(isDisabled);
};

describe("SignUp Component", () => {
    // eslint-disable-next-line jest/expect-expect
    test("Should start with initial state", () => {
        const validationError = "Field is required";
        const { sut } = makeSut();

        const nameErrorIcon = sut.getByTestId(
            "name-error-icon",
        ) as IconBaseProps;

        const emailErrorIcon = sut.getByTestId(
            "email-error-icon",
        ) as IconBaseProps;

        const passwordErrorIcon = sut.getByTestId(
            "password-error-icon",
        ) as IconBaseProps;

        const passwordConfirmationErrorIcon = sut.getByTestId(
            "passwordConfirmation-error-icon",
        ) as IconBaseProps;

        testStatusForField(sut, "name", validationError, nameErrorIcon);
        testStatusForField(sut, "email", validationError, emailErrorIcon);
        testStatusForField(sut, "password", validationError, passwordErrorIcon);
        testStatusForField(
            sut,
            "passwordConfirmation",
            validationError,
            passwordConfirmationErrorIcon,
        );
        testChildCount(sut, "error-wrap", 0);
        testButtonIsDisabled(sut, "submit", true);
    });
});
