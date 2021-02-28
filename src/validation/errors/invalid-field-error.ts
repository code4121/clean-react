export class InvalidFieldError extends Error {
    constructor() {
        super("value is invalid");
    }
}
