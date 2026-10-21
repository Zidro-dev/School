import { Student, ScheduleItem, SchoolAnnouncement, ChatMessage } from '../types';

export const INITIAL_STUDENTS: Student[] = [
  {
    id: 1,
    fullName: "Abduxomidov Xurshidbek",
    username: "xurshidbek_a",
    password: "Maktab2026!",
    classGrade: "11-A",
    avatarColor: "from-blue-600 to-indigo-700",
    birthDate: "2008-04-12",
    phone: "+998 90 123 45 61",
    email: "xurshidbek.abduxomidov@maktab.uz",
    address: "Toshkent shahri, Chilonzor tumani",
    bio: "Aniq fanlarga qiziqaman, dasturlash va oliy matematika bo'yicha xalqaro sertifikat olishga intilaman.",
    targetUniversity: "Toshkent shahridagi Inha Universiteti (Computer Science)",
    careerGoal: "Software Architect & AI Engineer",
    majorDirections: {
      block1: { subject: "Matematika", level: "A", score: 92, description: "Milliy sertifikat A toifa (92 ball)" },
      block2: { subject: "Ingliz tili", level: "B2", score: 68, description: "CEFR B2 sertifikati" },
    },
    certificates: [
      {
        id: "cert-1-1",
        title: "Matematika fanidan Milliy Sertifikat",
        subject: "Matematika",
        type: "Milliy sertifikat",
        level: "A",
        score: 92,
        issueDate: "2026-03-15",
        verificationCode: "UZ-MATH-2026-8841",
        institution: "Bilim va malakalarni baholash agentligi (BMBA)",
        status: "Tasdiqlangan"
      },
      {
        id: "cert-1-2",
        title: "Cambridge English: B2 First",
        subject: "Ingliz tili",
        type: "CEFR",
        level: "B2",
        score: 172,
        issueDate: "2026-05-20",
        verificationCode: "CAM-B2-993821",
        institution: "Cambridge Assessment English",
        status: "Tasdiqlangan"
      }
    ],
    securitySettings: {
      twoFactorEnabled: false,
      loginAlerts: true,
      publicProfile: true,
      showGradesToClass: true,
      lastPasswordChange: "2026-09-01",
      activeSessions: [
        { id: "s-1", device: "Desktop (Windows 11)", browser: "Chrome 131", ip: "178.218.201.44", lastActive: "Hozir faol", current: true }
      ]
    },
    overallAverage: 4.8,
    attendanceRate: 98,
    journal: [
      {
        subject: "Matematika",
        teacher: "Nargiza Salimova",
        room: "304-xona",
        averageScore: 4.9,
        finalQuarterGrade: 5,
        grades: [
          { id: "g1", date: "10-Oktyabr", score: 5, type: "Darsdagi javob", topic: "Hosilaning geometrik ma'nosi" },
          { id: "g2", date: "14-Oktyabr", score: 5, type: "BSB", topic: "Funksiya grafigini tekshirish" },
          { id: "g3", date: "18-Oktyabr", score: 5, type: "Oraliq nazorat", topic: "Integrallar hisoblash" }
        ]
      },
      {
        subject: "Ingliz tili",
        teacher: "Shahnoza Karimova",
        room: "208-xona",
        averageScore: 4.7,
        finalQuarterGrade: 5,
        grades: [
          { id: "g4", date: "11-Oktyabr", score: 5, type: "Darsdagi javob", topic: "Advanced Passive Voice" },
          { id: "g5", date: "15-Oktyabr", score: 4, type: "Uyga vazifa", topic: "Essay Writing: Technology in Education" }
        ]
      },
      {
        subject: "Ona tili va adabiyot",
        teacher: "Gulchehra Mirzayeva",
        room: "105-xona",
        averageScore: 4.8,
        finalQuarterGrade: 5,
        grades: [
          { id: "g6", date: "12-Oktyabr", score: 5, type: "Darsdagi javob", topic: "Alisher Navoiy g'azallari tahlili" }
        ]
      }
    ]
  },
  {
    id: 2,
    fullName: "Akbarjonova Ma'sumaxon",
    username: "masumaxon_a",
    password: "Maktab2026!",
    classGrade: "11-A",
    avatarColor: "from-pink-500 to-rose-600",
    birthDate: "2008-08-22",
    phone: "+998 90 234 56 72",
    email: "masumaxon.akbarjonova@maktab.uz",
    address: "Toshkent shahri, Shayxontohur tumani",
    bio: "Iqtisodiyot va moliya sohasiga qiziqaman. Chet tillarini mukammal o'rganish ustida ishlayapman.",
    targetUniversity: "Toshkent Davlat Iqtisodiyot Universiteti (Xalqaro Moliya)",
    careerGoal: "Moliyaviy tahlilchi va auditor",
    majorDirections: {
      block1: { subject: "Matematika", level: "C+", score: 71, description: "Milliy sertifikat C+ toifa" },
      block2: { subject: "Ingliz tili", level: "B1", score: 54, description: "CEFR B1 sertifikati" },
    },
    certificates: [
      {
        id: "cert-2-1",
        title: "Matematika Milliy Sertifikati",
        subject: "Matematika",
        type: "Milliy sertifikat",
        level: "C+",
        score: 71,
        issueDate: "2026-04-10",
        verificationCode: "UZ-MATH-2026-3199",
        institution: "BMBA",
        status: "Tasdiqlangan"
      },
      {
        id: "cert-2-2",
        title: "Ingliz tili B1 sertifikati",
        subject: "Ingliz tili",
        type: "CEFR",
        level: "B1",
        score: 54,
        issueDate: "2026-02-18",
        verificationCode: "UZ-ENG-B1-7721",
        institution: "Davlat Test Markazi",
        status: "Tasdiqlangan"
      }
    ],
    securitySettings: {
      twoFactorEnabled: false,
      loginAlerts: true,
      publicProfile: true,
      showGradesToClass: true,
      lastPasswordChange: "2026-09-02",
      activeSessions: [
        { id: "s-2", device: "Mobile (iPhone 14)", browser: "Safari", ip: "84.54.81.23", lastActive: "1 soat oldin", current: true }
      ]
    },
    overallAverage: 4.6,
    attendanceRate: 97,
    journal: [
      {
        subject: "Matematika",
        teacher: "Nargiza Salimova",
        room: "304-xona",
        averageScore: 4.5,
        finalQuarterGrade: 5,
        grades: [
          { id: "g7", date: "09-Oktyabr", score: 5, type: "Darsdagi javob", topic: "Kombinatorika asoslari" },
          { id: "g8", date: "16-Oktyabr", score: 4, type: "BSB", topic: "Ehtimollar nazariyasi" }
        ]
      },
      {
        subject: "Ingliz tili",
        teacher: "Shahnoza Karimova",
        room: "208-xona",
        averageScore: 4.6,
        finalQuarterGrade: 5,
        grades: [
          { id: "g9", date: "10-Oktyabr", score: 5, type: "Darsdagi javob", topic: "Conditional Sentences" },
          { id: "g10", date: "14-Oktyabr", score: 4, type: "Oraliq nazorat", topic: "Reading Comprehension" }
        ]
      }
    ]
  },
  {
    id: 3,
    fullName: "A'zamjonov Akmaljon",
    username: "akmaljon_a",
    password: "Maktab2026!",
    classGrade: "11-A",
    avatarColor: "from-emerald-600 to-teal-700",
    birthDate: "2008-01-19",
    phone: "+998 90 345 67 83",
    email: "akmaljon.azamjonov@maktab.uz",
    address: "Toshkent shahri, Yunusobod tumani",
    bio: "Bank ishi va hisob-kitob yo'nalishida oliy ma'lumot olishni rejalashtirganman.",
    targetUniversity: "O'zbekiston Milliy Universiteti (Iqtisodiyot)",
    careerGoal: "Bank menejeri",
    majorDirections: {
      block1: { subject: "Matematika", level: "C+", score: 73, description: "Milliy sertifikat C+ toifa" },
      block2: { subject: "Ingliz tili", level: "B1 tayyorgarlik", score: 52, description: "Davlat imtihoniga tayyorgarlik" },
    },
    certificates: [
      {
        id: "cert-3-1",
        title: "Matematika Milliy Sertifikati",
        subject: "Matematika",
        type: "Milliy sertifikat",
        level: "C+",
        score: 73,
        issueDate: "2026-04-12",
        verificationCode: "UZ-MATH-2026-5510",
        institution: "BMBA",
        status: "Tasdiqlangan"
      }
    ],
    securitySettings: {
      twoFactorEnabled: false,
      loginAlerts: false,
      publicProfile: true,
      showGradesToClass: true,
      lastPasswordChange: "2026-09-03",
      activeSessions: [
        { id: "s-3", device: "Desktop (MacBook Air)", browser: "Chrome 131", ip: "84.54.90.15", lastActive: "Kecha", current: true }
      ]
    },
    overallAverage: 4.4,
    attendanceRate: 95,
    journal: [
      {
        subject: "Matematika",
        teacher: "Nargiza Salimova",
        room: "304-xona",
        averageScore: 4.4,
        finalQuarterGrade: 4,
        grades: [
          { id: "g11", date: "10-Oktyabr", score: 4, type: "Darsdagi javob", topic: "Vektorlar va ularning skalyar ko'paytmasi" },
          { id: "g12", date: "17-Oktyabr", score: 5, type: "Oraliq nazorat", topic: "Trigonometrik tenglamalar" }
        ]
      }
    ]
  },
  {
    id: 4,
    fullName: "Bahriddinov Asadbek",
    username: "asadbek_b",
    password: "Maktab2026!",
    classGrade: "11-A",
    avatarColor: "from-amber-600 to-orange-700",
    birthDate: "2008-06-14",
    phone: "+998 90 456 78 94",
    email: "asadbek.bahriddinov@maktab.uz",
    address: "Toshkent shahri, Mirzo Ulug'bek tumani",
    bio: "Fizika-matematika olimpiadalari g'olibi. Muhandislik va kosmik texnologiyalarga qiziqaman.",
    targetUniversity: "Toshkent Davlat Texnika Universiteti / Bauman universiteti",
    careerGoal: "Avtomatlashtirish va Robototexnika muhandisi",
    majorDirections: {
      block1: { subject: "Matematika", level: "A", score: 95, description: "Milliy sertifikat A toifa (95 ball)" },
      block2: { subject: "Fizika", level: "A'lo", score: 90, description: "Viloyat Fizika olimpiadasi 1-o'rin" },
    },
    certificates: [
      {
        id: "cert-4-1",
        title: "Matematika A darajali Milliy Sertifikat",
        subject: "Matematika",
        type: "Milliy sertifikat",
        level: "A",
        score: 95,
        issueDate: "2026-03-20",
        verificationCode: "UZ-MATH-2026-9501",
        institution: "BMBA",
        status: "Tasdiqlangan"
      },
      {
        id: "cert-4-2",
        title: "Respublika Fizika Fan Olimpiadasi Diplomi",
        subject: "Fizika",
        type: "Olimpiada",
        level: "1-o'rin",
        score: 98,
        issueDate: "2026-05-10",
        verificationCode: "OLIMP-UZ-FIZ-441",
        institution: "Maktabgacha va maktab ta'limi vazirligi",
        status: "Tasdiqlangan"
      }
    ],
    securitySettings: {
      twoFactorEnabled: true,
      twoFactorPin: "4490",
      loginAlerts: true,
      publicProfile: true,
      showGradesToClass: true,
      lastPasswordChange: "2026-09-05",
      activeSessions: [
        { id: "s-4", device: "Desktop (Linux Ubuntu)", browser: "Firefox 132", ip: "213.230.88.19", lastActive: "Hozir faol", current: true }
      ]
    },
    overallAverage: 4.95,
    attendanceRate: 100,
    journal: [
      {
        subject: "Matematika",
        teacher: "Nargiza Salimova",
        room: "304-xona",
        averageScore: 5.0,
        finalQuarterGrade: 5,
        grades: [
          { id: "g13", date: "10-Oktyabr", score: 5, type: "BSB", topic: "Matritsalar va determinantlar" },
          { id: "g14", date: "17-Oktyabr", score: 5, type: "Oraliq nazorat", topic: "Ko'rsatkichli tenglamalar" }
        ]
      },
      {
        subject: "Fizika",
        teacher: "Jamshid Qodirov",
        room: "401-xona",
        averageScore: 5.0,
        finalQuarterGrade: 5,
        grades: [
          { id: "g15", date: "09-Oktyabr", score: 5, type: "Darsdagi javob", topic: "Elektromagnit induksiya qonuni" },
          { id: "g16", date: "16-Oktyabr", score: 5, type: "Oraliq nazorat", topic: "Kvant fizikasi asoslari" }
        ]
      }
    ]
  },
  {
    id: 5,
    fullName: "Ernazarova Nilufarxon",
    username: "nilufarxon_e",
    password: "Maktab2026!",
    classGrade: "11-A",
    avatarColor: "from-purple-600 to-indigo-700",
    birthDate: "2008-09-11",
    phone: "+998 90 567 89 05",
    email: "nilufarxon.ernazarova@maktab.uz",
    address: "Toshkent shahri, Uchtepa tumani",
    bio: "Filologiya, adabiyot va chet tillari bo'yicha ilmiy izlanishlarga qiziqaman.",
    targetUniversity: "O'zDJTU (O'zbekiston Davlat Jahon Tillari Universiteti)",
    careerGoal: "Sinxron tarjimon va xalqaro munosabatlar mutaxassisi",
    majorDirections: {
      block1: { subject: "Ona tili va adabiyot", level: "A", score: 90, description: "Ona tili fanidan yuqori ko'rsatkich" },
      block2: { subject: "Ingliz tili", level: "B2", score: 70, description: "Ingliz tili B2 sertifikati" },
    },
    certificates: [
      {
        id: "cert-5-1",
        title: "Ona tili va adabiyot Milliy Sertifikat",
        subject: "Ona tili va adabiyot",
        type: "Milliy sertifikat",
        level: "A",
        score: 90,
        issueDate: "2026-03-25",
        verificationCode: "UZ-LANG-2026-1029",
        institution: "BMBA",
        status: "Tasdiqlangan"
      }
    ],
    securitySettings: {
      twoFactorEnabled: false,
      loginAlerts: true,
      publicProfile: true,
      showGradesToClass: true,
      lastPasswordChange: "2026-09-01",
      activeSessions: [
        { id: "s-5", device: "Mobile (Samsung S23)", browser: "Chrome Mobile", ip: "84.54.101.4", lastActive: "Bugun 11:20", current: true }
      ]
    },
    overallAverage: 4.8,
    attendanceRate: 98,
    journal: [
      {
        subject: "Ona tili va adabiyot",
        teacher: "Gulchehra Mirzayeva",
        room: "105-xona",
        averageScore: 5.0,
        finalQuarterGrade: 5,
        grades: [
          { id: "g17", date: "11-Oktyabr", score: 5, type: "BSB", topic: "Badiiy matn tahlili va insho" },
          { id: "g18", date: "18-Oktyabr", score: 5, type: "Oraliq nazorat", topic: "Murakkab qo'shma gaplar sintaksisi" }
        ]
      }
    ]
  },
  {
    id: 6,
    fullName: "Habibullayev Behruzbek",
    username: "behruzbek_h",
    password: "Maktab2026!",
    classGrade: "11-A",
    avatarColor: "from-cyan-600 to-blue-700",
    birthDate: "2008-03-29",
    phone: "+998 90 678 90 16",
    email: "behruzbek.habibullayev@maktab.uz",
    address: "Toshkent shahri, Yashnobod tumani",
    bio: "Axborot texnologiyalari, kiberxavfsizlik va dasturlashga qiziqaman.",
    targetUniversity: "TATU (Muhammad al-Xorazmiy nomidagi TATU)",
    careerGoal: "Kiberxavfsizlik mutaxassisi (Cybersecurity Analyst)",
    majorDirections: {
      block1: { subject: "Matematika", level: "B+", score: 82, description: "Amaliy matematika va diskret mantiq" },
      block2: { subject: "Informatika va Fizika", level: "A", score: 88, description: "Dasturlash va kompyuter tizimlari" },
    },
    certificates: [
      {
        id: "cert-6-1",
        title: "Python & Data Algorithms Certificate",
        subject: "Informatika",
        type: "IT",
        level: "Advanced",
        score: 94,
        issueDate: "2026-04-05",
        verificationCode: "IT-PARK-UZ-8812",
        institution: "IT Park O'zbekiston",
        status: "Tasdiqlangan"
      }
    ],
    securitySettings: {
      twoFactorEnabled: true,
      twoFactorPin: "8801",
      loginAlerts: true,
      publicProfile: true,
      showGradesToClass: true,
      lastPasswordChange: "2026-09-04",
      activeSessions: [
        { id: "s-6", device: "Desktop (Arch Linux)", browser: "Chrome 131", ip: "178.218.199.12", lastActive: "Hozir faol", current: true }
      ]
    },
    overallAverage: 4.75,
    attendanceRate: 99,
    journal: [
      {
        subject: "Matematika",
        teacher: "Nargiza Salimova",
        room: "304-xona",
        averageScore: 4.7,
        finalQuarterGrade: 5,
        grades: [
          { id: "g19", date: "10-Oktyabr", score: 5, type: "Darsdagi javob", topic: "Kombinatorika va binomial koeffitsientlar" },
          { id: "g20", date: "15-Oktyabr", score: 4, type: "BSB", topic: "Trigonometrik ayniyatlar" }
        ]
      }
    ]
  },
  {
    id: 7,
    fullName: "Hoshimjonova Asilaxon",
    username: "asilaxon_h",
    password: "Maktab2026!",
    classGrade: "11-A",
    avatarColor: "from-teal-500 to-emerald-700",
    birthDate: "2008-07-07",
    phone: "+998 90 789 01 27",
    email: "asilaxon.hoshimjonova@maktab.uz",
    address: "Toshkent shahri, Olmazor tumani",
    bio: "Kelajakda malakali shifokor va jarroh bo'lishni maqsad qilganman.",
    targetUniversity: "Toshkent Tibbiyot Akademiyasi (Davolash ishi)",
    careerGoal: "Neyrojarroh va tibbiyot olimi",
    majorDirections: {
      block1: { subject: "Biologiya", level: "A", score: 94, description: "Biologiya Milliy sertifikat A toifa" },
      block2: { subject: "Kimyo", level: "A", score: 91, description: "Organik kimyo va biokimyo" },
    },
    certificates: [
      {
        id: "cert-7-1",
        title: "Biologiya Milliy Sertifikati",
        subject: "Biologiya",
        type: "Milliy sertifikat",
        level: "A",
        score: 94,
        issueDate: "2026-03-30",
        verificationCode: "UZ-BIO-2026-9411",
        institution: "BMBA",
        status: "Tasdiqlangan"
      },
      {
        id: "cert-7-2",
        title: "Kimyo fanidan Respublika tanlovi sertifikati",
        subject: "Kimyo",
        type: "Olimpiada",
        level: "2-daraja",
        score: 89,
        issueDate: "2026-05-02",
        verificationCode: "KIMYO-TASH-2026-11",
        institution: "O'zbekiston Kimyo Jamiyati",
        status: "Tasdiqlangan"
      }
    ],
    securitySettings: {
      twoFactorEnabled: false,
      loginAlerts: true,
      publicProfile: true,
      showGradesToClass: true,
      lastPasswordChange: "2026-09-06",
      activeSessions: [
        { id: "s-7", device: "Tablet (iPad Pro)", browser: "Safari Mobile", ip: "84.54.70.32", lastActive: "3 soat oldin", current: true }
      ]
    },
    overallAverage: 4.9,
    attendanceRate: 100,
    journal: [
      {
        subject: "Biologiya",
        teacher: "Dilnoza Ahmedova",
        room: "210-xona",
        averageScore: 5.0,
        finalQuarterGrade: 5,
        grades: [
          { id: "g21", date: "08-Oktyabr", score: 5, type: "Darsdagi javob", topic: "Genetika va irsiyat qonuniyatlari" },
          { id: "g22", date: "15-Oktyabr", score: 5, type: "BSB", topic: "DNK replikatsiyasi va oqsil sintezi" }
        ]
      }
    ]
  },
  {
    id: 8,
    fullName: "Karimov Baxtiyorjon",
    username: "baxtiyorjon_k",
    password: "Maktab2026!",
    classGrade: "11-A",
    avatarColor: "from-slate-600 to-indigo-800",
    birthDate: "2008-02-17",
    phone: "+998 90 890 12 38",
    email: "baxtiyorjon.karimov@maktab.uz",
    address: "Toshkent shahri, Sergeli tumani",
    bio: "Konstruktorlik va mashinasozlik yo'nalishida o'qishni rejalashtiryapman.",
    targetUniversity: "Toshkent shahridagi Turin Politexnika Universiteti",
    careerGoal: "Avtomobilsozlik muhandis-konstruktori",
    majorDirections: {
      block1: { subject: "Matematika", level: "B+", score: 84, description: "Chiziqli algebra va analitik geometriya" },
      block2: { subject: "Fizika", level: "B+", score: 81, description: "Termodinamika va mexanika" },
    },
    certificates: [
      {
        id: "cert-8-1",
        title: "Matematika B+ Milliy Sertifikati",
        subject: "Matematika",
        type: "Milliy sertifikat",
        level: "B+",
        score: 84,
        issueDate: "2026-04-18",
        verificationCode: "UZ-MATH-2026-8419",
        institution: "BMBA",
        status: "Tasdiqlangan"
      }
    ],
    securitySettings: {
      twoFactorEnabled: false,
      loginAlerts: true,
      publicProfile: true,
      showGradesToClass: true,
      lastPasswordChange: "2026-09-02",
      activeSessions: [
        { id: "s-8", device: "Desktop (Windows 10)", browser: "Chrome 130", ip: "213.230.70.18", lastActive: "Kecha 19:40", current: true }
      ]
    },
    overallAverage: 4.65,
    attendanceRate: 96,
    journal: [
      {
        subject: "Matematika",
        teacher: "Nargiza Salimova",
        room: "304-xona",
        averageScore: 4.7,
        finalQuarterGrade: 5,
        grades: [
          { id: "g23", date: "10-Oktyabr", score: 5, type: "Darsdagi javob", topic: "Stereometriya: Priyazma va piramida hajmlari" }
        ]
      }
    ]
  },
  {
    id: 9,
    fullName: "Moyatdinova Mahfuzaxon",
    username: "mahfuzaxon_m",
    password: "Maktab2026!",
    classGrade: "11-A",
    avatarColor: "from-violet-600 to-purple-800",
    birthDate: "2008-11-20",
    phone: "+998 90 901 23 49",
    email: "mahfuzaxon.moyatdinova@maktab.uz",
    address: "Toshkent shahri, Chilonzor tumani",
    bio: "Xalqaro biznes va investitsiyalar sohasida karyera qilish niyatidaman.",
    targetUniversity: "Westminster International University in Tashkent (WIUT)",
    careerGoal: "Investitsiya tahlilchisi va loyiha rahbari",
    majorDirections: {
      block1: { subject: "Matematika", level: "B", score: 79, description: "Iqtisodiy matematika va statistika" },
      block2: { subject: "Ingliz tili", level: "B2", score: 6.5, description: "IELTS 6.5 xalqaro sertifikati" },
    },
    certificates: [
      {
        id: "cert-9-1",
        title: "IELTS Academic Test Report",
        subject: "Ingliz tili",
        type: "IELTS",
        level: "B2",
        score: 6.5,
        issueDate: "2026-04-22",
        verificationCode: "IELTS-TRF-2026-654",
        institution: "British Council Uzbekistan",
        status: "Tasdiqlangan"
      },
      {
        id: "cert-9-2",
        title: "Matematika Milliy Sertifikati",
        subject: "Matematika",
        type: "Milliy sertifikat",
        level: "B",
        score: 79,
        issueDate: "2026-03-12",
        verificationCode: "UZ-MATH-2026-7902",
        institution: "BMBA",
        status: "Tasdiqlangan"
      }
    ],
    securitySettings: {
      twoFactorEnabled: false,
      loginAlerts: true,
      publicProfile: true,
      showGradesToClass: true,
      lastPasswordChange: "2026-09-08",
      activeSessions: [
        { id: "s-9", device: "Mobile (iPhone 13)", browser: "Safari", ip: "84.54.120.19", lastActive: "Hozir faol", current: true }
      ]
    },
    overallAverage: 4.7,
    attendanceRate: 98,
    journal: [
      {
        subject: "Matematika",
        teacher: "Nargiza Salimova",
        room: "304-xona",
        averageScore: 4.6,
        finalQuarterGrade: 5,
        grades: [
          { id: "g24", date: "10-Oktyabr", score: 5, type: "BSB", topic: "Statistik taqsimotlar" }
        ]
      }
    ]
  },
  {
    id: 10,
    fullName: "Möydinova Adolatxon",
    username: "adolatxon_m",
    password: "Maktab2026!",
    classGrade: "11-A",
    avatarColor: "from-rose-500 to-red-700",
    birthDate: "2008-05-04",
    phone: "+998 90 012 34 50",
    email: "adolatxon.moydinova@maktab.uz",
    address: "Toshkent shahri, Bektemir tumani",
    bio: "Xalqaro huquq va diplomatiya sohasida ta'lim olishga tayyorgarlik ko'ryapman.",
    targetUniversity: "Jahon Iqtisodiyoti va Diplomatiya Universiteti (JIDU)",
    careerGoal: "Xalqaro diplomat va elchixona maslahatchisi",
    majorDirections: {
      block1: { subject: "Matematika", level: "B+", score: 83, description: "Davlat imtihoni 1-blok" },
      block2: { subject: "Ingliz tili", level: "B2 CEFR", score: 72, description: "CEFR B2 rasmiy sertifikati" },
    },
    certificates: [
      {
        id: "cert-10-1",
        title: "CEFR B2 Certificate in English",
        subject: "Ingliz tili",
        type: "CEFR",
        level: "B2",
        score: 72,
        issueDate: "2026-02-14",
        verificationCode: "UZ-CEFR-B2-00491",
        institution: "BMBA Xorijiy tillarni baholash boshqarmasi",
        status: "Tasdiqlangan"
      }
    ],
    securitySettings: {
      twoFactorEnabled: false,
      loginAlerts: true,
      publicProfile: true,
      showGradesToClass: true,
      lastPasswordChange: "2026-09-01",
      activeSessions: [
        { id: "s-10", device: "Laptop (ASUS ZenBook)", browser: "Edge 130", ip: "84.54.45.67", lastActive: "2 soat oldin", current: true }
      ]
    },
    overallAverage: 4.75,
    attendanceRate: 99,
    journal: [
      {
        subject: "Ingliz tili",
        teacher: "Shahnoza Karimova",
        room: "208-xona",
        averageScore: 4.9,
        finalQuarterGrade: 5,
        grades: [
          { id: "g25", date: "11-Oktyabr", score: 5, type: "Darsdagi javob", topic: "Diplomatic vocabulary and debate" }
        ]
      }
    ]
  },
  {
    id: 11,
    fullName: "Nasulloyeva Billuraxon",
    username: "billuraxon_n",
    password: "Maktab2026!",
    classGrade: "11-A",
    avatarColor: "from-fuchsia-600 to-purple-800",
    birthDate: "2008-10-30",
    phone: "+998 90 123 78 51",
    email: "billuraxon.nasulloyeva@maktab.uz",
    address: "Toshkent shahri, Yakkasaroy tumani",
    bio: "Pedagogika va zamonaviy ta'lim metodikalariga qiziqaman.",
    targetUniversity: "Nizomiy nomidagi Toshkent Davlat Pedagogika Universiteti",
    careerGoal: "Oliy toifali tilshunos va metodist o'qituvchi",
    majorDirections: {
      block1: { subject: "Ona tili va adabiyot", level: "A", score: 89, description: "Ona tili Milliy sertifikat" },
      block2: { subject: "Ingliz tili", level: "B2", score: 66, description: "Ingliz tili B2 daraja" },
    },
    certificates: [
      {
        id: "cert-11-1",
        title: "Ona tili fanidan Milliy Sertifikat",
        subject: "Ona tili va adabiyot",
        type: "Milliy sertifikat",
        level: "A",
        score: 89,
        issueDate: "2026-04-01",
        verificationCode: "UZ-LANG-2026-8914",
        institution: "BMBA",
        status: "Tasdiqlangan"
      }
    ],
    securitySettings: {
      twoFactorEnabled: false,
      loginAlerts: true,
      publicProfile: true,
      showGradesToClass: true,
      lastPasswordChange: "2026-09-03",
      activeSessions: [
        { id: "s-11", device: "Mobile (Redmi Note 12)", browser: "Chrome Mobile", ip: "213.230.99.11", lastActive: "Bugun 09:15", current: true }
      ]
    },
    overallAverage: 4.8,
    attendanceRate: 98,
    journal: [
      {
        subject: "Ona tili va adabiyot",
        teacher: "Gulchehra Mirzayeva",
        room: "105-xona",
        averageScore: 4.9,
        finalQuarterGrade: 5,
        grades: [
          { id: "g26", date: "12-Oktyabr", score: 5, type: "BSB", topic: "Morfologiya va uslubiyat" }
        ]
      }
    ]
  },
  {
    id: 12,
    fullName: "Nosirjonova Sitorabonu",
    username: "sitorabonu_n",
    password: "Maktab2026!",
    classGrade: "11-A",
    avatarColor: "from-sky-500 to-indigo-600",
    birthDate: "2008-04-18",
    phone: "+998 90 234 89 52",
    email: "sitorabonu.nosirjonova@maktab.uz",
    address: "Toshkent shahri, Mirabad tumani",
    bio: "Amaliy fizika va muhandislik texnologiyalariga qiziqaman.",
    targetUniversity: "Toshkent Davlat Texnika Universiteti (Energetika)",
    careerGoal: "Qayta tiklanuvchi energiya tizimlari muhandisi",
    majorDirections: {
      block1: { subject: "Matematika", level: "C", score: 65, description: "Milliy sertifikat C toifa" },
      block2: { subject: "Fizika", level: "B", score: 75, description: "Fizika fanidan ixtisoslashgan" },
    },
    certificates: [
      {
        id: "cert-12-1",
        title: "Matematika C darajali Sertifikat",
        subject: "Matematika",
        type: "Milliy sertifikat",
        level: "C",
        score: 65,
        issueDate: "2026-03-19",
        verificationCode: "UZ-MATH-2026-6512",
        institution: "BMBA",
        status: "Tasdiqlangan"
      }
    ],
    securitySettings: {
      twoFactorEnabled: false,
      loginAlerts: false,
      publicProfile: true,
      showGradesToClass: true,
      lastPasswordChange: "2026-09-02",
      activeSessions: [
        { id: "s-12", device: "Desktop (Windows 11)", browser: "Firefox", ip: "84.54.112.5", lastActive: "Kecha", current: true }
      ]
    },
    overallAverage: 4.4,
    attendanceRate: 95,
    journal: [
      {
        subject: "Fizika",
        teacher: "Jamshid Qodirov",
        room: "401-xona",
        averageScore: 4.5,
        finalQuarterGrade: 5,
        grades: [
          { id: "g27", date: "11-Oktyabr", score: 5, type: "Oraliq nazorat", topic: "Optika va yorug'lik to'lqinlari" }
        ]
      }
    ]
  },
  {
    id: 13,
    fullName: "Odilova Husnoraxon",
    username: "husnoraxon_o",
    password: "Maktab2026!",
    classGrade: "11-A",
    avatarColor: "from-amber-500 to-rose-600",
    birthDate: "2008-12-05",
    phone: "+998 90 345 90 53",
    email: "husnoraxon.odilova@maktab.uz",
    address: "Toshkent shahri, Yangihayot tumani",
    bio: "Logistika va xalqaro savdo munosabatlariga katta qiziqishim bor.",
    targetUniversity: "Toshkent Davlat Sharqshunoslik Universiteti",
    careerGoal: "Xalqaro logistika koordinatori",
    majorDirections: {
      block1: { subject: "Matematika", level: "B", score: 76, description: "Amaliy hisob-kitoblar" },
      block2: { subject: "Ingliz tili", level: "B1+", score: 62, description: "Chet tili bo'yicha mustahkam bilim" },
    },
    certificates: [
      {
        id: "cert-13-1",
        title: "Ingliz tili amaliy bilish sertifikati",
        subject: "Ingliz tili",
        type: "CEFR",
        level: "B1+",
        score: 62,
        issueDate: "2026-04-11",
        verificationCode: "UZ-ENG-B1P-199",
        institution: "BMBA",
        status: "Tasdiqlangan"
      }
    ],
    securitySettings: {
      twoFactorEnabled: false,
      loginAlerts: true,
      publicProfile: true,
      showGradesToClass: true,
      lastPasswordChange: "2026-09-04",
      activeSessions: [
        { id: "s-13", device: "Mobile (Samsung A54)", browser: "Chrome Mobile", ip: "84.54.119.8", lastActive: "Hozir faol", current: true }
      ]
    },
    overallAverage: 4.55,
    attendanceRate: 97,
    journal: [
      {
        subject: "Matematika",
        teacher: "Nargiza Salimova",
        room: "304-xona",
        averageScore: 4.5,
        finalQuarterGrade: 5,
        grades: [
          { id: "g28", date: "10-Oktyabr", score: 5, type: "Uyga vazifa", topic: "Matritsalarni ko'paytirish amallari" }
        ]
      }
    ]
  },
  {
    id: 14,
    fullName: "Pazliddinova Olimaxon",
    username: "olimaxon_p",
    password: "Maktab2026!",
    classGrade: "11-A",
    avatarColor: "from-indigo-600 to-purple-700",
    birthDate: "2008-03-15",
    phone: "+998 90 456 01 54",
    email: "olimaxon.pazliddinova@maktab.uz",
    address: "Toshkent shahri, Shayxontohur tumani",
    bio: "Xalqaro munosabatlar va iqtisodiy diplomatiya sohasida yetuk mutaxassis bo'lishni xohlayman.",
    targetUniversity: "Jahon Iqtisodiyoti va Diplomatiya Universiteti (JIDU)",
    careerGoal: "Diplomat va Xalqaro Savdo Vakili",
    majorDirections: {
      block1: { subject: "Matematika", level: "B+", score: 81, description: "Davlat imtihoniga to'liq tayyor" },
      block2: { subject: "Ingliz tili", level: "B2 Sefr", score: 74, description: "CEFR B2 rasmiy milliy sertifikati" },
    },
    certificates: [
      {
        id: "cert-14-1",
        title: "CEFR B2 Level Certificate",
        subject: "Ingliz tili",
        type: "CEFR",
        level: "B2 Sefr",
        score: 74,
        issueDate: "2026-03-01",
        verificationCode: "UZ-CEFR-B2-01442",
        institution: "BMBA",
        status: "Tasdiqlangan"
      }
    ],
    securitySettings: {
      twoFactorEnabled: false,
      loginAlerts: true,
      publicProfile: true,
      showGradesToClass: true,
      lastPasswordChange: "2026-09-01",
      activeSessions: [
        { id: "s-14", device: "Desktop (MacBook Pro)", browser: "Safari 18", ip: "178.218.150.9", lastActive: "1 soat oldin", current: true }
      ]
    },
    overallAverage: 4.8,
    attendanceRate: 99,
    journal: [
      {
        subject: "Ingliz tili",
        teacher: "Shahnoza Karimova",
        room: "208-xona",
        averageScore: 4.9,
        finalQuarterGrade: 5,
        grades: [
          { id: "g29", date: "11-Oktyabr", score: 5, type: "BSB", topic: "Academic Debate & Writing" }
        ]
      }
    ]
  },
  {
    id: 15,
    fullName: "Rahimjonov Foziljon",
    username: "foziljon_r",
    password: "Maktab2026!",
    classGrade: "11-A",
    avatarColor: "from-blue-700 to-slate-900",
    birthDate: "2008-05-19",
    phone: "+998 90 567 12 55",
    email: "foziljon.rahimjonov@maktab.uz",
    address: "Toshkent shahri, Chilonzor tumani",
    bio: "Amaliy mexanika, aerokosmik injiniring va robototexnika loyihalariga qiziqaman.",
    targetUniversity: "Toshkent Davlat Texnika Universiteti (Aviasozlik)",
    careerGoal: "Aviatsiya va dronlar konstruktori",
    majorDirections: {
      block1: { subject: "Matematika", level: "B+", score: 85, description: "Matematika chuqurlashtirilgan sinf" },
      block2: { subject: "Fizika", level: "A", score: 89, description: "Fizika amaliy laboratoriya ustasi" },
    },
    certificates: [
      {
        id: "cert-15-1",
        title: "Fizika amaliy laboratoriya olimpiadasi",
        subject: "Fizika",
        type: "Olimpiada",
        level: "2-o'rin",
        score: 89,
        issueDate: "2026-05-04",
        verificationCode: "FIZ-LAB-2026-155",
        institution: "Toshkent shahri maktablararo olimpiadasi",
        status: "Tasdiqlangan"
      }
    ],
    securitySettings: {
      twoFactorEnabled: false,
      loginAlerts: true,
      publicProfile: true,
      showGradesToClass: true,
      lastPasswordChange: "2026-09-02",
      activeSessions: [
        { id: "s-15", device: "Desktop (Windows 11)", browser: "Chrome 131", ip: "84.54.133.21", lastActive: "Bugun 10:05", current: true }
      ]
    },
    overallAverage: 4.7,
    attendanceRate: 98,
    journal: [
      {
        subject: "Fizika",
        teacher: "Jamshid Qodirov",
        room: "401-xona",
        averageScore: 4.8,
        finalQuarterGrade: 5,
        grades: [
          { id: "g30", date: "12-Oktyabr", score: 5, type: "BSB", topic: "Mexanik tebranishlar va rezonans" }
        ]
      }
    ]
  },
  {
    id: 16,
    fullName: "Rahimov Muhammadjon",
    username: "muhammadjon_r",
    password: "Maktab2026!",
    classGrade: "11-A",
    avatarColor: "from-emerald-600 to-cyan-700",
    birthDate: "2008-08-08",
    phone: "+998 90 678 23 56",
    email: "muhammadjon.rahimov@maktab.uz",
    address: "Toshkent shahri, Mirzo Ulug'bek tumani",
    bio: "Dasturiy ta'minot yaratish, sun'iy intellekt va startap loyihalari ustida ishlayapman.",
    targetUniversity: "AKFA Universiteti / New Uzbekistan University (Applied Math)",
    careerGoal: "AI Researcher va Data Scientist",
    majorDirections: {
      block1: { subject: "Matematika", level: "A", score: 94, description: "Milliy sertifikat A toifa (94 ball)" },
      block2: { subject: "Ingliz tili", level: "B2", score: 71, description: "Ingliz tili B2 sertifikati" },
    },
    certificates: [
      {
        id: "cert-16-1",
        title: "Matematika Milliy Sertifikati (A toifa)",
        subject: "Matematika",
        type: "Milliy sertifikat",
        level: "A",
        score: 94,
        issueDate: "2026-03-22",
        verificationCode: "UZ-MATH-2026-9402",
        institution: "BMBA",
        status: "Tasdiqlangan"
      },
      {
        id: "cert-16-2",
        title: "B2 First Certificate in English",
        subject: "Ingliz tili",
        type: "CEFR",
        level: "B2",
        score: 170,
        issueDate: "2026-05-15",
        verificationCode: "CAM-B2-881902",
        institution: "Cambridge Assessment",
        status: "Tasdiqlangan"
      }
    ],
    securitySettings: {
      twoFactorEnabled: true,
      twoFactorPin: "1616",
      loginAlerts: true,
      publicProfile: true,
      showGradesToClass: true,
      lastPasswordChange: "2026-09-07",
      activeSessions: [
        { id: "s-16", device: "Desktop (Linux Pop!_OS)", browser: "Brave 1.70", ip: "213.230.91.44", lastActive: "Hozir faol", current: true }
      ]
    },
    overallAverage: 4.9,
    attendanceRate: 100,
    journal: [
      {
        subject: "Matematika",
        teacher: "Nargiza Salimova",
        room: "304-xona",
        averageScore: 5.0,
        finalQuarterGrade: 5,
        grades: [
          { id: "g31", date: "10-Oktyabr", score: 5, type: "BSB", topic: "Matritsali tenglamalar sistemasi" }
        ]
      }
    ]
  },
  {
    id: 17,
    fullName: "Rustamov Muhammadzohid",
    username: "muhammadzohid_r",
    password: "Maktab2026!",
    classGrade: "11-A",
    avatarColor: "from-amber-600 to-red-800",
    birthDate: "2008-01-25",
    phone: "+998 90 789 34 57",
    email: "muhammadzohid.rustamov@maktab.uz",
    address: "Toshkent shahri, Shayxontohur tumani",
    bio: "O'zbekiston tarixi, davlatchilik asoslari va yurisprudensiya yo'nalishiga qiziqaman.",
    targetUniversity: "Toshkent Davlat Yuridik Universiteti (TDYU)",
    careerGoal: "Advokat va Inson Huquqlari himoyachisi",
    majorDirections: {
      block1: { subject: "Tarix", level: "A", score: 92, description: "O'zbekiston va Jahon tarixi bilimdoni" },
      block2: { subject: "Huquq / Ingliz tili", level: "A", score: 88, description: "Davlat va huquq asoslari" },
    },
    certificates: [
      {
        id: "cert-17-1",
        title: "Tarix fani Milliy Sertifikati",
        subject: "Tarix",
        type: "Milliy sertifikat",
        level: "A",
        score: 92,
        issueDate: "2026-04-14",
        verificationCode: "UZ-HIST-2026-9217",
        institution: "BMBA",
        status: "Tasdiqlangan"
      }
    ],
    securitySettings: {
      twoFactorEnabled: false,
      loginAlerts: true,
      publicProfile: true,
      showGradesToClass: true,
      lastPasswordChange: "2026-09-02",
      activeSessions: [
        { id: "s-17", device: "Mobile (iPhone 12)", browser: "Safari Mobile", ip: "84.54.88.9", lastActive: "Bugun 11:45", current: true }
      ]
    },
    overallAverage: 4.85,
    attendanceRate: 98,
    journal: [
      {
        subject: "Tarix",
        teacher: "Otabek Boboyev",
        room: "202-xona",
        averageScore: 5.0,
        finalQuarterGrade: 5,
        grades: [
          { id: "g32", date: "09-Oktyabr", score: 5, type: "Oraliq nazorat", topic: "Amir Temur davlati diplomatiyasi" }
        ]
      }
    ]
  },
  {
    id: 18,
    fullName: "Salimjonov Azizbek",
    username: "azizbek_s",
    password: "Maktab2026!",
    classGrade: "11-A",
    avatarColor: "from-teal-600 to-blue-800",
    birthDate: "2008-07-14",
    phone: "+998 90 890 45 58",
    email: "azizbek.salimjonov@maktab.uz",
    address: "Toshkent shahri, Yunusobod tumani",
    bio: "Axborot xavfsizligi va tizimli dasturlash bo'yicha mustaqil o'qib boryapman.",
    targetUniversity: "TATU (Axborot Xavfsizligi fakulteti)",
    careerGoal: "Tarmoq xavfsizligi arxitektori",
    majorDirections: {
      block1: { subject: "Matematika", level: "B+", score: 80, description: "Davlat imtihoni 1-blok" },
      block2: { subject: "Ingliz tili", level: "B1+", score: 65, description: "Texnik ingliz tili" },
    },
    certificates: [
      {
        id: "cert-18-1",
        title: "Cisco Networking Basics Certificate",
        subject: "IT",
        type: "IT",
        level: "B1",
        score: 88,
        issueDate: "2026-03-10",
        verificationCode: "CISCO-NET-2026-18",
        institution: "Cisco Networking Academy",
        status: "Tasdiqlangan"
      }
    ],
    securitySettings: {
      twoFactorEnabled: false,
      loginAlerts: true,
      publicProfile: true,
      showGradesToClass: true,
      lastPasswordChange: "2026-09-01",
      activeSessions: [
        { id: "s-18", device: "Desktop (Windows 11)", browser: "Chrome 131", ip: "84.54.200.7", lastActive: "Kecha", current: true }
      ]
    },
    overallAverage: 4.6,
    attendanceRate: 96,
    journal: [
      {
        subject: "Matematika",
        teacher: "Nargiza Salimova",
        room: "304-xona",
        averageScore: 4.6,
        finalQuarterGrade: 5,
        grades: [
          { id: "g33", date: "10-Oktyabr", score: 5, type: "Darsdagi javob", topic: "Limitlar va funksiyaning uzluksizligi" }
        ]
      }
    ]
  },
  {
    id: 19,
    fullName: "Sodiqova Mubinaxon",
    username: "mubinaxon_s",
    password: "Maktab2026!",
    classGrade: "11-A",
    avatarColor: "from-rose-500 to-pink-700",
    birthDate: "2008-09-03",
    phone: "+998 90 901 56 59",
    email: "mubinaxon.sodiqova@maktab.uz",
    address: "Toshkent shahri, Mirobod tumani",
    bio: "Bank ishi, raqamli moliya va fintech yo'nalishida nufuzli oliygohda o'qish orzum.",
    targetUniversity: "Toshkent Davlat Iqtisodiyot Universiteti (TDIU)",
    careerGoal: "Fintech tahlilchi va risk menejeri",
    majorDirections: {
      block1: { subject: "Matematika", level: "B+", score: 84, description: "Milliy sertifikat B+ toifa" },
      block2: { subject: "Ingliz tili", level: "B1", score: 58, description: "CEFR B1 darajasi" },
    },
    certificates: [
      {
        id: "cert-19-1",
        title: "Matematika Milliy Sertifikati (B+)",
        subject: "Matematika",
        type: "Milliy sertifikat",
        level: "B+",
        score: 84,
        issueDate: "2026-04-05",
        verificationCode: "UZ-MATH-2026-8419B",
        institution: "BMBA",
        status: "Tasdiqlangan"
      },
      {
        id: "cert-19-2",
        title: "Ingliz tili B1 darajali Sertifikat",
        subject: "Ingliz tili",
        type: "CEFR",
        level: "B1",
        score: 58,
        issueDate: "2026-02-28",
        verificationCode: "UZ-CEFR-B1-1901",
        institution: "BMBA",
        status: "Tasdiqlangan"
      }
    ],
    securitySettings: {
      twoFactorEnabled: false,
      loginAlerts: true,
      publicProfile: true,
      showGradesToClass: true,
      lastPasswordChange: "2026-09-05",
      activeSessions: [
        { id: "s-19", device: "Mobile (Samsung S22)", browser: "Samsung Internet", ip: "213.230.77.89", lastActive: "Bugun 10:45", current: true }
      ]
    },
    overallAverage: 4.75,
    attendanceRate: 98,
    journal: [
      {
        subject: "Matematika",
        teacher: "Nargiza Salimova",
        room: "304-xona",
        averageScore: 4.8,
        finalQuarterGrade: 5,
        grades: [
          { id: "g34", date: "10-Oktyabr", score: 5, type: "BSB", topic: "Matematik mantiq va to'plamlar" }
        ]
      }
    ]
  },
  {
    id: 20,
    fullName: "Tursunboyev Hojiakbar",
    username: "hojiakbar_t",
    password: "Maktab2026!",
    classGrade: "11-A",
    avatarColor: "from-blue-600 to-indigo-900",
    birthDate: "2008-04-01",
    phone: "+998 90 012 67 60",
    email: "hojiakbar.tursunboyev@maktab.uz",
    address: "Toshkent shahri, Olmazor tumani",
    bio: "Fizika-matematika qonuniyatlari va yangi energiya vositalarini yaratishga qiziqaman.",
    targetUniversity: "Toshkent Davlat Texnika Universiteti (Mexatronika)",
    careerGoal: "Mashinasozlik va avtomatika bo'yicha loyihachi",
    majorDirections: {
      block1: { subject: "Matematika", level: "B+", score: 82, description: "Geometriya va algebra" },
      block2: { subject: "Fizika", level: "B+", score: 85, description: "Elektrodinamika va to'lqinlar" },
    },
    certificates: [
      {
        id: "cert-20-1",
        title: "Fizika amaliy fani sertifikati",
        subject: "Fizika",
        type: "Fizika",
        level: "B+",
        score: 85,
        issueDate: "2026-03-14",
        verificationCode: "UZ-FIZ-2026-8520",
        institution: "BMBA",
        status: "Tasdiqlangan"
      }
    ],
    securitySettings: {
      twoFactorEnabled: false,
      loginAlerts: true,
      publicProfile: true,
      showGradesToClass: true,
      lastPasswordChange: "2026-09-02",
      activeSessions: [
        { id: "s-20", device: "Desktop (Windows 11)", browser: "Chrome 131", ip: "84.54.144.11", lastActive: "Kecha 21:00", current: true }
      ]
    },
    overallAverage: 4.65,
    attendanceRate: 97,
    journal: [
      {
        subject: "Fizika",
        teacher: "Jamshid Qodirov",
        room: "401-xona",
        averageScore: 4.7,
        finalQuarterGrade: 5,
        grades: [
          { id: "g35", date: "11-Oktyabr", score: 5, type: "BSB", topic: "Magnit maydonida zaryad harakati" }
        ]
      }
    ]
  },
  {
    id: 21,
    fullName: "Yuldashev Behruzbek",
    username: "behruzbek_y",
    password: "Maktab2026!",
    classGrade: "11-A",
    avatarColor: "from-indigo-600 to-sky-700",
    birthDate: "2008-06-27",
    phone: "+998 90 123 78 61",
    email: "behruzbek.yuldashev@maktab.uz",
    address: "Toshkent shahri, Chilonzor tumani",
    bio: "Iqtisodiy tahlil, menejment va xorijiy tillarni o'rganish ustida ishlayapman.",
    targetUniversity: "Singapur Menejmentni Rivojlantirish Instituti (MDIST)",
    careerGoal: "Biznes tahlilchi va operatsion boshqaruvchi",
    majorDirections: {
      block1: { subject: "Matematika", level: "C+", score: 72, description: "Milliy sertifikat C+ toifa" },
      block2: { subject: "Ingliz tili", level: "B1+", score: 64, description: "IELTS tayyorgarlik kursi" },
    },
    certificates: [
      {
        id: "cert-21-1",
        title: "Matematika Milliy Sertifikati (C+)",
        subject: "Matematika",
        type: "Milliy sertifikat",
        level: "C+",
        score: 72,
        issueDate: "2026-04-09",
        verificationCode: "UZ-MATH-2026-7221",
        institution: "BMBA",
        status: "Tasdiqlangan"
      }
    ],
    securitySettings: {
      twoFactorEnabled: false,
      loginAlerts: true,
      publicProfile: true,
      showGradesToClass: true,
      lastPasswordChange: "2026-09-03",
      activeSessions: [
        { id: "s-21", device: "Mobile (iPhone 11)", browser: "Safari Mobile", ip: "84.54.19.102", lastActive: "Bugun 11:10", current: true }
      ]
    },
    overallAverage: 4.5,
    attendanceRate: 96,
    journal: [
      {
        subject: "Matematika",
        teacher: "Nargiza Salimova",
        room: "304-xona",
        averageScore: 4.5,
        finalQuarterGrade: 4,
        grades: [
          { id: "g36", date: "10-Oktyabr", score: 4, type: "BSB", topic: "Tengsizliklar sistemasini grafik yechish" }
        ]
      }
    ]
  },
  {
    id: 22,
    fullName: "Yusufjonov Muhammadqodir",
    username: "muhammadqodir_y",
    password: "Maktab2026!",
    classGrade: "11-A",
    avatarColor: "from-blue-600 to-indigo-800",
    birthDate: "2008-03-30",
    phone: "+998 90 234 89 62",
    email: "yusufjonovm30@gmail.com",
    address: "Toshkent shahri, Sergeli tumani",
    bio: "Amaliy matematika, fizika qonuniyatlari va innovatsion texnologiyalarni o'rganishga bag'ishlanganman. Davlat granti asosida nufuzli texnika universitetiga kirish asosiy maqsadim.",
    targetUniversity: "Toshkent Davlat Texnika Universiteti (TDTU) / Muhammad al-Xorazmiy nomidagi TATU",
    careerGoal: "Muhandis-dasturchi va Avtomatlashtirish mutaxassisi",
    majorDirections: {
      block1: { subject: "Matematika", level: "B", score: 78, description: "Milliy sertifikat B toifa (78 ball)" },
      block2: { subject: "Fizika", level: "A", score: 87, description: "Fizika bo'yicha yuqori amaliy ko'rsatkich" },
    },
    certificates: [
      {
        id: "cert-22-1",
        title: "Matematika Milliy Sertifikati (B toifa)",
        subject: "Matematika",
        type: "Milliy sertifikat",
        level: "B",
        score: 78,
        issueDate: "2026-03-18",
        verificationCode: "UZ-MATH-2026-7822-MQ",
        institution: "BMBA (Davlat Test Markazi)",
        status: "Tasdiqlangan"
      },
      {
        id: "cert-22-2",
        title: "Fizika fanidan Amaliy ko'nikmalar sertifikati",
        subject: "Fizika",
        type: "Fizika",
        level: "A",
        score: 87,
        issueDate: "2026-05-12",
        verificationCode: "UZ-FIZ-2026-8722",
        institution: "O'zbekiston Fanlar Akademiyasi Fizika instituti",
        status: "Tasdiqlangan"
      }
    ],
    securitySettings: {
      twoFactorEnabled: true,
      twoFactorPin: "3030",
      loginAlerts: true,
      publicProfile: true,
      showGradesToClass: true,
      lastPasswordChange: "2026-09-08",
      activeSessions: [
        { id: "s-22", device: "Desktop (Current Session)", browser: "Chrome 131", ip: "178.218.200.5", lastActive: "Hozir faol", current: true }
      ]
    },
    overallAverage: 4.85,
    attendanceRate: 100,
    journal: [
      {
        subject: "Matematika",
        teacher: "Nargiza Salimova",
        room: "304-xona",
        averageScore: 4.8,
        finalQuarterGrade: 5,
        grades: [
          { id: "g37", date: "10-Oktyabr", score: 5, type: "Darsdagi javob", topic: "Matematik modellashtirish va hosilalar" },
          { id: "g38", date: "14-Oktyabr", score: 5, type: "BSB", topic: "Ko'phadlar va ildizlar tahlili" },
          { id: "g39", date: "18-Oktyabr", score: 5, type: "Oraliq nazorat", topic: "Trigonometrik almashtirishlar" }
        ]
      },
      {
        subject: "Fizika",
        teacher: "Jamshid Qodirov",
        room: "401-xona",
        averageScore: 4.9,
        finalQuarterGrade: 5,
        grades: [
          { id: "g40", date: "09-Oktyabr", score: 5, type: "Darsdagi javob", topic: "Yarimo'tkazgichlar va diodlar fizikasi" },
          { id: "g41", date: "16-Oktyabr", score: 5, type: "BSB", topic: "Elektromagnit to'lqinlar nurlanishi" }
        ]
      },
      {
        subject: "Ingliz tili",
        teacher: "Shahnoza Karimova",
        room: "208-xona",
        averageScore: 4.7,
        finalQuarterGrade: 5,
        grades: [
          { id: "g42", date: "11-Oktyabr", score: 5, type: "Darsdagi javob", topic: "Technical English for Engineering" }
        ]
      }
    ]
  },
  {
    id: 23,
    fullName: "Yusupov Behrözbek",
    username: "behrozbek_y",
    password: "Maktab2026!",
    classGrade: "11-A",
    avatarColor: "from-cyan-600 to-indigo-700",
    birthDate: "2008-07-21",
    phone: "+998 90 345 90 63",
    email: "behrozbek.yusupov@maktab.uz",
    address: "Toshkent shahri, Yunusobod tumani",
    bio: "Iqtisodiy statistika va xalqaro moliya yo'nalishida oliy ma'lumot olishni rejalashtirganman.",
    targetUniversity: "Toshkent Xalqaro Ta'lim Universiteti (TIUE)",
    careerGoal: "Auditor va Moliyaviy maslahatchi",
    majorDirections: {
      block1: { subject: "Matematika", level: "B", score: 77, description: "Milliy sertifikat B toifa" },
      block2: { subject: "Ingliz tili", level: "B1+", score: 63, description: "Ingliz tili intensiv kursi" },
    },
    certificates: [
      {
        id: "cert-23-1",
        title: "Matematika Milliy Sertifikati (B)",
        subject: "Matematika",
        type: "Milliy sertifikat",
        level: "B",
        score: 77,
        issueDate: "2026-03-24",
        verificationCode: "UZ-MATH-2026-7723",
        institution: "BMBA",
        status: "Tasdiqlangan"
      }
    ],
    securitySettings: {
      twoFactorEnabled: false,
      loginAlerts: true,
      publicProfile: true,
      showGradesToClass: true,
      lastPasswordChange: "2026-09-01",
      activeSessions: [
        { id: "s-23", device: "Desktop (Windows 10)", browser: "Edge 131", ip: "84.54.190.41", lastActive: "Bugun 11:30", current: true }
      ]
    },
    overallAverage: 4.6,
    attendanceRate: 97,
    journal: [
      {
        subject: "Matematika",
        teacher: "Nargiza Salimova",
        room: "304-xona",
        averageScore: 4.6,
        finalQuarterGrade: 5,
        grades: [
          { id: "g43", date: "10-Oktyabr", score: 5, type: "BSB", topic: "Hosila yordamida funksiya ekstremumlarini topish" }
        ]
      }
    ]
  },
  {
    id: 24,
    fullName: "Yormuhammedov Shohruhbek",
    username: "shohruhbek_y",
    password: "Maktab2026!",
    classGrade: "11-A",
    avatarColor: "from-indigo-600 to-purple-800",
    birthDate: "2008-05-11",
    phone: "+998 90 456 01 64",
    email: "shohruhbek.yormuhammedov@maktab.uz",
    address: "Toshkent shahri, Yakkasaroy tumani",
    bio: "Biznes analitika, iqtisodiy modellashtirish va xorijiy bozorlar tahliliga qiziqaman.",
    targetUniversity: "Toshkent Davlat Iqtisodiyot Universiteti (TDIU)",
    careerGoal: "Strategik biznes konsultatsiyasi mutaxassisi",
    majorDirections: {
      block1: { subject: "Matematika", level: "B+", score: 86, description: "Milliy sertifikat B+ toifa" },
      block2: { subject: "Ingliz tili", level: "B2", score: 68, description: "Ingliz tili B2 tayyorgarlik" },
    },
    certificates: [
      {
        id: "cert-24-1",
        title: "Matematika Milliy Sertifikati (B+)",
        subject: "Matematika",
        type: "Milliy sertifikat",
        level: "B+",
        score: 86,
        issueDate: "2026-04-02",
        verificationCode: "UZ-MATH-2026-8624",
        institution: "BMBA",
        status: "Tasdiqlangan"
      }
    ],
    securitySettings: {
      twoFactorEnabled: false,
      loginAlerts: true,
      publicProfile: true,
      showGradesToClass: true,
      lastPasswordChange: "2026-09-04",
      activeSessions: [
        { id: "s-24", device: "Laptop (Dell XPS 13)", browser: "Chrome 131", ip: "178.218.172.19", lastActive: "Hozir faol", current: true }
      ]
    },
    overallAverage: 4.75,
    attendanceRate: 99,
    journal: [
      {
        subject: "Matematika",
        teacher: "Nargiza Salimova",
        room: "304-xona",
        averageScore: 4.8,
        finalQuarterGrade: 5,
        grades: [
          { id: "g44", date: "10-Oktyabr", score: 5, type: "BSB", topic: "Matritsalarning amaliy masalalarda qo'llanilishi" }
        ]
      }
    ]
  }
];

