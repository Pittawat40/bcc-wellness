export function useAssets() {
  const config = useRuntimeConfig();
  const host = (config.public.apiBase as string).replace("/api", "");

  const getFullUrl = (path: string | null | undefined) => {
    if (!path) return "";

    if (path.startsWith("http") || path.startsWith("blob:")) {
      return path;
    }

    const cleanPath = path.startsWith("/") ? path : `/${path}`;
    return `${host}${cleanPath}`;
  };

  return { getFullUrl };
}
