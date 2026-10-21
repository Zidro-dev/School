import { Student, ChatMessage, ScheduleItem, SchoolAnnouncement, Certificate, GradeEntry, MonitoringSurveyResponse } from '../types';
import { INITIAL_STUDENTS, INITIAL_SCHEDULE, INITIAL_ANNOUNCEMENTS, INITIAL_CHAT_MESSAGES, INITIAL_MONITORING_RESPONSES } from '../data/initialData';

const STORAGE_KEYS = {
  STUDENTS: 'maktab_students_v1',
  CURRENT_USER: 'maktab_current_user_v1',
  CHAT_MESSAGES: 'maktab_chat_v1',
  SCHEDULE: 'maktab_schedule_v1',
  ANNOUNCEMENTS: 'maktab_announcements_v1',
  MONITORING: 'maktab_monitoring_v1',
};

export interface AuthSession {
  type: 'student' | 'teacher';
  student?: Student;
  teacherName?: string;
  teacherRole?: string;
}

export function getStoredStudents(): Student[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.STUDENTS);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length >= 24) {
        return parsed;
      }
    }
  } catch (err) {
    console.error('Error reading students from localStorage', err);
  }
  // Initialize default
  localStorage.setItem(STORAGE_KEYS.STUDENTS, JSON.stringify(INITIAL_STUDENTS));
  return INITIAL_STUDENTS;
}

export function saveStoredStudents(students: Student[]): void {
  try {
    localStorage.setItem(STORAGE_KEYS.STUDENTS, JSON.stringify(students));
  } catch (err) {
    console.error('Error saving students to localStorage', err);
  }
}

export function getStoredChat(): ChatMessage[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.CHAT_MESSAGES);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch (err) {
    console.error('Error reading chat messages', err);
  }
  localStorage.setItem(STORAGE_KEYS.CHAT_MESSAGES, JSON.stringify(INITIAL_CHAT_MESSAGES));
  return INITIAL_CHAT_MESSAGES;
}

export function saveStoredChat(messages: ChatMessage[]): void {
  try {
    localStorage.setItem(STORAGE_KEYS.CHAT_MESSAGES, JSON.stringify(messages));
  } catch (err) {
    console.error('Error saving chat messages', err);
  }
}

export function getStoredSchedule(): ScheduleItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.SCHEDULE);
    if (raw) return JSON.parse(raw);
  } catch (err) {
    console.error(err);
  }
  return INITIAL_SCHEDULE;
}

export function getStoredAnnouncements(): SchoolAnnouncement[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.ANNOUNCEMENTS);
    if (raw) return JSON.parse(raw);
  } catch (err) {
    console.error(err);
  }
  return INITIAL_ANNOUNCEMENTS;
}

export function getActiveSession(): AuthSession | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
    if (raw) {
      const session: AuthSession = JSON.parse(raw);
      if (session.type === 'student' && session.student) {
        // Refresh with latest student record
        const all = getStoredStudents();
        const found = all.find(s => s.id === session.student?.id);
        if (found) {
          return { type: 'student', student: found };
        }
      }
      return session;
    }
  } catch (err) {
    console.error('Error reading session', err);
  }
  return null;
}

export function setActiveSession(session: AuthSession | null): void {
  try {
    if (session) {
      localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(session));
    } else {
      localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
    }
  } catch (err) {
    console.error('Error setting session', err);
  }
}

export function updateStudentProfile(updated: Student): boolean {
  try {
    const all = getStoredStudents();
    const idx = all.findIndex(s => s.id === updated.id);
    if (idx !== -1) {
      all[idx] = updated;
      saveStoredStudents(all);
      // update active session if current user is this student
      const curr = getActiveSession();
      if (curr && curr.type === 'student' && curr.student?.id === updated.id) {
        setActiveSession({ type: 'student', student: updated });
      }
      return true;
    }
  } catch (err) {
    console.error('Error updating student', err);
  }
  return false;
}

export function addStudentCertificate(studentId: number, cert: Omit<Certificate, 'id'>): boolean {
  const all = getStoredStudents();
  const student = all.find(s => s.id === studentId);
  if (!student) return false;

  const newCert: Certificate = {
    ...cert,
    id: `cert-${studentId}-${Date.now()}`
  };

  student.certificates.unshift(newCert);
  saveStoredStudents(all);

  const curr = getActiveSession();
  if (curr?.type === 'student' && curr.student?.id === studentId) {
    setActiveSession({ type: 'student', student });
  }
  return true;
}

export function addGradeToStudent(studentId: number, subjectName: string, grade: Omit<GradeEntry, 'id'>): boolean {
  const all = getStoredStudents();
  const student = all.find(s => s.id === studentId);
  if (!student) return false;

  let subj = student.journal.find(j => j.subject.toLowerCase() === subjectName.toLowerCase());
  if (!subj) {
    subj = {
      subject: subjectName,
      teacher: "Nargiza Salimova",
      room: "304-xona",
      averageScore: grade.score,
      grades: []
    };
    student.journal.push(subj);
  }

  const newGradeEntry: GradeEntry = {
    ...grade,
    id: `g-${Date.now()}`
  };

  subj.grades.unshift(newGradeEntry);
  const total = subj.grades.reduce((acc, curr) => acc + curr.score, 0);
  subj.averageScore = parseFloat((total / subj.grades.length).toFixed(1));

  // update overall average
  const allScores: number[] = [];
  student.journal.forEach(j => {
    j.grades.forEach(g => allScores.push(g.score));
  });
  if (allScores.length > 0) {
    student.overallAverage = parseFloat((allScores.reduce((a, b) => a + b, 0) / allScores.length).toFixed(2));
  }

  saveStoredStudents(all);
  return true;
}

export function getStoredMonitoringResponses(): MonitoringSurveyResponse[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.MONITORING);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length >= 24) {
        return parsed;
      }
    }
  } catch (err) {
    console.error('Error reading monitoring responses', err);
  }
  localStorage.setItem(STORAGE_KEYS.MONITORING, JSON.stringify(INITIAL_MONITORING_RESPONSES));
  return INITIAL_MONITORING_RESPONSES;
}

export function saveStoredMonitoringResponses(responses: MonitoringSurveyResponse[]): void {
  try {
    localStorage.setItem(STORAGE_KEYS.MONITORING, JSON.stringify(responses));
  } catch (err) {
    console.error('Error saving monitoring responses', err);
  }
}

export function updateStudentMonitoring(response: MonitoringSurveyResponse): boolean {
  try {
    const all = getStoredMonitoringResponses();
    const idx = all.findIndex(r => r.studentId === response.studentId);
    if (idx !== -1) {
      all[idx] = response;
    } else {
      all.push(response);
    }
    saveStoredMonitoringResponses(all);

    // Also update student's majorDirections in student record
    const allStudents = getStoredStudents();
    const st = allStudents.find(s => s.id === response.studentId);
    if (st) {
      st.majorDirections.block1.subject = response.subject1;
      st.majorDirections.block2.subject = response.subject2;
      st.targetUniversity = response.targetUniversity || st.targetUniversity;
      saveStoredStudents(allStudents);
    }
    return true;
  } catch (err) {
    console.error('Error updating monitoring survey', err);
    return false;
  }
}

