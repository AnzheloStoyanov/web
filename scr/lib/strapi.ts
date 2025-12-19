export const STRAPI_URL = (process.env.STRAPI_URL || "")
  .trim()
  .replace(/\/$/, "");
export const STRAPI_TOKEN = (process.env.STRAPI_TOKEN || "").trim();

export async function strapiFetch(path: string) {
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  const url = `${STRAPI_URL}${cleanPath}`;

  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${STRAPI_TOKEN}`,
      Accept: "application/json",
    },
    cache: "no-store",
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Strapi error ${res.status}: ${body}\nURL: ${url}`);
  }

  return res.json();
}
