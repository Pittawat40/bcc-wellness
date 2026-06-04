// composables/useAdminApi.ts
export function useAdminApi() {
  const config = useRuntimeConfig();
  const base = config.public.apiBase as string;

  function getToken() {
    if (process.client) return localStorage.getItem("ivf_token") || "";
    return "";
  }

  async function request(
    method: string,
    path: string,
    body?: object | FormData,
  ) {
    const token = getToken();
    const headers: Record<string, string> = {
      Authorization: `Bearer ${token}`,
    };

    let bodyInit: BodyInit | undefined;
    if (body instanceof FormData) {
      bodyInit = body;
    } else if (body) {
      headers["Content-Type"] = "application/json";
      bodyInit = JSON.stringify(body);
    }

    const r = await fetch(`${base}${path}`, {
      method,
      headers,
      body: bodyInit,
    });
    const data = await r.json().catch(() => ({}));
    if (!r.ok) throw new Error(data.error || `Error ${r.status}`);
    return data;
  }

  function buildQuery(params: Record<string, string | number | undefined>) {
    const q = new URLSearchParams();
    for (const [k, v] of Object.entries(params)) {
      if (v !== undefined && v !== "") q.set(k, String(v));
    }
    const s = q.toString();
    return s ? "?" + s : "";
  }

  return {
    get: (path: string) => request("GET", path),
    post: (path: string, body: object | FormData) =>
      request("POST", path, body),
    put: (path: string, body: object | FormData) => request("PUT", path, body),
    del: (path: string) => request("DELETE", path),

    // auth helpers
    login: (username: string, password: string) =>
      request("POST", "/auth/login", { username, password }),
    me: () => request("GET", "/auth/me"),
    changePassword: (currentPassword: string, newPassword: string) =>
      request("POST", "/auth/change-password", {
        currentPassword,
        newPassword,
      }),

    // token helpers
    saveToken: (token: string) => localStorage.setItem("ivf_token", token),
    clearToken: () => localStorage.removeItem("ivf_token"),
    isLoggedIn: () => !!getToken(),

    // ── appointments
    getAppointments: (
      params: Record<string, string | number | undefined> = {},
    ) => request("GET", `/appointments/admin/all${buildQuery(params)}`),
    updateAppointment: (
      id: number,
      payload: { status?: string; note?: string },
    ) => request("PUT", `/appointments/${id}`, payload),
    deleteAppointment: (id: number) => request("DELETE", `/appointments/${id}`),

    // ── articles
    getArticles: (params: Record<string, string | number | undefined> = {}) =>
      request("GET", `/articles/admin/all${buildQuery(params)}`),

    // ── videos
    getVideos: (params: Record<string, string | number | undefined> = {}) =>
      request("GET", `/videos/admin/all${buildQuery(params)}`),

    // ── reviews
    getReviews: (params: Record<string, string | number | undefined> = {}) =>
      request("GET", `/reviews/admin/all${buildQuery(params)}`),

    // ── doctors (now returns { doctors, total })
    getDoctors: (params: Record<string, string | number | undefined> = {}) =>
      request("GET", `/doctors/admin/all${buildQuery(params)}`),

    // ── faqs (now returns { faqs, total })
    getFaqs: (params: Record<string, string | number | undefined> = {}) =>
      request("GET", `/faqs/admin/all${buildQuery(params)}`),
  };
}
