const BASE = "http://localhost:3000/products";

async function req(url, options = {}) {
  const res = await fetch(url, options);

  if (!res.ok) {
    const txt = await res.text().catch(() => "");
    throw new Error(`[${res.status}] ${res.statusText} | ${txt}`);
  }

  if (options.method === "DELETE") {
    return { data: null, total: null };
  }

  const contentType = res.headers.get("content-type") || "";
  const data = contentType.includes("application/json") ? await res.json() : null;

  const totalHeader = res.headers.get("X-Total-Count");
  const total = totalHeader ? Number(totalHeader) : null;

  return { data, total };
}

export async function listProducts({ page, limit, q, sort, order, status }) {
  const params = new URLSearchParams();
  params.set("_page", String(page));
  params.set("_limit", String(limit));

  if (q) params.set("q", q);
  params.set("_sort", sort || "price");
  params.set("_order", order || "asc");
  if (status !== "all") params.set("status", status);

  // IMPORTANT: json-server вернёт МАССИВ
  return req(`${BASE}?${params.toString()}`);
}

export function createProduct(payload) {
  return req(BASE, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
}

export function updateProduct(id, payload) {
  return req(`${BASE}/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
}

export function deleteProduct(id) {
  return req(`${BASE}/${id}`, { method: "DELETE" });
}