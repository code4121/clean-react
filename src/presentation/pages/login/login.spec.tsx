import React from "react";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import faker from "faker";
import { IconBaseProps } from "react-icons";
import {
    render,
    RenderResult,
    fireEvent,
    cleanup,
    waitFor,
} from "@testing-library/react";

import {
    ValidationStub,
    AuthenticationSpy,
    SaveAccessTokenMock,
    Helper,
} from "@/presentation/test";

import { Login } from "@/presentation/pages";
import { InvalidCredentialsError } from "@/domain/errors";

type SutTypes = {
    sut: RenderResult;
    authenticationSpy: AuthenticationSpy;
    saveAccessTokenMock: SaveAccessTokenMock;
};

type SutParams = {
    validationError: string;
};

const history = createMemoryHistory({ initialEntries: ["/login"] });

const makeSut = (params?: SutParams): SutTypes => {
    const validationStub = new ValidationStub();
    validationStub.errorMessage = params?.validationError;

    const authenticationSpy = new AuthenticationSpy();
    const saveAccessTokenMock = new SaveAccessTokenMock();

    const sut = render(
        <Router history={history}>
            <Login
                validation={validationStub}
                authentication={authenticationSpy}
                saveAccessToken={saveAccessTokenMock}
            />
        </Router>,
    );

    return { sut, authenticationSpy, saveAccessTokenMock };
};

const simulateValidSubmit = async (
    sut: RenderResult,
    email = faker.internet.email(),
    password = faker.internet.password(),
): Promise<void> => {
    populateEmailField(sut, email);
    populatePasswordField(sut, password);

    const form = sut.getByTestId("form");
    fireEvent.submit(form);

    await waitFor(() => form);
};

const populateEmailField = (
    sut: RenderResult,
    email = faker.internet.email(),
): void => {
    const emailInput = sut.getByTestId("email");
    fireEvent.input(emailInput, {
        target: { value: email },
    });
};

const populatePasswordField = (
    sut: RenderResult,
    password = faker.internet.password(),
): void => {
    const passwordInput = sut.getByTestId("password");
    fireEvent.input(passwordInput, {
        target: { value: password },
    });
};

const testElementExists = (sut: RenderResult, fieldName: string): void => {
    const element = sut.getByTestId(fieldName);
    expect(element).toBeTruthy();
};

const testElementText = (
    sut: RenderResult,
    fieldName: string,
    text: string,
): void => {
    const element = sut.getByTestId(fieldName);
    expect(element.textContent).toBe(text);
};

describe("Login Component", () => {
    afterEach(cleanup);

    // eslint-disable-next-line jest/expect-expect
    test("Should start with initial state", () => {
        const validationError = faker.random.words();
        const { sut } = makeSut({ validationError });

        const emailErrorIcon = sut.getByTestId(
            "email-error-icon",
        ) as IconBaseProps;

        const passwordErrorIcon = sut.getByTestId(
            "password-error-icon",
        ) as IconBaseProps;

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
        Helper.testChildCount(sut, "error-wrap", 0);
        Helper.testButtonIsDisabled(sut, "submit", true);
    });

    // eslint-disable-next-line jest/expect-expect
    test("Should show email error if Validation fails", () => {
        const validationError = faker.random.words();
        const { sut } = makeSut({ validationError });
        populateEmailField(sut);
        const emailErrorIcon = sut.getByTestId(
            "email-error-icon",
        ) as IconBaseProps;

        Helper.testStatusForField(
            sut,
            "email",
            validationError,
            emailErrorIcon,
        );
    });

    // eslint-disable-next-line jest/expect-expect
    test("Should show password error if Validation fails", () => {
        const validationError = faker.random.words();
        const { sut } = makeSut({ validationError });
        populatePasswordField(sut);
        const passwordErrorIcon = sut.getByTestId(
            "password-error-icon",
        ) as IconBaseProps;

        Helper.testStatusForField(
            sut,
            "password",
            validationError,
            passwordErrorIcon,
        );
    });

    // eslint-disable-next-line jest/expect-expect
    test("Should show valid email state if Validation succeeds", () => {
        const { sut } = makeSut();
        populateEmailField(sut);

        Helper.testStatusForField(sut, "email");
    });

    // eslint-disable-next-line jest/expect-expect
    test("Should show valid password state if Validation succeeds", () => {
        const { sut } = makeSut();
        populatePasswordField(sut);

        Helper.testStatusForField(sut, "password");
    });

    // eslint-disable-next-line jest/expect-expect
    test("Should enable submit button if form is valid", () => {
        const { sut } = makeSut();

        populateEmailField(sut);
        populatePasswordField(sut);
        Helper.testButtonIsDisabled(sut, "submit", false);
    });

    // eslint-disable-next-line jest/expect-expect
    test("Should show spinner on submit", async () => {
        const { sut } = makeSut();

        await simulateValidSubmit(sut);

        testElementExists(sut, "spinner");
    });

    test("Should call Authentication with correct values", async () => {
        const { sut, authenticationSpy } = makeSut();
        const email = faker.internet.email();
        const password = faker.internet.password();

        await simulateValidSubmit(sut, email, password);

        expect(authenticationSpy.params).toEqual({
            email,
            password,
        });
    });

    test("Should call Authentication only once", async () => {
        const { sut, authenticationSpy } = makeSut();

        await simulateValidSubmit(sut);
        await simulateValidSubmit(sut);

        expect(authenticationSpy.callsCount).toBe(1);
    });

    test("Should not call Authentication if form is invalid", async () => {
        const validationError = faker.random.words();
        const { sut, authenticationSpy } = makeSut({ validationError });

        await simulateValidSubmit(sut);

        expect(authenticationSpy.callsCount).toBe(0);
    });

    // eslint-disable-next-line jest/expect-expect
    test("Should present error if Authentication fails", async () => {
        const { sut, authenticationSpy } = makeSut();
        const error = new InvalidCredentialsError();

        jest.spyOn(authenticationSpy, "auth").mockReturnValueOnce(
            Promise.reject(error),
        );

        await simulateValidSubmit(sut);

        Helper.testChildCount(sut, "error-wrap", 1);
        testElementText(sut, "main-error", error.message);
    });

    test("Should call SaveAccessToken on success", async () => {
        const { sut, authenticationSpy, saveAccessTokenMock } = makeSut();

        await simulateValidSubmit(sut);

        expect(saveAccessTokenMock.accessToken).toBe(
            authenticationSpy.account.accessToken,
        );
        expect(history.length).toBe(1);
        expect(history.location.pathname).toBe("/");
    });

    // eslint-disable-next-line jest/expect-expect
    test("Should present error if SaveAccessToken fails", async () => {
        const { sut, saveAccessTokenMock } = makeSut();
        const error = new InvalidCredentialsError();

        jest.spyOn(saveAccessTokenMock, "save").mockReturnValueOnce(
            Promise.reject(error),
        );

        await simulateValidSubmit(sut);

        Helper.testChildCount(sut, "error-wrap", 1);
        testElementText(sut, "main-error", error.message);
    });

    test("Should go to signup page", () => {
        const { sut } = makeSut();
        const register = sut.getByTestId("register");
        fireEvent.click(register);

        expect(history.length).toBe(2);
        expect(history.location.pathname).toBe("/signup");
    });
});
