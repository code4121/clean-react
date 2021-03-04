import { InvalidFieldError } from "@/validation/errors";
import { MinLengthValidation } from "./min-length-validation";
import faker from "faker";

const makeSut = (field: string, minLength: number): MinLengthValidation =>
    new MinLengthValidation(field, minLength);

describe("MinLengthValidation", () => {
    test("Should return error if value is invalid", () => {
        const field = faker.database.column();
        const sut = makeSut(field, 5);
        const error = sut.validate({ [field]: faker.lorem.word(3) });
        expect(error).toEqual(new InvalidFieldError());
    });

    test("Should return falsy if value is valid", () => {
        const field = faker.database.column();
        const sut = makeSut(field, 5);
        const error = sut.validate({ [field]: faker.lorem.word(5) });
        expect(error).toBeFalsy();
    });

    test("Should return falsy if fiedl does not exists in schema", () => {
        const sut = makeSut(faker.database.column(), 5);
        const error = sut.validate({
            [faker.database.column()]: faker.lorem.word(5),
        });
        expect(error).toBeFalsy();
    });
});
