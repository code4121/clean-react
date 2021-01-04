export class UnexpectedError extends Error {
    constructor() {
        super("Something bad happened. Try again soon.");

        this.name = "UnexpectedError";
    }
}
