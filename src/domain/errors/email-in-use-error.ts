export class EmailInUseError extends Error {
    constructor() {
        super("This email already exists");

        this.name = "EmailInUseError";
    }
}