export const INITIAL_SCHEDULE: ScheduleItem[] = [
  { id: "sc-1", day: "Dushanba", period: 1, time: "08:30 - 09:15", subject: "Matematika (Algebra)", teacher: "Nargiza Salimova", room: "304-xona" },
  { id: "sc-2", day: "Dushanba", period: 2, time: "09:20 - 10:05", subject: "Matematika (Geometriya)", teacher: "Nargiza Salimova", room: "304-xona" },
  { id: "sc-3", day: "Dushanba", period: 3, time: "10:15 - 11:00", subject: "Ingliz tili (Academic)", teacher: "Shahnoza Karimova", room: "208-xona" },
  { id: "sc-4", day: "Dushanba", period: 4, time: "11:05 - 11:50", subject: "Fizika (Nazariya)", teacher: "Jamshid Qodirov", room: "401-xona" },
  { id: "sc-5", day: "Dushanba", period: 5, time: "12:10 - 12:55", subject: "Ona tili va adabiyot", teacher: "Gulchehra Mirzayeva", room: "105-xona" },

  { id: "sc-6", day: "Seshanba", period: 1, time: "08:30 - 09:15", subject: "Fizika (Laboratoriya)", teacher: "Jamshid Qodirov", room: "401-xona" },
  { id: "sc-7", day: "Seshanba", period: 2, time: "09:20 - 10:05", subject: "Matematika (Oliy daraja)", teacher: "Nargiza Salimova", room: "304-xona" },
  { id: "sc-8", day: "Seshanba", period: 3, time: "10:15 - 11:00", subject: "O'zbekiston tarixi", teacher: "Otabek Boboyev", room: "202-xona" },
  { id: "sc-9", day: "Seshanba", period: 4, time: "11:05 - 11:50", subject: "Informatika & IT", teacher: "Sherzod Aliyev", room: "201-xona" },
  { id: "sc-10", day: "Seshanba", period: 5, time: "12:10 - 12:55", subject: "Ingliz tili (Speaking & Essay)", teacher: "Shahnoza Karimova", room: "208-xona" },

  { id: "sc-11", day: "Chorshanba", period: 1, time: "08:30 - 09:15", subject: "Matematika (Test & BSB)", teacher: "Nargiza Salimova", room: "304-xona" },
  { id: "sc-12", day: "Chorshanba", period: 2, time: "09:20 - 10:05", subject: "Biologiya (Genetika)", teacher: "Dilnoza Ahmedova", room: "210-xona" },
  { id: "sc-13", day: "Chorshanba", period: 3, time: "10:15 - 11:00", subject: "Kimyo (Reaksiyalar)", teacher: "Farrux Ikromov", room: "212-xona" },
  { id: "sc-14", day: "Chorshanba", period: 4, time: "11:05 - 11:50", subject: "Ingliz tili (Listening & Vocab)", teacher: "Shahnoza Karimova", room: "208-xona" },
  { id: "sc-15", day: "Chorshanba", period: 5, time: "12:10 - 12:55", subject: "Jismoniy tarbiya", teacher: "Botir Rustamov", room: "Sport zal" },

  { id: "sc-16", day: "Payshanba", period: 1, time: "08:30 - 09:15", subject: "Ona tili va adabiyot", teacher: "Gulchehra Mirzayeva", room: "105-xona" },
  { id: "sc-17", day: "Payshanba", period: 2, time: "09:20 - 10:05", subject: "Fizika (Masalalar yechish)", teacher: "Jamshid Qodirov", room: "401-xona" },
  { id: "sc-18", day: "Payshanba", period: 3, time: "10:15 - 11:00", subject: "Matematika (Kombinatorika)", teacher: "Nargiza Salimova", room: "304-xona" },
  { id: "sc-19", day: "Payshanba", period: 4, time: "11:05 - 11:50", subject: "Davlat va huquq asoslari", teacher: "Otabek Boboyev", room: "202-xona" },
  { id: "sc-20", day: "Payshanba", period: 5, time: "12:10 - 12:55", subject: "Ingliz tili (IELTS Grammar)", teacher: "Shahnoza Karimova", room: "208-xona" },

  { id: "sc-21", day: "Juma", period: 1, time: "08:30 - 09:15", subject: "Matematika (Milliy sertifikat sinovi)", teacher: "Nargiza Salimova", room: "304-xona" },
  { id: "sc-22", day: "Juma", period: 2, time: "09:20 - 10:05", subject: "Informatika (Algoritmlar)", teacher: "Sherzod Aliyev", room: "201-xona" },
  { id: "sc-33", day: "Juma", period: 3, time: "10:15 - 11:00", subject: "Jahon tarixi", teacher: "Otabek Boboyev", room: "202-xona" },
  { id: "sc-24", day: "Juma", period: 4, time: "11:05 - 11:50", subject: "Sinf soati / Kasbga yo'naltirish", teacher: "Nargiza Salimova", room: "304-xona" },

  { id: "sc-25", day: "Shanba", period: 1, time: "09:00 - 10:30", subject: "Olimpiada va DTM Mock-Imtihoni", teacher: "O'qituvchilar hay'ati", room: "Katta Majlislar zali" },
  { id: "sc-26", day: "Shanba", period: 2, time: "10:45 - 12:00", subject: "Universitetlarga tayyorgarlik seminari", teacher: "Ekspertlar guruhi", room: "Media kutubxona" }
];

