import { IFieldValidation } from "@/validation/protocols/field-validation";
import { InvalidFieldError } from "@/validation/errors";

export class CompareFieldsValidation implements IFieldValidation {
    constructor(
        readonly field: string,
        private readonly valuetoCompare: string,
    ) {}

    validate(value: string): Error {
        return new InvalidFieldError();
    }
}
