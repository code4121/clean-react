import { IHttpPostClient } from "domain/data/protocols/http/http-post-client";
import { RemoteAuthentication } from "./remote-authentication";

// sut = system under test
describe("RemoteAuthentication", () => {
    test("Should call HttpPostClient with correct URL", async () => {
        class HttpPostClientSpy implements IHttpPostClient {
            url?: string;

            async post(url: string): Promise<void> {
                this.url = url;

                return await Promise.resolve();
            }
        }

        const url = "any_url";
        const httpPostClientSpy = new HttpPostClientSpy();
        const sut = new RemoteAuthentication(url, httpPostClientSpy);
        await sut.auth();

        expect(httpPostClientSpy.url).toBe(url);
    });
});
