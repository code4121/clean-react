import React from "react";
import { render } from "@testing-library/react";
import { IconBaseProps } from "react-icons";
import { FaExclamationCircle } from "react-icons/fa";
import Login from "./login";

describe("Login Component", () => {
    test("Should start with initial state", () => {
        const { getByTestId } = render(<Login />);

        const errorWrap = getByTestId("error-wrap");
        const submitButton = getByTestId("submit") as HTMLButtonElement;
        const emailStatus = getByTestId("email-status");
        const emailErrorIcon = getByTestId("email-error-icon") as IconBaseProps;
        const passwordStatus = getByTestId("password-status");
        const passwordErrorIcon = getByTestId(
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
