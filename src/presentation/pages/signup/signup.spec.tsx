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

    // eslint-disable-next-line jest/expect-expect
    test("Should show email error if Validation fails", () => {
        const validationError = faker.random.words();
        const { sut } = makeSut({ validationError });
        const fieldName = "email";

        Helper.populateField(sut, fieldName);

        const emailErrorIcon = sut.getByTestId(
            `${fieldName}-error-icon`,
        ) as IconBaseProps;

        Helper.testStatusForField(
            sut,
            fieldName,
            validationError,
            emailErrorIcon,
        );
    });

    // eslint-disable-next-line jest/expect-expect
    test("Should show password error if Validation fails", () => {
        const validationError = faker.random.words();
        const { sut } = makeSut({ validationError });
        const fieldName = "password";

        Helper.populateField(sut, fieldName);

        const passwordErrorIcon = sut.getByTestId(
            `${fieldName}-error-icon`,
        ) as IconBaseProps;

        Helper.testStatusForField(
            sut,
            fieldName,
            validationError,
            passwordErrorIcon,
        );
    });

    // eslint-disable-next-line jest/expect-expect
    test("Should show passwordConfirmation error if Validation fails", () => {
        const validationError = faker.random.words();
        const { sut } = makeSut({ validationError });
        const fieldName = "passwordConfirmation";

        Helper.populateField(sut, fieldName);

        const passwordConfirmationErrorIcon = sut.getByTestId(
            `${fieldName}-error-icon`,
        ) as IconBaseProps;

        Helper.testStatusForField(
            sut,
            fieldName,
            validationError,
            passwordConfirmationErrorIcon,
        );
    });

    // eslint-disable-next-line jest/expect-expect
    test("Should show valid name state if Validation succeeds", () => {
        const { sut } = makeSut();
        Helper.populateField(sut, "name");

        Helper.testStatusForField(sut, "name");
    });

    // eslint-disable-next-line jest/expect-expect
    test("Should show valid email state if Validation succeeds", () => {
        const { sut } = makeSut();
        Helper.populateField(sut, "email");

        Helper.testStatusForField(sut, "email");
    });
});
