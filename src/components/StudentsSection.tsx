import React, { useState } from 'react';
import { 
  Users, 
  Search, 
  Award, 
  GraduationCap, 
  ExternalLink, 
  BookOpen, 
  ShieldCheck, 
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { Student } from '../types';

interface StudentsSectionProps {
  students: Student[];
  onSelectStudent: (student: Student) => void;
  onOpenAccountsList: () => void;
}

export const StudentsSection: React.FC<StudentsSectionProps> = ({
  students,
  onSelectStudent,
  onOpenAccountsList
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterTag, setFilterTag] = useState<'all' | 'math_a' | 'english_b2' | 'physics' | 'national_cert'>('all');

  const filteredStudents = students.filter(s => {
    const matchesSearch = 
      s.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.targetUniversity.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.majorDirections.block1.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.majorDirections.block2.subject.toLowerCase().includes(searchTerm.toLowerCase());

    if (!matchesSearch) return false;

    if (filterTag === 'math_a') {
      return s.majorDirections.block1.level === 'A';
    }
    if (filterTag === 'english_b2') {
      return s.majorDirections.block2.level?.includes('B2');
    }
    if (filterTag === 'physics') {
      return s.majorDirections.block2.subject.toLowerCase().includes('fizika');
    }
    if (filterTag === 'national_cert') {
      return s.certificates.some(c => c.type === 'Milliy sertifikat');
    }

    return true;
  });

  return (
    <div className="space-y-6">
      
      {/* Top Section Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold tracking-tight text-slate-900">
              Sinf O'quvchilari va Yo'nalish Fanlari
            </h2>
            <span className="text-xs px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-700 font-bold">
              24 nafar o'quvchi
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            11-A Ixtisoslashtirilgan sinfining barcha o'quvchilari, ularning 1-blok va 2-blok fanlari hamda sertifikatlari
          </p>
        </div>

        <button
          onClick={onOpenAccountsList}
          className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-slate-800 bg-white hover:bg-slate-50 border border-slate-200 rounded-lg shadow-sm transition-colors whitespace-nowrap"
        >
          <Award className="w-3.5 h-3.5 text-indigo-600" />
          <span>24 ta Login va Parol jadvali</span>
        </button>
      </div>

      {/* KPI Stats Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-sm">
          <p className="text-xs text-slate-500 font-medium">Jami O'quvchilar</p>
          <p className="text-2xl font-bold text-slate-900 mt-1 tabular-nums">24 nafar</p>
          <p className="text-[11px] text-indigo-600 mt-0.5 font-medium">100% yo'nalish aniqlangan</p>
        </div>

        <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-sm">
          <p className="text-xs text-slate-500 font-medium">Matematika A darajalilar</p>
          <p className="text-2xl font-bold text-indigo-600 mt-1 tabular-nums">
            {students.filter(s => s.majorDirections.block1.level === 'A').length} nafar
          </p>
          <p className="text-[11px] text-slate-500 mt-0.5">Milliy sertifikat A toifa</p>
        </div>

        <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-sm">
          <p className="text-xs text-slate-500 font-medium">Ingliz tili B2 / CEFR</p>
          <p className="text-2xl font-bold text-emerald-600 mt-1 tabular-nums">
            {students.filter(s => s.majorDirections.block2.level?.includes('B2')).length} nafar
          </p>
          <p className="text-[11px] text-slate-500 mt-0.5">Maksimal 100% imtiyoz</p>
        </div>

        <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-sm">
          <p className="text-xs text-slate-500 font-medium">Fizika yo'nalishidagilar</p>
          <p className="text-2xl font-bold text-amber-600 mt-1 tabular-nums">
            {students.filter(s => s.majorDirections.block2.subject.toLowerCase().includes('fizika')).length} nafar
          </p>
          <p className="text-[11px] text-slate-500 mt-0.5">Muhandislik & Texnika</p>
        </div>
      </div>

      {/* Search & Filter Toolbar */}
      <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 text-xs">
        {/* Interactive filter tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
          <button
            onClick={() => setFilterTag('all')}
            className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-colors ${
              filterTag === 'all'
                ? 'bg-slate-900 text-white font-semibold'
                : 'bg-slate-100 text-slate-600 hover:text-slate-900'
            }`}
          >
            Barchasi (24)
          </button>
          <button
            onClick={() => setFilterTag('math_a')}
            className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-colors ${
              filterTag === 'math_a'
                ? 'bg-indigo-600 text-white font-semibold'
                : 'bg-slate-100 text-slate-600 hover:text-slate-900'
            }`}
          >
            Matematika A toifalilar
          </button>
          <button
            onClick={() => setFilterTag('english_b2')}
            className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-colors ${
              filterTag === 'english_b2'
                ? 'bg-emerald-600 text-white font-semibold'
                : 'bg-slate-100 text-slate-600 hover:text-slate-900'
            }`}
          >
            Ingliz tili B2 / CEFR
          </button>
          <button
            onClick={() => setFilterTag('physics')}
            className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-colors ${
              filterTag === 'physics'
                ? 'bg-amber-600 text-white font-semibold'
                : 'bg-slate-100 text-slate-600 hover:text-slate-900'
            }`}
          >
            Fizika yo'nalishi
          </button>
          <button
            onClick={() => setFilterTag('national_cert')}
            className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-colors ${
              filterTag === 'national_cert'
                ? 'bg-indigo-700 text-white font-semibold'
                : 'bg-slate-100 text-slate-600 hover:text-slate-900'
            }`}
          >
            Milliy Sertifikat egalari
          </button>
        </div>

        {/* Search input */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Ism, login yoki fan qidirish..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white"
          />
        </div>
      </div>

      {/* Students Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredStudents.map((st) => (
          <div
            key={st.id}
            className="p-5 bg-white rounded-xl border border-slate-200 hover:border-indigo-400 transition-all shadow-sm hover:shadow-md flex flex-col justify-between group"
          >
            <div>
              {/* Card Header: Avatar & Name */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className={`w-11 h-11 rounded-xl bg-gradient-to-tr ${st.avatarColor} text-white flex items-center justify-center font-bold text-base shadow-sm shrink-0`}>
                    {st.fullName.slice(0, 1)}
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 group-hover:text-indigo-600 transition-colors leading-tight">
                      {st.fullName}
                    </h3>
                    <p className="text-[11px] text-slate-400 font-mono mt-0.5">
                      @{st.username} · {st.classGrade}
                    </p>
                  </div>
                </div>
                <span className="text-[11px] font-bold text-slate-400 tabular-nums">
                  #{st.id}
                </span>
              </div>

              {/* Major Direction Subjects Box */}
              <div className="mt-4 p-3 bg-slate-50 rounded-lg border border-slate-100 space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-slate-500 text-[11px]">1-Blok:</span>
                  <span className="font-semibold text-slate-800 text-right">
                    {st.majorDirections.block1.subject}
                    {st.majorDirections.block1.level && (
                      <span className="ml-1.5 font-bold text-indigo-600 bg-indigo-50 px-1.5 py-0.2 rounded border border-indigo-200/60">
                        {st.majorDirections.block1.level}
                      </span>
                    )}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500 text-[11px]">2-Blok:</span>
                  <span className="font-semibold text-slate-800 text-right">
                    {st.majorDirections.block2.subject}
                    {st.majorDirections.block2.level && (
                      <span className="ml-1.5 font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.2 rounded border border-emerald-200/60">
                        {st.majorDirections.block2.level}
                      </span>
                    )}
                  </span>
                </div>
              </div>

              {/* Target university & goal */}
              <div className="mt-3 text-[11px] text-slate-600 space-y-1">
                <p className="truncate">
                  <strong className="text-slate-700">OTM:</strong> {st.targetUniversity}
                </p>
                <p className="truncate">
                  <strong className="text-slate-700">Kasb:</strong> {st.careerGoal}
                </p>
              </div>
            </div>

            {/* Bottom Actions & Meta */}
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2 text-[11px] text-slate-500">
                <span className="font-semibold text-slate-700">{st.certificates.length} ta sertifikat</span>
                <span>·</span>
                <span className="font-bold text-emerald-600 tabular-nums">{st.overallAverage} GPA</span>
              </div>

              <button
                onClick={() => onSelectStudent(st)}
                className="inline-flex items-center gap-1 font-semibold text-indigo-600 hover:text-indigo-800 group-hover:translate-x-0.5 transition-transform"
              >
                <span>Profil</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredStudents.length === 0 && (
        <div className="text-center py-12 bg-white rounded-xl border border-slate-200">
          <Users className="w-10 h-10 text-slate-300 mx-auto mb-2" />
          <h3 className="text-sm font-semibold text-slate-800">Bunday mezon bo'yicha o'quvchi topilmadi</h3>
          <p className="text-xs text-slate-400 mt-1">Qidiruv so'zini o'zgartirib ko'ring yoki barcha o'quvchilar ro'yxatiga qayting.</p>
        </div>
      )}

    </div>
  );
};
