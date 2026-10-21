import React from 'react';
import { 
  GraduationCap, 
  Award, 
  BookOpen, 
  Users, 
  MessageSquare, 
  KeyRound, 
  ArrowRight, 
  Sparkles, 
  Calendar,
  CheckCircle2,
  Bell,
  TrendingUp,
  ShieldCheck
} from 'lucide-react';
import { Student, SchoolAnnouncement } from '../types';
import { AuthSession } from '../services/storage';

interface HomeHeroProps {
  session: AuthSession | null;
  students: Student[];
  announcements: SchoolAnnouncement[];
  onOpenLogin: () => void;
  onOpenAccountsList: () => void;
  onOpenProfile: () => void;
  onSelectStudent: (student: Student) => void;
  onNavigateTab: (tab: 'home' | 'students' | 'journal' | 'chat' | 'certificates') => void;
}

export const HomeHero: React.FC<HomeHeroProps> = ({
  session,
  students,
  announcements,
  onOpenLogin,
  onOpenAccountsList,
  onOpenProfile,
  onSelectStudent,
  onNavigateTab
}) => {
  // Top 5 students by GPA / overall average
  const sortedStudents = [...students].sort((a, b) => b.overallAverage - a.overallAverage).slice(0, 5);

  return (
    <div className="space-y-8">
      
      {/* Hero Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white p-8 sm:p-12 shadow-xl border border-indigo-900/40">
        
        {/* Subtle geometric background motif */}
        <div className="absolute -right-20 -top-20 w-80 h-80 rounded-full bg-indigo-500/10 blur-3xl pointer-events-none" />
        <div className="absolute right-1/4 -bottom-20 w-72 h-72 rounded-full bg-purple-500/10 blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs font-semibold text-indigo-200">
            <GraduationCap className="w-4 h-4 text-amber-400" />
            <span>11-A Ixtisoslashtirilgan Sinfning Raqamli Portali</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Maktabim — Raqamli Ta'lim, <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 via-sky-200 to-indigo-100">
              Shaxsiy Kabinet & Jurnal
            </span>
          </h1>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
            Har bir o'quvchi uchun mustaqil shaxsiy profil, 1-blok va 2-blok yo'nalish fanlari, elektron baholar jurnali, sertifikatlar monitoringi va sinf muloqot tizimi.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            {session ? (
              <button
                onClick={onOpenProfile}
                className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl shadow-md transition-colors flex items-center gap-2"
              >
                <span>Mening Shaxsiy Kabinetim</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={onOpenLogin}
                className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl shadow-md transition-colors flex items-center gap-2"
              >
                <span>Shaxsiy Kabinetga Kirish</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}

            <button
              onClick={onOpenAccountsList}
              className="px-4 py-2.5 bg-white/10 hover:bg-white/15 text-white border border-white/20 text-xs font-semibold rounded-xl backdrop-blur-sm transition-colors flex items-center gap-2"
            >
              <KeyRound className="w-4 h-4 text-amber-300" />
              <span>24 ta Login va Parollar</span>
            </button>

            <button
              onClick={() => onNavigateTab('journal')}
              className="px-4 py-2.5 bg-white/10 hover:bg-white/15 text-white border border-white/20 text-xs font-semibold rounded-xl backdrop-blur-sm transition-colors flex items-center gap-2"
            >
              <BookOpen className="w-4 h-4 text-sky-300" />
              <span>Darslar Jurnali</span>
            </button>
          </div>
        </div>
      </div>

      {/* 4-Item KPI Strip */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Bitiruvchilar</p>
            <p className="text-3xl font-extrabold text-slate-900 mt-1 tabular-nums">24 nafar</p>
          </div>
          <p className="text-[11px] text-indigo-600 font-medium mt-3 flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Barchaga shaxsiy login biriktirilgan</span>
          </p>
        </div>

        <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Yo'nalish Fanlari</p>
            <p className="text-3xl font-extrabold text-indigo-600 mt-1 tabular-nums">100%</p>
          </div>
          <p className="text-[11px] text-slate-600 font-medium mt-3">
            1-blok va 2-blok fanlari to'liq shakllangan
          </p>
        </div>

        <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Sertifikatlar</p>
            <p className="text-3xl font-extrabold text-emerald-600 mt-1 tabular-nums">35+ ta</p>
          </div>
          <p className="text-[11px] text-emerald-700 font-medium mt-3">
            Milliy A/B+, CEFR B2, IELTS va olimpiadalar
          </p>
        </div>

        <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">O'rtacha GPA / Davomat</p>
            <p className="text-3xl font-extrabold text-amber-600 mt-1 tabular-nums">4.72 / 98%</p>
          </div>
          <p className="text-[11px] text-slate-600 font-medium mt-3">
            Ixtisoslashtirilgan ta'lim standarti
          </p>
        </div>
      </div>

      {/* Main Content Split: Announcements (2 Cols) + Top Students Leaderboard (1 Col) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left: Announcements & School Updates (2 Cols) */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-200">
            <div className="flex items-center gap-2">
              <Bell className="w-5 h-5 text-indigo-600" />
              <h2 className="text-base font-bold text-slate-900">
                Maktab Yangiliklari va E'lonlar
              </h2>
            </div>
            <span className="text-xs text-slate-500 font-medium">1-chorak jarayoni</span>
          </div>

          <div className="space-y-3">
            {announcements.map((ann) => (
              <div 
                key={ann.id}
                className="p-5 bg-white rounded-2xl border border-slate-200 hover:border-indigo-300 transition-colors shadow-sm space-y-2"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className={`text-[11px] font-bold px-2 py-0.5 rounded ${
                    ann.category === 'Imtihon'
                      ? 'bg-rose-50 text-rose-700 border border-rose-200'
                      : ann.category === 'Olimpiada'
                      ? 'bg-indigo-50 text-indigo-700 border border-indigo-200'
                      : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                  }`}>
                    {ann.category}
                  </span>
                  <div className="flex items-center gap-1 text-[11px] text-slate-400">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{ann.date}</span>
                  </div>
                </div>

                <h3 className="text-sm font-bold text-slate-900 leading-snug">{ann.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{ann.content}</p>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
                  <span>Muallif: {ann.author}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Leaderboard / A'lochi o'quvchilar (1 Col) */}
        <div className="space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-200">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-emerald-600" />
              <h2 className="text-base font-bold text-slate-900">
                Yetakchi O'quvchilar Reytingi
              </h2>
            </div>
            <button
              onClick={() => onNavigateTab('students')}
              className="text-xs font-semibold text-indigo-600 hover:text-indigo-800"
            >
              Barchasi
            </button>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 divide-y divide-slate-100 space-y-3">
            {sortedStudents.map((st, idx) => (
              <div 
                key={st.id} 
                onClick={() => onSelectStudent(st)}
                className="pt-3 first:pt-0 flex items-center justify-between gap-3 cursor-pointer hover:bg-slate-50 p-1.5 rounded-lg transition-colors"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <span className={`w-5 h-5 rounded-full flex items-center justify-center font-bold text-xs shrink-0 ${
                    idx === 0 
                      ? 'bg-amber-400 text-slate-950' 
                      : idx === 1 
                      ? 'bg-slate-300 text-slate-800' 
                      : idx === 2 
                      ? 'bg-amber-600 text-white' 
                      : 'text-slate-400'
                  }`}>
                    {idx + 1}
                  </span>
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-slate-900 truncate">{st.fullName}</p>
                    <p className="text-[11px] text-slate-500 truncate">
                      {st.majorDirections.block1.subject} ({st.majorDirections.block1.level || 'A\'lo'})
                    </p>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <span className="font-extrabold text-xs text-indigo-700 tabular-nums">
                    {st.overallAverage}
                  </span>
                  <p className="text-[10px] text-slate-400">GPA</p>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Notice Card */}
          <div className="p-4 bg-indigo-50/70 rounded-2xl border border-indigo-100 text-xs text-indigo-900 space-y-2">
            <div className="flex items-center gap-2 font-bold text-indigo-950">
              <ShieldCheck className="w-4 h-4 text-indigo-600" />
              <span>Xavfsizlik eslatmasi</span>
            </div>
            <p className="text-[11px] leading-relaxed text-indigo-800">
              Har bir o'quvchi o'z shaxsiy profiliga kirgach, xavfsizlik sozlamalari bo'limida login va parolini o'zgartirishi, 2FA PIN-kodini faollashtirishi mumkin.
            </p>
          </div>
        </div>

      </div>

    </div>
  );
};