export const INITIAL_ANNOUNCEMENTS: SchoolAnnouncement[] = [
  {
    id: "ann-1",
    title: "1-chorak CHSB (Choraklik summativ baholash) jadvallari tasdiqlandi",
    content: "Hurmatli 11-A sinf o'quvchilari! 25-oktyabrdan 31-oktyabrgacha barcha asosiy va yo'nalish fanlaridan CHSB nazoratlari o'tkaziladi. O'quvchilardan o'z yo'nalish fanlari (Matematika, Fizika, Ingliz tili, Tarix, Biologiya) bo'yicha tayyorgarlikni kuchaytirish so'raladi.",
    date: "2026-10-18",
    author: "Direktor o'rinbosari: A. Shodiyev",
    category: "Imtihon"
  },
  {
    id: "ann-2",
    title: "BMBA Milliy sertifikatiga navbatdagi ro'yxatdan o'tish boshlandi",
    content: "Ona tili, Matematika va Chet tillari bo'yicha yangi bosqich milliy sertifikatiga arizalar qabul qilinmoqda. 11-sinf o'quvchilari shaxsiy kabinet orqali arizani biriktirib o'qituvchiga ma'lum qilishlari mumkin.",
    date: "2026-10-15",
    author: "Sinf rahbari: Nargiza Salimova",
    category: "Olimpiada"
  },
  {
    id: "ann-3",
    title: "Shanbalik Mock-Exam (Repetitsion Test) natijalari e'lon qilindi",
    content: "O'tgan shanba kuni o'tkazilgan 1-blok va 2-blok fanlari mock-imtihonida eng yuqori natijani Bahriddinov Asadbek (184 ball) va Abduxomidov Xurshidbek (181 ball) qayd etdi. Barchaga muvaffaqiyat tilaymiz!",
    date: "2026-10-12",
    author: "Ta'lim sifatini nazorat qilish bo'limi",
    category: "Dars jarayoni"
  }
];

