import React from "react";
import { render, RenderResult } from "@testing-library/react";
import { IconBaseProps } from "react-icons";
import { FaExclamationCircle } from "react-icons/fa";
import Login from "./login";

type SutTypes = {
    sut: RenderResult;
};

const makeSut = (): SutTypes => {
    const sut = render(<Login />);

    return {
        sut,
    };
};

describe("Login Component", () => {
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
});
