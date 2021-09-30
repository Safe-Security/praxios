import axios from "axios";

let praxios;

describe("praxios", () => {
    const OLD_ENV = process.env;

    beforeEach(() => {
        jest.resetModules();
        process.env = { ...OLD_ENV };
    });

    afterAll(() => {
        process.env = OLD_ENV; // Restore old environment
    });

    test("base axios client is exported if proxy isn't defined", async () => {
        praxios = (await import("../src/index")).default;
        expect(praxios.defaults.httpsAgent).toBeUndefined();
        expect(praxios.defaults.proxy).toBeUndefined();
    });

    test("proxy instance with tunneling agent is available when proxy env vars are set", async () => {
        process.env.PROXY_HOST = "dummy";
        process.env.PROXY_PORT = "3128";

        const praxios = (await import("../src/index")).default;

        expect(praxios.defaults.proxy).toEqual(false);
        expect(praxios.defaults.httpsAgent.proxyOptions.host).toEqual("dummy");
        expect(praxios.defaults.httpsAgent.proxyOptions.port).toEqual(3128);
        expect(praxios.defaults.httpsAgent.proxyOptions.localAddress).toBeUndefined();
        expect(praxios.defaults.httpsAgent.proxyOptions.proxyAuth).toBeUndefined();
    });

    test("proxy instance with tunneling agent and proxy auth is available when proxy and auth env vars are set", async () => {
        process.env.PROXY_HOST = "dummy";
        process.env.PROXY_PORT = "3128";
        process.env.PROXY_USERNAME = "foo";
        process.env.PROXY_PASSWORD = "bar";

        const praxios = (await import("../src/index")).default;

        expect(praxios.defaults.httpsAgent.proxyOptions.proxyAuth).toEqual("foo:bar");
    });

    test("tunnel and base axios module is available", async () => {
        const praxios = await import("../src/index");

        expect(praxios).toHaveProperty("baseAxios");
        expect(praxios).toHaveProperty("tunnel");
    });

    test("NO_PROXY env var is not considered in the tunnel agent", async () => {
        process.env.PROXY_HOST = "dummy";
        process.env.PROXY_PORT = "3128";
        process.env.PROXY_USERNAME = "foo";
        process.env.PROXY_PASSWORD = "bar";
        process.env.NO_PROXY = "host1,host2";

        const praxios = (await import("../src/index")).default;

        expect(praxios.defaults.httpsAgent.proxyOptions.localAddress).toBeUndefined();
    });

    test("empty string for proxy host options are assumed as proxy not being set", async () => {
        process.env.PROXY_HOST = "";
        process.env.PROXY_PORT = "";

        const praxios = (await import("../src/index")).default;

        expect(praxios.defaults.httpsAgent).toBeUndefined();
        expect(praxios.defaults.proxy).toBeUndefined();
    });
});
