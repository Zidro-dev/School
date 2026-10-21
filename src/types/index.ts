export interface DirectionSubject {
  subject: string;
  level?: string; // e.g. "A", "B+", "B", "C+", "C", "B2", "B1"
  score?: number;
  description?: string;
}

export interface Certificate {
  id: string;
  title: string;
  subject: string;
  type: 'Milliy sertifikat' | 'IELTS' | 'CEFR' | 'Fizika' | 'Olimpiada' | 'IT' | 'Boshqa';
  level: string; // e.g. "A", "B2", "B1", "C+", "7.0", "1-darajali"
  score?: number;
  issueDate: string;
  expireDate?: string;
  verificationCode: string;
  institution: string;
  status: 'Faol' | 'Tasdiqlangan';
}

export interface ActiveSession {
  id: string;
  device: string;
  browser: string;
  ip: string;
  lastActive: string;
  current: boolean;
}

export interface SecuritySettings {
  twoFactorEnabled: boolean;
  twoFactorPin?: string;
  loginAlerts: boolean;
  publicProfile: boolean;
  showGradesToClass: boolean;
  lastPasswordChange: string;
  activeSessions: ActiveSession[];
}

export interface GradeEntry {
  id: string;
  date: string;
  score: number; // 1-5 or 1-100
  type: 'Darsdagi javob' | 'Uyga vazifa' | 'Oraliq nazorat' | 'BSB' | 'CHSB';
  topic: string;
  teacherComment?: string;
}

export interface SubjectJournal {
  subject: string;
  teacher: string;
  room: string;
  grades: GradeEntry[];
  averageScore: number;
  finalQuarterGrade?: number;
}

export interface Student {
  id: number;
  fullName: string;
  username: string;
  password: string;
  classGrade: string; // e.g. "11-A"
  avatarColor: string;
  birthDate: string;
  phone: string;
  email: string;
  address: string;
  bio: string;
  targetUniversity: string;
  careerGoal: string;
  majorDirections: {
    block1: DirectionSubject;
    block2: DirectionSubject;
  };
  certificates: Certificate[];
  securitySettings: SecuritySettings;
  overallAverage: number;
  attendanceRate: number; // e.g. 96
  journal: SubjectJournal[];
}

export interface ChatMessage {
  id: string;
  senderId: number | 'teacher' | 'admin';
  senderName: string;
  senderRole?: 'O\'quvchi' | 'Sinf rahbari' | 'O\'qituvchi';
  channel: 'sinf' | 'direct';
  recipientId?: number | 'all';
  text: string;
  timestamp: string;
  isImportant?: boolean;
}

export interface ScheduleItem {
  id: string;
  day: 'Dushanba' | 'Seshanba' | 'Chorshanba' | 'Payshanba' | 'Juma' | 'Shanba';
  period: number;
  time: string;
  subject: string;
  teacher: string;
  room: string;
}

export interface SchoolAnnouncement {
  id: string;
  title: string;
  content: string;
  date: string;
  author: string;
  category: 'Olimpiada' | 'Dars jarayoni' | 'Imtihon' | 'E\'lon';
}
