// composables/useI18n.ts

const messages = {
  th: {
    // ── Navbar
    nav: {
      home: "หน้าแรก",
      about: "เกี่ยวกับเรา",
      services: "บริการของเรา",
      blog: "บทความและประสบการณ์",
      faq: "คำถามที่พบบ่อย",
      contact: "ติดต่อเรา",
      cta: "นัดหมายแพทย์",
      openMenu: "เปิดเมนู",
      closeMenu: "ปิดเมนู",
      changeLang: "เปลี่ยนภาษา",
    },

    // ── Hero
    hero: {
      badge: "ศูนย์รักษาผู้มีบุตรยากครบวงจร",
      title: "เริ่มต้นเส้นทาง",
      title2: "สู่ความเป็นพ่อแม่",
      title3: "ด้วยความใส่ใจ",
      subtitle:
        " ด้วยเทคโนโลยี IVF ที่ทันสมัยและทีมแพทย์ผู้เชี่ยวชาญ เราพร้อมดูแลคุณทุกก้าวของการรักษาภาวะมีบุตรยากอย่างครบวงจร",
      ctaPrimary: "นัดหมายปรึกษาแพทย์ฟรี",
      ctaSecondary: "ดูบริการทั้งหมด",
      statsSuccess: "อัตราความสำเร็จ",
      statsPatients: "คู่รักที่ไว้วางใจ",
      statsExp: "ปีประสบการณ์",
    },

    // ── Trust Bar
    trust: {
      immediately: "เริ่มการรักษาได้ทันทีโดยไม่ต้องรอคิว",
      consultations: "ปรึกษาออนไลน์แบบยืดหยุ่นตาม lifestyle ของคุณ",
      multilingual: "ทีมแพทย์ผู้เชี่ยวชาญที่สามารถสื่อสารได้หลายภาษา",
      treatment: "วางแผนการรักษาเฉพาะบุคคลตามความต้องการของคุณ",
      transparent: "ราคาชัดเจน ครอบคลุมทุกอย่าง ไม่มีค่าใช้จ่ายแอบแฝง",
    },

    // ── Services
    services: {
      badge: "บริการของเรา",
      title: "การรักษาที่ครอบคลุม\nทุกความต้องการ",
      subtitle: "เราให้บริการรักษาภาวะมีบุตรยากด้วยเทคโนโลยีทันสมัย",
      learnMore: "เรียนรู้เพิ่มเติม",
      viewAll: "ดูบริการทั้งหมด",
    },

    // ── Treatment Steps
    steps: {
      badge: "ขั้นตอนการรักษา",
      title: "เส้นทางสู่ความสำเร็จ\nของคุณ",
      subtitle: "กระบวนการที่ชัดเจน โปร่งใส และดูแลใส่ใจทุกขั้นตอน",
    },

    // ── Gallery
    gallery: {
      badge: "แกลเลอรี่",
      title: "บรรยากาศ\nภายในคลินิก",
      subtitle: "สภาพแวดล้อมที่อบอุ่น สะอาด และได้มาตรฐาน",
    },

    // ── Reviews
    reviews: {
      badge: "รีวิวจากผู้ใช้บริการ",
      title: "เสียงจากหัวใจ\nของครอบครัวเรา",
      subtitle: "ความสุขของครอบครัวคุณคือแรงบันดาลใจของเรา",
    },

    // ── CTA Section
    cta: {
      title: "พร้อมเริ่มต้นแล้วหรือยัง?",
      subtitle: "ปรึกษาแพทย์ผู้เชี่ยวชาญของเราฟรี ไม่มีค่าใช้จ่าย",
      primary: "นัดหมายแพทย์",
      secondary: "ติดต่อสอบถาม",
    },

    // ── About Page
    about: {
      heroTitle: "เกี่ยวกับ BCC IVF",
      heroSubtitle: "ศูนย์รักษาผู้มีบุตรยากที่คุณไว้วางใจได้",
      missionTitle: "พันธกิจของเรา",
      visionTitle: "วิสัยทัศน์",
      teamTitle: "ทีมแพทย์ผู้เชี่ยวชาญ",
    },

    // ── Services Page
    servicesPage: {
      heroTitle: "บริการของเรา",
      heroSubtitle: "การรักษาครบวงจรด้วยเทคโนโลยีทันสมัย",
    },

    // ── Blog Page
    blog: {
      heroTitle: "บทความและประสบการณ์",
      heroSubtitle: "ความรู้และเรื่องราวจากผู้เชี่ยวชาญ",
      searchPlaceholder: "ค้นหาบทความ...",
      all: "ทั้งหมด",
      readMore: "อ่านต่อ",
      noResult: "ไม่พบบทความ",
      loading: "กำลังโหลด...",
    },

    // ── FAQ Page
    faq: {
      heroTitle: "คำถามที่พบบ่อย",
      heroSubtitle: "ข้อมูลที่คุณอยากรู้เกี่ยวกับการรักษา",
      searchPlaceholder: "ค้นหาคำถาม...",
      all: "ทั้งหมด",
      noResult: "ไม่พบคำถาม",
      loading: "กำลังโหลด...",
    },

    // ── Doctors Page
    doctors: {
      heroTitle: "ทีมแพทย์ผู้เชี่ยวชาญ",
      heroSubtitle: "แพทย์เฉพาะทางที่มีประสบการณ์และความเชี่ยวชาญสูง",
      education: "การศึกษา",
      specialties: "ความเชี่ยวชาญ",
      loading: "กำลังโหลด...",
    },

    // ── Contact Page
    contact: {
      heroTitle: "ติดต่อเรา",
      heroSubtitle: "เราพร้อมให้คำปรึกษาและตอบทุกข้อสงสัย",
      nameLabel: "ชื่อ-นามสกุล",
      phoneLabel: "เบอร์โทรศัพท์",
      emailLabel: "อีเมล",
      messageLabel: "ข้อความ",
      submitBtn: "ส่งข้อความ",
      successMsg: "ส่งข้อความสำเร็จแล้ว เราจะติดต่อกลับเร็วๆ นี้",
      address: "ที่อยู่",
      hours: "เวลาทำการ",
      phone: "โทรศัพท์",
    },

    // ── Footer
    footer: {
      tagline:
        "ศูนย์รักษาผู้มีบุตรยากครบวงจร ด้วยเทคโนโลยีทันสมัยและทีมแพทย์เฉพาะทาง",
      quickLinks: "ลิงก์ด่วน",
      services: "บริการ",
      contact: "ติดต่อ",
      rights: "สงวนลิขสิทธิ์",
      privacy: "นโยบายความเป็นส่วนตัว",
      terms: "ข้อกำหนดการใช้งาน",
    },

    // ── Cookie
    cookie: {
      message: "เราใช้คุกกี้เพื่อพัฒนาประสบการณ์ของคุณ",
      accept: "ยอมรับ",
      decline: "ปฏิเสธ",
    },
  },

  en: {
    // ── Navbar
    nav: {
      home: "Home",
      about: "About Us",
      services: "Our Services",
      blog: "Articles & Stories",
      faq: "FAQ",
      contact: "Contact Us",
      cta: "Book Appointment",
      openMenu: "Open menu",
      closeMenu: "Close menu",
      changeLang: "Change Language",
    },

    // ── Hero
    hero: {
      badge: "Comprehensive Fertility Center",
      title: "Begin Your Journey",
      title2: "to Parenthood",
      title3: "with Dedicated Care",
      subtitle:
        "With advanced IVF technology and a team of expert physicians, we are ready to care for you through every step of your comprehensive fertility treatment.",
      ctaPrimary: "Free Consultation",
      ctaSecondary: "View All Services",
      statsSuccess: "Success Rate",
      statsPatients: "Trusting Couples",
      statsExp: "Years of Experience",
    },

    // ── Trust Bar
    trust: {
      immediately: "Start your treatment immediately with no waiting lists",
      consultations: "Flexible online consultations that fit your lifestyle",
      multilingual: "A multilingual team of expert physicians",
      treatment: "Personalized treatment plans tailored to your needs",
      transparent: "Transparent pricing with no hidden fees",
    },

    // ── Services
    services: {
      badge: "Our Services",
      title: "Comprehensive Treatment\nfor Every Need",
      subtitle: "We offer fertility treatments with cutting-edge technology.",
      learnMore: "Learn More",
      viewAll: "View All Services",
    },

    // ── Treatment Steps
    steps: {
      badge: "Treatment Process",
      title: "Your Path\nto Success",
      subtitle: "A clear, transparent process with care at every step.",
    },

    // ── Gallery
    gallery: {
      badge: "Gallery",
      title: "Inside\nOur Clinic",
      subtitle: "A warm, clean, and standards-compliant environment.",
    },

    // ── Reviews
    reviews: {
      badge: "Patient Reviews",
      title: "Words from the Hearts\nof Our Families",
      subtitle: "Your family's happiness is our inspiration.",
    },

    // ── CTA Section
    cta: {
      title: "Ready to Get Started?",
      subtitle: "Consult our specialists for free, no charge.",
      primary: "Book Appointment",
      secondary: "Contact Us",
    },

    // ── About Page
    about: {
      heroTitle: "About BCC IVF",
      heroSubtitle: "The fertility center you can trust.",
      missionTitle: "Our Mission",
      visionTitle: "Our Vision",
      teamTitle: "Our Specialist Team",
    },

    // ── Services Page
    servicesPage: {
      heroTitle: "Our Services",
      heroSubtitle: "Comprehensive treatment with modern technology.",
    },

    // ── Blog Page
    blog: {
      heroTitle: "Articles & Stories",
      heroSubtitle: "Knowledge and stories from our experts.",
      searchPlaceholder: "Search articles...",
      all: "All",
      readMore: "Read More",
      noResult: "No articles found",
      loading: "Loading...",
    },

    // ── FAQ Page
    faq: {
      heroTitle: "Frequently Asked Questions",
      heroSubtitle: "Everything you want to know about treatment.",
      searchPlaceholder: "Search questions...",
      all: "All",
      noResult: "No questions found",
      loading: "Loading...",
    },

    // ── Doctors Page
    doctors: {
      heroTitle: "Our Specialist Team",
      heroSubtitle: "Highly experienced and specialized physicians.",
      education: "Education",
      specialties: "Specialties",
      loading: "Loading...",
    },

    // ── Contact Page
    contact: {
      heroTitle: "Contact Us",
      heroSubtitle: "We're ready to advise and answer all your questions.",
      nameLabel: "Full Name",
      phoneLabel: "Phone Number",
      emailLabel: "Email",
      messageLabel: "Message",
      submitBtn: "Send Message",
      successMsg: "Message sent successfully. We'll get back to you shortly.",
      address: "Address",
      hours: "Opening Hours",
      phone: "Phone",
    },

    // ── Footer
    footer: {
      tagline:
        "Comprehensive fertility center with modern technology and specialist physicians.",
      quickLinks: "Quick Links",
      services: "Services",
      contact: "Contact",
      rights: "All rights reserved",
      privacy: "Privacy Policy",
      terms: "Terms of Use",
    },

    // ── Cookie
    cookie: {
      message: "We use cookies to improve your experience.",
      accept: "Accept",
      decline: "Decline",
    },
  },
};

export type Lang = keyof typeof messages;
export type Messages = typeof messages.th;

export const useLang = () => useState<Lang>("lang", () => "th");

export const useT = () => {
  const lang = useLang();
  return computed(() => messages[lang.value]);
};
