export function slugify(text: string): string {
  return (
    text
      .toLowerCase()
      .trim()
      // Replace Thai characters with a phonetic approximation
      // (basic map — extend as needed)
      .replace(/[\u0E00-\u0E7F]+/g, (match) => thaiToRoman(match))
      // Normalize unicode (e.g. accented chars → base)
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      // Replace non-alphanumeric with hyphens
      .replace(/[^a-z0-9]+/g, "-")
      // Remove leading/trailing hyphens
      .replace(/^-+|-+$/g, "")
  );
}

function thaiToRoman(thai: string): string {
  return "";
}

export function blogSlug(blog: {
  id: number | string;
  titleEn?: string;
  titleTh?: string;
}): string {
  const base = slugify(blog.titleEn || blog.titleTh || String(blog.id));
  return base ? `${base}-${blog.id}` : `article-${blog.id}`;
}

export function idFromSlug(slug: string): string | null {
  const parts = slug.split("-");
  const last = parts[parts.length - 1];
  return /^\d+$/.test(last) ? last : null;
}
