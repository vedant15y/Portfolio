const staticPaths = new Set([
  "/",
  "/index.html",
  "/vedant-os-portfolio.html"
]);

function withIndexFallback(request) {
  const url = new URL(request.url);
  if (staticPaths.has(url.pathname)) {
    url.pathname = "/index.html";
    return new Request(url, request);
  }
  return request;
}

export default {
  async fetch(request, env) {
    const response = await env.ASSETS.fetch(withIndexFallback(request));
    if (response.status !== 404) return response;

    const url = new URL(request.url);
    if (!url.pathname.includes(".")) {
      url.pathname = "/index.html";
      return env.ASSETS.fetch(new Request(url, request));
    }

    return response;
  }
};
