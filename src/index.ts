import axios from "axios";
import * as tunnel from "tunnel";

const { PROXY_HOST, PROXY_PORT, PROXY_USERNAME, PROXY_PASSWORD } = process.env;

const isProxyDefined = (): boolean => {
    return !!PROXY_HOST && !!PROXY_PORT;
};

const getProxyAuth = (): string | undefined => {
    if (PROXY_USERNAME && PROXY_PASSWORD) {
        return `${PROXY_USERNAME}:${PROXY_PASSWORD}`;
    }

    return;
};

let praxios = axios.create();

if (isProxyDefined()) {
    const httpsAgent = tunnel.httpsOverHttp({
        proxy: {
            host: PROXY_HOST!,
            port: Number(PROXY_PORT!),
            proxyAuth: getProxyAuth(),
        },
    });

    praxios = axios.create({ httpsAgent, proxy: false });
}

export { tunnel, axios as baseAxios };
export default praxios;
