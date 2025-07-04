import { isValidUUID } from "./helpers";
import pkg from '../../package.json' with { type: 'json' };

export function initializeParams(request, env) {
    const url = new URL(request.url);
    const searchParams = new URLSearchParams(url.search);
    globalThis.panelVersion = pkg.version;
    globalThis.defaultHttpPorts = [80, 8080, 2052, 2082, 2086, 2095, 8880];
    globalThis.defaultHttpsPorts = [443, 8443, 2053, 2083, 2087, 2096];
    globalThis.userID = '914b4e56-ee51-448a-aac4-6fd71576e7e2';
    globalThis.TRPassword = '%^&*^JDHJFG*^&&(';
    globalThis.proxyIPs = env.PROXY_IP || 'bpb.yousef.isegaro.com';
    globalThis.hostName = request.headers.get('Host');
    globalThis.pathName = url.pathname;
    globalThis.client = searchParams.get('app');
    globalThis.urlOrigin = url.origin;
    globalThis.dohURL = env.DOH_URL || 'https://cloudflare-dns.com/dns-query';
    globalThis.fallbackDomain = env.FALLBACK || 'speed.cloudflare.com';
    globalThis.subPath = env.SUB_PATH || globalThis.userID;
    if (!['/error', '/secrets', '/favicon.ico'].includes(globalThis.pathName)) {
        if (!globalThis.userID || !globalThis.TRPassword) throw new Error(`Please set UUID and Trojan password first. Please visit <a href="${globalThis.urlOrigin}/secrets" target="_blank">here</a> to generate them.`, { cause: "init" });
        if (globalThis.userID && !isValidUUID(globalThis.userID)) throw new Error(`Invalid UUID: ${globalThis.userID}`, { cause: "init" });
        if (typeof env.kv !== 'object') throw new Error('KV Dataset is not properly set! Please refer to tutorials.', { cause: "init" });
    }
}
