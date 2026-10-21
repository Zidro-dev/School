/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HomeHero } from './components/HomeHero';
import { StudentsSection } from './components/StudentsSection';
import { JournalSection } from './components/JournalSection';
import { ChatSection } from './components/ChatSection';
import { CertificatesSection } from './components/CertificatesSection';
import { LoginModal } from './components/LoginModal';
import { AccountsListModal } from './components/AccountsListModal';
import { StudentProfileModal } from './components/StudentProfileModal';

import { 
  getStoredStudents, 
  getActiveSession, 
  setActiveSession, 
  getStoredSchedule, 
  getStoredAnnouncements,
  AuthSession 
} from './services/storage';
import { Student, ScheduleItem, SchoolAnnouncement } from './types';
import { GraduationCap, Heart, KeyRound, ShieldCheck } from 'lucide-react';

export default function App() {
  const [students, setStudents] = useState<Student[]>(() => getStoredStudents());
  const [session, setSession] = useState<AuthSession | null>(() => getActiveSession());
  const [activeTab, setActiveTab] = useState<'home' | 'students' | 'journal' | 'chat' | 'certificates'>('home');
  const [schedule] = useState<ScheduleItem[]>(() => getStoredSchedule());
  const [announcements] = useState<SchoolAnnouncement[]>(() => getStoredAnnouncements());

  // Modals state
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isAccountsListOpen, setIsAccountsListOpen] = useState(false);
  const [selectedStudentForProfile, setSelectedStudentForProfile] = useState<Student | null>(null);

  // Sync session on mount
  useEffect(() => {
    const current = getActiveSession();
    if (current) {
      setSession(current);
    }
  }, []);

  const refreshStudentsData = () => {
    const updated = getStoredStudents();
    setStudents(updated);
    const curr = getActiveSession();
    if (curr?.type === 'student' && curr.student) {
      const match = updated.find(s => s.id === curr.student?.id);
      if (match) {
        setSession({ type: 'student', student: match });
      }
    }
  };

  const handleLoginSuccess = (newSession: AuthSession) => {
    setActiveSession(newSession);
    setSession(newSession);
    refreshStudentsData();
  };

  const handleLogout = () => {
    setActiveSession(null);
    setSession(null);
  };

  // 1-Click login as student from directory table
  const handleDirectStudentLogin = (st: Student) => {
    const newSession: AuthSession = {
      type: 'student',
      student: st
    };
    handleLoginSuccess(newSession);
  };

  // 1-Click login as teacher
  const handleTeacherLogin = () => {
    const newSession: AuthSession = {
      type: 'teacher',
      teacherName: 'Nargiza Salimova',
      teacherRole: '11-A Sinf rahbari & Matematika ustozi'
    };
    handleLoginSuccess(newSession);
  };

  const handleOpenMyProfile = () => {
    if (session?.type === 'student' && session.student) {
      setSelectedStudentForProfile(session.student);
    } else {
      setIsLoginOpen(true);
    }
  };

  const handleSelectStudent = (st: Student) => {
    setSelectedStudentForProfile(st);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-900 antialiased">
      
      {/* Top Navbar */}
      <Navbar
        session={session}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenLogin={() => setIsLoginOpen(true)}
        onOpenAccountsList={() => setIsAccountsListOpen(true)}
        onOpenProfile={handleOpenMyProfile}
        onLogout={handleLogout}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {activeTab === 'home' && (
          <HomeHero
            session={session}
            students={students}
            announcements={announcements}
            onOpenLogin={() => setIsLoginOpen(true)}
            onOpenAccountsList={() => setIsAccountsListOpen(true)}
            onOpenProfile={handleOpenMyProfile}
            onSelectStudent={handleSelectStudent}
            onNavigateTab={setActiveTab}
          />
        )}

        {activeTab === 'students' && (
          <StudentsSection
            students={students}
            onSelectStudent={handleSelectStudent}
            onOpenAccountsList={() => setIsAccountsListOpen(true)}
          />
        )}

        {activeTab === 'journal' && (
          <JournalSection
            students={students}
            schedule={schedule}
            session={session}
            onRefreshStudents={refreshStudentsData}
            onSelectStudent={handleSelectStudent}
          />
        )}

        {activeTab === 'chat' && (
          <ChatSection
            students={students}
            session={session}
            onOpenLogin={() => setIsLoginOpen(true)}
            onSelectStudent={handleSelectStudent}
          />
        )}

        {activeTab === 'certificates' && (
          <CertificatesSection
            students={students}
            onSelectStudent={handleSelectStudent}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 mt-12 py-8 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-6 h-6 rounded bg-indigo-600 text-white flex items-center justify-center font-bold text-xs">
              <GraduationCap className="w-3.5 h-3.5" />
            </div>
            <span className="font-semibold text-slate-800">
              Maktabim Portali — 11-A Ixtisoslashtirilgan Sinf
            </span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsAccountsListOpen(true)}
              className="text-slate-600 hover:text-indigo-600 font-medium transition-colors flex items-center gap-1"
            >
              <KeyRound className="w-3.5 h-3.5 text-slate-400" />
              <span>24 ta Login va Parollar</span>
            </button>
            <span>·</span>
            <span>Raqamli ta'lim & baholash tizimi</span>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <LoginModal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        students={students}
        onLoginSuccess={handleLoginSuccess}
        onOpenAccountsDirectory={() => setIsAccountsListOpen(true)}
      />

      <AccountsListModal
        isOpen={isAccountsListOpen}
        onClose={() => setIsAccountsListOpen(false)}
        students={students}
        onDirectLogin={handleDirectStudentLogin}
        onTeacherLogin={handleTeacherLogin}
      />

      {selectedStudentForProfile && (
        <StudentProfileModal
          isOpen={true}
          onClose={() => setSelectedStudentForProfile(null)}
          student={selectedStudentForProfile}
          isReadOnly={session?.type === 'student' && session.student?.id !== selectedStudentForProfile.id}
          onStudentUpdated={(updated) => {
            refreshStudentsData();
            setSelectedStudentForProfile(updated);
          }}
        />
      )}

    </div>
  );
}