export const INITIAL_CHAT_MESSAGES: ChatMessage[] = [
  {
    id: "m-1",
    senderId: "teacher",
    senderName: "Nargiza Salimova (Sinf rahbari)",
    senderRole: "Sinf rahbari",
    channel: "sinf",
    recipientId: "all",
    text: "Assalomu alaykum, aziz 11-A sinf o'quvchilari! Ertaga Matematika darsida Hosila qo'llanilishi bo'yicha amaliy BSB topshiriqlari tahlil qilinadi. Barchangiz darslik va daftarlaringiz bilan to'liq tayyor bo'ling.",
    timestamp: "Kecha, 18:30",
    isImportant: true
  },
  {
    id: "m-2",
    senderId: 4,
    senderName: "Bahriddinov Asadbek",
    senderRole: "O'quvchi",
    channel: "sinf",
    recipientId: "all",
    text: "Ustoz, 4-mavzudagi 15-masalaning yechim usulini dars boshida ko'rib bersangiz bo'ladimi?",
    timestamp: "Kecha, 18:45"
  },
  {
    id: "m-3",
    senderId: "teacher",
    senderName: "Nargiza Salimova (Sinf rahbari)",
    senderRole: "Sinf rahbari",
    channel: "sinf",
    recipientId: "all",
    text: "Albatta, Asadbek! Darsning dastlabki 10 daqiqasida murakkab masalalar yechimini doskada batafsil tahlil qilamiz.",
    timestamp: "Kecha, 18:50"
  },
  {
    id: "m-4",
    senderId: 22,
    senderName: "Yusufjonov Muhammadqodir",
    senderRole: "O'quvchi",
    channel: "sinf",
    recipientId: "all",
    text: "Assalomu alaykum ustoz, Fizika laboratoriya mashg'uloti uchun xona o'zgarmadimi?",
    timestamp: "Bugun, 08:05"
  },
  {
    id: "m-5",
    senderId: "teacher",
    senderName: "Nargiza Salimova (Sinf rahbari)",
    senderRole: "Sinf rahbari",
    channel: "sinf",
    recipientId: "all",
    text: "Yo'q, dars odatdagidek 401-fizika laboratoriya xonasida bo'ladi.",
    timestamp: "Bugun, 08:10"
  },
  {
    id: "m-6",
    senderId: 1,
    senderName: "Abduxomidov Xurshidbek",
    senderRole: "O'quvchi",
    channel: "sinf",
    recipientId: "all",
    text: "Do'stlar, kimda ingliz tili essay uchun vocabulary ro'yxati bor bo'lsa chatga yuborib yuboringlar iltimos.",
    timestamp: "Bugun, 09:40"
  },
  {
    id: "m-7",
    senderId: 14,
    senderName: "Pazliddinova Olimaxon",
    senderRole: "O'quvchi",
    channel: "sinf",
    recipientId: "all",
    text: "Hozir faylni biriktiraman, CEFR B2 daraja uchun kerakli 100 ta akademik so'zlar jamlanmasi bor.",
    timestamp: "Bugun, 09:45"
  }
];
