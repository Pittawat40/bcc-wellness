// composables/useApi.ts
// helper กลางสำหรับ fetch ข้อมูลจาก API (public, ไม่ต้อง token)

export function useApiBase() {
  return useRuntimeConfig().public.apiBase as string;
}

async function $fetch_api(path: string, params: Record<string, string> = {}) {
  const base = useApiBase();
  const query = new URLSearchParams(params).toString();
  const url = `${base}${path}${query ? "?" + query : ""}`;
  const r = await fetch(url);
  if (!r.ok) throw new Error(`API ${r.status}`);
  return r.json();
}

export function useDoctors() {
  return useAsyncData("doctors", () => $fetch_api("/doctors"));
}

export function useFaqs(params: Record<string, string> = {}) {
  const key = "faqs-" + JSON.stringify(params);
  return useAsyncData(key, () => $fetch_api("/faqs", params));
}

export function useReviews(params: Record<string, string> = {}) {
  const key = "reviews-" + JSON.stringify(params);
  return useAsyncData(key, () => $fetch_api("/reviews", params));
}

export function useArticles(params: Record<string, string> = {}) {
  const key = "articles-" + JSON.stringify(params);
  return useAsyncData(key, () => $fetch_api("/articles", params));
}

// ── ดึงบทความเดี่ยวด้วย id หรือ slug
export function useArticle(idOrSlug: string) {
  return useAsyncData(`article-${idOrSlug}`, () =>
    $fetch_api(`/articles/${idOrSlug}`),
  );
}

export function useVideos(params: Record<string, string> = {}) {
  const key = "videos-" + JSON.stringify(params);
  return useAsyncData(key, () => $fetch_api("/videos", params));
}

export function useContactInfo() {
  return useAsyncData("contact", () => $fetch_api("/settings/contact"));
}

export function useSocialMedia() {
  return useAsyncData("social", () => $fetch_api("/settings/social"));
}

// ── ส่งฟอร์มนัดหมาย (POST public)
export async function submitAppointment(payload: {
  name: string;
  phone: string;
  email?: string;
  service?: string;
  message?: string;
}) {
  const base = useRuntimeConfig().public.apiBase as string;
  const r = await fetch(`${base}/appointments`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const data = await r.json().catch(() => ({}));
  if (!r.ok) throw new Error(data.error || "เกิดข้อผิดพลาด");
  return data;
}
