const BASE_URL = "https://openapi.programming-hero.com/api/bazardor";

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

export async function fetchJson<T>(path: string, retries = 3): Promise<T> {
  let lastError: Error = new Error("Failed to fetch");

  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      const res = await fetch(`${BASE_URL}${path}`, {
        headers: { Accept: "application/json" },
        next: { revalidate: 300 },
      });

      if (!res.ok) {
        lastError = new Error(`API responded with ${res.status}`);
        if (res.status === 404) throw lastError;
        if (attempt < retries) {
          await sleep(500 * (attempt + 1));
          continue;
        }
        throw lastError;
      }

      const text = await res.text();
      try {
        return JSON.parse(text) as T;
      } catch {
        lastError = new Error("API returned invalid JSON");
        if (attempt < retries) {
          await sleep(500 * (attempt + 1));
          continue;
        }
        throw lastError;
      }
    } catch (err) {
      lastError = err as Error;
      if (attempt < retries && !(err as Error).message.includes("404")) {
        await sleep(500 * (attempt + 1));
        continue;
      }
      throw lastError;
    }
  }

  throw lastError;
}
