import { InvalidFieldError } from "@/validation/errors";
import { IFieldValidation } from "@/validation/protocols/field-validation";

export class EmailValidation implements IFieldValidation {
    constructor(readonly field: string) {}

    validate(input: object): Error {
        const emailRegex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;

        return !input[this.field] || emailRegex.test(input[this.field])
            ? null
            : new InvalidFieldError();
    }
}
