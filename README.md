# BCC IVF Wellness – Nuxt SSG Project

เว็บไซต์สำหรับศูนย์รักษาภาวะมีบุตรยากด้วย IVF สร้างด้วย Nuxt 3 SSG + Tailwind CSS พร้อม SEO ครบถ้วน

## Tech Stack

- **Nuxt 3** – SSG (Static Site Generation)
- **Tailwind CSS** – Utility-first CSS framework
- **@nuxtjs/seo** – Sitemap, robots.txt, OG tags, Schema.org
- **@nuxt/image** – Image optimization
- **Sarabun + Lora fonts** – Typography สำหรับภาษาไทย

## การติดตั้ง

```bash
npm install
```

## การพัฒนา

```bash
npm run dev
```

เปิด http://localhost:3000

## Build สำหรับ production

```bash
# Generate static files
npm run generate

# Output อยู่ใน .output/public
```

## โครงสร้างโปรเจค

```
ivf-wellness/
├── assets/css/main.css       # Global styles + Tailwind
├── components/
│   ├── TheNavbar.vue         # Navigation bar
│   └── TheFooter.vue         # Footer
├── layouts/
│   └── default.vue           # Default layout
├── pages/
│   ├── index.vue             # หน้าหลัก (Hero, Services, Process, Doctors, Reviews, CTA)
│   ├── services.vue          # บริการทั้งหมด (IVF, IUI, ICSI, Egg Freezing)
│   ├── about.vue             # เกี่ยวกับเรา
│   ├── doctors.vue           # ทีมแพทย์
│   ├── faq.vue               # คำถามที่พบบ่อย (Accordion)
│   └── contact.vue           # ติดต่อ + ฟอร์มนัดหมาย
├── public/
│   ├── favicon.svg
│   └── robots.txt
├── nuxt.config.ts            # Nuxt config + SEO settings
└── tailwind.config.ts        # Tailwind + design tokens
```

## SEO Features

- `useSeoMeta()` ทุกหน้า – title, description, og:title, og:description, twitter:card
- `useSchemaOrg()` หน้าหลัก – MedicalClinic structured data
- Sitemap auto-generated โดย `@nuxtjs/seo`
- `robots.txt` กำหนดเอง
- Canonical URL redirect
- OG image support

## Design System

**Colors:**
- `brand` – warm orange (#c9561e) สำหรับ CTA และ accent
- `sage` – ฟอนต์สีเขียวธรรมชาติ สำหรับ secondary
- `warm` – background สีครีมอบอุ่น

**Typography:**
- Display/Heading: **Lora** (serif) – ดูสง่า น่าเชื่อถือ
- Body: **Sarabun** – อ่านง่ายทั้งภาษาไทยและอังกฤษ

## การเพิ่มรูปภาพ

วางรูปใน `public/images/` แล้วใช้ `<NuxtImg>`:

```vue
<NuxtImg src="/images/doctor.jpg" alt="แพทย์ IVF" width="800" height="600" />
```

## การ Deploy

รอง Hosting ทุกรูปแบบ Static:
- **Vercel**: `vercel deploy`
- **Netlify**: drag `.output/public` ขึ้น UI
- **GitHub Pages**: push `.output/public` ไป `gh-pages` branch
