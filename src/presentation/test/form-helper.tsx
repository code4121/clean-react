import { RenderResult } from "@testing-library/react";
import { IconBaseProps } from "react-icons";

export const testStatusForField = (
    sut: RenderResult,
    fieldName: string,
    validationError?: string,
    errorIcon?: IconBaseProps,
): void => {
    const fieldStatus = sut.getByTestId(`${fieldName}-status`);
    expect(fieldStatus.title).toBe(validationError || "All good");

    if (validationError) expect(errorIcon).toBeTruthy();
};

export const testChildCount = (
    sut: RenderResult,
    fieldName: string,
    count: number,
): void => {
    const element = sut.getByTestId(fieldName);
    expect(element.childElementCount).toBe(count);
};

export const testButtonIsDisabled = (
    sut: RenderResult,
    fieldName: string,
    isDisabled: boolean,
): void => {
    const button = sut.getByTestId(fieldName) as HTMLButtonElement;
    expect(button.disabled).toBe(isDisabled);
};
