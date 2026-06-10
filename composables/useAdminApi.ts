// composables/useAdminApi.ts
export function useAdminApi() {
  const config = useRuntimeConfig();
  const base = config.public.apiBase as string;

  // ป้องกัน refresh ซ้อน กรณีมีหลาย request พร้อมกัน
  let isRefreshing = false;
  let refreshQueue: Array<(token: string | null) => void> = [];

  function getToken() {
    if (process.client) return localStorage.getItem("ivf_token") || "";
    return "";
  }

  function getRefreshToken() {
    if (process.client) return localStorage.getItem("ivf_refresh_token") || "";
    return "";
  }

  function clearAllTokens() {
    localStorage.removeItem("ivf_token");
    localStorage.removeItem("ivf_refresh_token");
  }

  function redirectToLogin() {
    clearAllTokens();
    window.location.href = "/admin";
  }

  async function tryRefresh(): Promise<string | null> {
    // ถ้ากำลัง refresh อยู่แล้ว ให้รอใน queue
    if (isRefreshing) {
      return new Promise((resolve) => {
        refreshQueue.push(resolve);
      });
    }

    const refreshToken = getRefreshToken();
    if (!refreshToken) return null;

    isRefreshing = true;

    try {
      const r = await fetch(`${base}/auth/refresh`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refreshToken }),
      });

      if (!r.ok) {
        // refresh ไม่ได้จริงๆ — flush queue ด้วย null
        refreshQueue.forEach((resolve) => resolve(null));
        refreshQueue = [];
        return null;
      }

      const data = await r.json();
      localStorage.setItem("ivf_token", data.accessToken);

      // รองรับ token rotation — บันทึก refreshToken ใหม่ถ้า BE ส่งมา
      if (data.refreshToken) {
        localStorage.setItem("ivf_refresh_token", data.refreshToken);
      }

      // flush queue ด้วย token ใหม่
      refreshQueue.forEach((resolve) => resolve(data.accessToken));
      refreshQueue = [];

      return data.accessToken;
    } catch {
      refreshQueue.forEach((resolve) => resolve(null));
      refreshQueue = [];
      return null;
    } finally {
      isRefreshing = false;
    }
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

    let r = await fetch(`${base}${path}`, {
      method,
      headers,
      body: bodyInit,
    });

    if (r.status === 401 || r.status === 403) {
      const newToken = await tryRefresh();

      if (!newToken) {
        // refresh ไม่สำเร็จจริงๆ → redirect ที่นี่เท่านั้น
        redirectToLogin();
        throw new Error("Session expired");
      }

      // retry request ด้วย token ใหม่
      r = await fetch(`${base}${path}`, {
        method,
        headers: {
          ...headers,
          Authorization: `Bearer ${newToken}`,
        },
        body: bodyInit,
      });
    }

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

    login: (username: string, password: string) =>
      request("POST", "/auth/login", { username, password }),
    me: () => request("GET", "/auth/me"),
    changePassword: (currentPassword: string, newPassword: string) =>
      request("POST", "/auth/change-password", {
        currentPassword,
        newPassword,
      }),

    saveToken: (accessToken: string, refreshToken: string) => {
      localStorage.setItem("ivf_token", accessToken);
      localStorage.setItem("ivf_refresh_token", refreshToken);
    },
    clearToken: () => {
      const refreshToken = getRefreshToken();
      if (refreshToken) {
        fetch(`${base}/auth/logout`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ refreshToken }),
        }).catch(() => {});
      }
      clearAllTokens();
    },
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

    // ── doctors
    getDoctors: (params: Record<string, string | number | undefined> = {}) =>
      request("GET", `/doctors/admin/all${buildQuery(params)}`),

    // ── faqs
    getFaqs: (params: Record<string, string | number | undefined> = {}) =>
      request("GET", `/faqs/admin/all${buildQuery(params)}`),
  };
}
