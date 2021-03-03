import React from "react";
import { IconBaseProps } from "react-icons";
import faker from "faker";
import { RenderResult, render, cleanup } from "@testing-library/react";
import { SignUp } from "@/presentation/pages";
import { Helper, ValidationStub } from "@/presentation/test";

type SutTypes = {
    sut: RenderResult;
};

type SutParams = {
    validationError: string;
};

const makeSut = (params?: SutParams): SutTypes => {
    const validationStub = new ValidationStub();
    validationStub.errorMessage = params?.validationError;

    const sut = render(<SignUp validation={validationStub} />);

    return { sut };
};

describe("SignUp Component", () => {
    afterEach(cleanup);

    // eslint-disable-next-line jest/expect-expect
    test("Should start with initial state", () => {
        const validationError = faker.random.words();
        const { sut } = makeSut({ validationError });

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
            "Field is required",
            emailErrorIcon,
        );
        Helper.testStatusForField(
            sut,
            "password",
            "Field is required",
            passwordErrorIcon,
        );
        Helper.testStatusForField(
            sut,
            "passwordConfirmation",
            "Field is required",
            passwordConfirmationErrorIcon,
        );
        Helper.testChildCount(sut, "error-wrap", 0);
        Helper.testButtonIsDisabled(sut, "submit", true);
    });

    // eslint-disable-next-line jest/expect-expect
    test("Should show name error if Validation fails", () => {
        const validationError = faker.random.words();
        const { sut } = makeSut({ validationError });
        const fieldName = "name";

        Helper.populateField(sut, fieldName);

        const nameErrorIcon = sut.getByTestId(
            `${fieldName}-error-icon`,
        ) as IconBaseProps;

        Helper.testStatusForField(
            sut,
            fieldName,
            validationError,
            nameErrorIcon,
        );
    });
});
