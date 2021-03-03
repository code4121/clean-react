import React from "react";
import { IconBaseProps } from "react-icons";
import { SignUp } from "@/presentation/pages";
import { RenderResult, render } from "@testing-library/react";
import { Helper } from "@/presentation/test";

type SutTypes = {
    sut: RenderResult;
};

const makeSut = (): SutTypes => {
    const sut = render(<SignUp />);

    return { sut };
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

        Helper.testStatusForField(sut, "name", validationError, nameErrorIcon);
        Helper.testStatusForField(
            sut,
            "email",
            validationError,
            emailErrorIcon,
        );
        Helper.testStatusForField(
            sut,
            "password",
            validationError,
            passwordErrorIcon,
        );
        Helper.testStatusForField(
            sut,
            "passwordConfirmation",
            validationError,
            passwordConfirmationErrorIcon,
        );
        Helper.testChildCount(sut, "error-wrap", 0);
        Helper.testButtonIsDisabled(sut, "submit", true);
    });
});
