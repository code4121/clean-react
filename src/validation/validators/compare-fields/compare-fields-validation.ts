import { IFieldValidation } from "@/validation/protocols/field-validation";
import { InvalidFieldError } from "@/validation/errors";

export class CompareFieldsValidation implements IFieldValidation {
    constructor(
        readonly field: string,
        private readonly fieldtoCompare: string,
    ) {}

    validate(input: object): Error {
        return input[this.field] !== input[this.fieldtoCompare]
            ? new InvalidFieldError()
            : null;
    }
}
