export const config = { runtime: "edge" };

const STORAGE_SERVER = (process.env.MAIN_NODE_IP || "").replace(/\/$/, "");

const IGNORED_TAGS = new Set([
  "host", "connection", "upgrade", "forwarded", "te", "trailer",
  "x-forwarded-host", "x-forwarded-proto", "x-vercel-id"
]);

export default async function fetchStreamData(req) {
  if (!STORAGE_SERVER) {
    return new Response("Storage Node Disconnected", { status: 503 });
  }

  try {
    const incomingUrl = new URL(req.url);
    const remoteEndpoint = `https://${STORAGE_SERVER}${incomingUrl.pathname}${incomingUrl.search}`;

    const safeHeaders = new Headers();
    for (const [key, val] of req.headers) {
      if (IGNORED_TAGS.has(key.toLowerCase()) || key.startsWith("x-vercel-")) continue;
      safeHeaders.set(key, val);
    }

    safeHeaders.set("X-Data-Chunk-Type", "Text-Stream");

    return await fetch(remoteEndpoint, {
      method: req.method,
      headers: safeHeaders,
      body: (req.method !== "GET" && req.method !== "HEAD") ? req.body : undefined,
      duplex: "half",
      redirect: "manual",
    });
  } catch (error) {
    return new Response("Data Fetch Interrupted", { status: 500 });
  }
}
