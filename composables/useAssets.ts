export function useAssets() {
  const host = import.meta.env.VITE_API_URL || "http://localhost:4002";

  const getFullUrl = (path: string | null | undefined) => {
    // ถ้าไม่มี path หรือเป็นค่าว่าง
    if (!path) return "";

    // ถ้าเป็น URL เต็มอยู่แล้ว (เช่น blob: ของรูปใหม่ หรือ http ของรูปจากที่อื่น)
    if (path.startsWith("http") || path.startsWith("blob:")) {
      return path;
    }

    // ต่อ Host กับ Path เข้าด้วยกัน
    const cleanPath = path.startsWith("/") ? path : `/${path}`;
    return `${host}${cleanPath}`;
  };

  return { getFullUrl };
}
