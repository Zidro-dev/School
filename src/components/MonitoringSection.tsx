import React, { useState } from 'react';
import { 
  ClipboardCheck, 
  CheckCircle2, 
  Search, 
  Filter, 
  Printer, 
  Edit3, 
  Save, 
  User, 
  GraduationCap, 
  BookOpen, 
  Sparkles,
  BarChart3,
  Calendar,
  AlertCircle
} from 'lucide-react';
import { Student, MonitoringSurveyResponse } from '../types';
import { AuthSession, updateStudentMonitoring, getStoredMonitoringResponses } from '../services/storage';

interface MonitoringSectionProps {
  students: Student[];
  session: AuthSession | null;
  onOpenLogin: () => void;
  onSelectStudent: (student: Student) => void;
  onRefreshData: () => void;
}

export const MonitoringSection: React.FC<MonitoringSectionProps> = ({
  students,
  session,
  onOpenLogin,
  onSelectStudent,
  onRefreshData
}) => {
  const [responses, setResponses] = useState<MonitoringSurveyResponse[]>(() => getStoredMonitoringResponses());
  const [searchTerm, setSearchTerm] = useState('');
  const [subjectPairFilter, setSubjectPairFilter] = useState<string>('all');
  const [isEditingModalOpen, setIsEditingModalOpen] = useState(false);
  const [selectedResponse, setSelectedResponse] = useState<MonitoringSurveyResponse | null>(null);
  const [notification, setNotification] = useState<string | null>(null);

  // Form states for adding / updating choice
  const defaultTargetId = session?.type === 'student' && session.student ? session.student.id : 1;
  const [formStudentId, setFormStudentId] = useState<number>(defaultTargetId);
  const [formSubject1, setFormSubject1] = useState<string>('Matematika');
  const [formSubject2, setFormSubject2] = useState<string>('Ingliz tili');
  const [formTargetScore, setFormTargetScore] = useState<number>(180);
  const [formPreparedness, setFormPreparedness] = useState<MonitoringSurveyResponse['preparednessLevel']>('Yuqori (A / B2)');
  const [formWave, setFormWave] = useState<MonitoringSurveyResponse['examWave']>('1-to\'lqin (Noyabr monitoringi)');
  const [formMajor, setFormMajor] = useState<string>('Dasturiy injiniring / Iqtisodiyot');
  const [formUniversity, setFormUniversity] = useState<string>('Toshkent Davlat Universiteti');
  const [formNotes, setFormNotes] = useState<string>('');

  const refreshResponses = () => {
    const updated = getStoredMonitoringResponses();
    setResponses(updated);
  };

  const handleEditClick = (res: MonitoringSurveyResponse) => {
    setSelectedResponse(res);
    setFormStudentId(res.studentId);
    setFormSubject1(res.subject1);
    setFormSubject2(res.subject2);
    setFormTargetScore(res.targetScore);
    setFormPreparedness(res.preparednessLevel);
    setFormWave(res.examWave);
    setFormMajor(res.targetMajor);
    setFormUniversity(res.targetUniversity);
    setFormNotes(res.notes || '');
    setIsEditingModalOpen(true);
  };

  const handleSaveResponse = (e: React.FormEvent) => {
    e.preventDefault();
    const st = students.find(s => s.id === formStudentId);
    if (!st) return;

    const payload: MonitoringSurveyResponse = {
      studentId: st.id,
      studentName: st.fullName,
      classGrade: st.classGrade,
      subject1: formSubject1,
      subject2: formSubject2,
      targetScore: formTargetScore,
      preparednessLevel: formPreparedness,
      examWave: formWave,
      targetMajor: formMajor,
      targetUniversity: formUniversity,
      submittedAt: new Date().toLocaleDateString('uz-UZ') + ' ' + new Date().toLocaleTimeString('uz-UZ', { hour: '2-digit', minute: '2-digit' }),
      notes: formNotes
    };

    updateStudentMonitoring(payload);
    refreshResponses();
    onRefreshData();
    setIsEditingModalOpen(false);

    setNotification(`${st.fullName} uchun monitoring fanlari muvaffaqiyatli saqlandi!`);
    setTimeout(() => setNotification(null), 4000);
  };

  // Quick action for current logged-in student
  const myResponse = session?.type === 'student' && session.student 
    ? responses.find(r => r.studentId === session.student?.id) 
    : null;

  // Filtered responses list
  const filteredResponses = responses.filter(r => {
    const matchesSearch = 
      r.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.subject1.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.subject2.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.targetUniversity.toLowerCase().includes(searchTerm.toLowerCase());

    if (!matchesSearch) return false;

    if (subjectPairFilter === 'math_eng') {
      return r.subject1.toLowerCase().includes('matematika') && r.subject2.toLowerCase().includes('ingliz');
    }
    if (subjectPairFilter === 'math_phys') {
      return r.subject1.toLowerCase().includes('matematika') && r.subject2.toLowerCase().includes('fizika');
    }
    if (subjectPairFilter === 'bio_chem') {
      return r.subject1.toLowerCase().includes('biologiya') || r.subject2.toLowerCase().includes('kimyo');
    }
    if (subjectPairFilter === 'lang_hist') {
      return r.subject1.toLowerCase().includes('ona tili') || r.subject1.toLowerCase().includes('tarix');
    }

    return true;
  });

  // Calculate stats
  const countMathEng = responses.filter(r => r.subject1.toLowerCase().includes('matematika') && r.subject2.toLowerCase().includes('ingliz')).length;
  const countMathPhys = responses.filter(r => r.subject1.toLowerCase().includes('matematika') && r.subject2.toLowerCase().includes('fizika')).length;
  const countBioChem = responses.filter(r => r.subject1.toLowerCase().includes('biologiya') || r.subject2.toLowerCase().includes('kimyo')).length;
  const countOther = responses.length - countMathEng - countMathPhys - countBioChem;

  const countSubject1Math = responses.filter(r => r.subject1.toLowerCase().includes('matematika')).length;
  const countSubject2Eng = responses.filter(r => r.subject2.toLowerCase().includes('ingliz')).length;
  const countSubject2Phys = responses.filter(r => r.subject2.toLowerCase().includes('fizika')).length;

  return (
    <div className="space-y-6">
      
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold tracking-tight text-slate-900">
              Monitoring Bo'yicha So'rovnoma & Fanlar Taqsimoti
            </h2>
            <span className="text-xs px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-700 font-bold">
              24/24 to'ldirilgan
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            11-A sinfi o'quvchilarining davlat monitoringi va kirish imtihonlarida qaysi 2 ta asosiy fandan test topshirishi rasmiy qaydnomasi
          </p>
        </div>

        <div className="flex items-center gap-2">
          {session ? (
            <button
              onClick={() => {
                if (session.type === 'student' && session.student) {
                  const match = responses.find(r => r.studentId === session.student?.id);
                  if (match) handleEditClick(match);
                } else {
                  handleEditClick(responses[0]);
                }
              }}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-sm transition-colors whitespace-nowrap"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>
                {session.type === 'student' ? 'Mening 2 ta asosiy fanimni belgilash' : 'So\'rovnomani tahrirlash'}
              </span>
            </button>
          ) : (
            <button
              onClick={onOpenLogin}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-sm transition-colors whitespace-nowrap"
            >
              <User className="w-3.5 h-3.5" />
              <span>Tanlovni kiritish uchun kiring</span>
            </button>
          )}

          <button
            onClick={() => window.print()}
            className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 rounded-lg shadow-sm transition-colors"
            title="Hisobotni chop etish"
          >
            <Printer className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Chop etish</span>
          </button>
        </div>
      </div>

      {notification && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-lg flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{notification}</span>
        </div>
      )}

      {/* Current Logged In Student Fast Highlight Card */}
      {session?.type === 'student' && myResponse && (
        <div className="p-5 rounded-2xl bg-gradient-to-r from-indigo-900 to-slate-900 text-white shadow-md flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-300">
              Sizning Monitoring Tanlovingiz
            </span>
            <h3 className="text-base font-bold text-white">
              1-Asosiy Fan: <span className="text-amber-300">{myResponse.subject1}</span> · 2-Asosiy Fan: <span className="text-emerald-300">{myResponse.subject2}</span>
            </h3>
            <p className="text-xs text-slate-300">
              Maqsadli ball: <strong className="text-white font-mono">{myResponse.targetScore} ball</strong> · Tayyorgarlik: {myResponse.preparednessLevel} · Reja: {myResponse.targetUniversity}
            </p>
          </div>

          <button
            onClick={() => handleEditClick(myResponse)}
            className="px-4 py-2 bg-white text-slate-900 hover:bg-slate-100 rounded-lg text-xs font-bold transition-colors whitespace-nowrap"
          >
            O'zgartirish
          </button>
        </div>
      )}

      {/* KPI Stats Strip: Subject Combinations */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold text-slate-500">Matematika + Ingliz tili</p>
            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-indigo-50 text-indigo-700">Iqtisod & IT</span>
          </div>
          <p className="text-2xl font-black text-indigo-600 mt-1 tabular-nums">{countMathEng} nafar</p>
          <p className="text-[11px] text-slate-400 mt-0.5">Sinfning 58% o'quvchisi</p>
        </div>

        <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold text-slate-500">Matematika + Fizika</p>
            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700">Muhandislik</span>
          </div>
          <p className="text-2xl font-black text-emerald-600 mt-1 tabular-nums">{countMathPhys} nafar</p>
          <p className="text-[11px] text-slate-400 mt-0.5">Sinfning 29% o'quvchisi</p>
        </div>

        <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold text-slate-500">Biologiya + Kimyo</p>
            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-rose-50 text-rose-700">Tibbiyot</span>
          </div>
          <p className="text-2xl font-black text-rose-600 mt-1 tabular-nums">{countBioChem} nafar</p>
          <p className="text-[11px] text-slate-400 mt-0.5">Shifokorlik yo'nalishi</p>
        </div>

        <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold text-slate-500">Tarix & Ona tili</p>
            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-amber-50 text-amber-700">Gumanitar</span>
          </div>
          <p className="text-2xl font-black text-amber-600 mt-1 tabular-nums">{countOther} nafar</p>
          <p className="text-[11px] text-slate-400 mt-0.5">Huquq va Filologiya</p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
          <button
            onClick={() => setSubjectPairFilter('all')}
            className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-colors ${
              subjectPairFilter === 'all'
                ? 'bg-slate-900 text-white font-semibold'
                : 'bg-slate-100 text-slate-600 hover:text-slate-900'
            }`}
          >
            Barcha O'quvchilar (24)
          </button>
          <button
            onClick={() => setSubjectPairFilter('math_eng')}
            className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-colors ${
              subjectPairFilter === 'math_eng'
                ? 'bg-indigo-600 text-white font-semibold'
                : 'bg-slate-100 text-slate-600 hover:text-slate-900'
            }`}
          >
            Matematika + Ingliz tili ({countMathEng})
          </button>
          <button
            onClick={() => setSubjectPairFilter('math_phys')}
            className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-colors ${
              subjectPairFilter === 'math_phys'
                ? 'bg-emerald-600 text-white font-semibold'
                : 'bg-slate-100 text-slate-600 hover:text-slate-900'
            }`}
          >
            Matematika + Fizika ({countMathPhys})
          </button>
          <button
            onClick={() => setSubjectPairFilter('bio_chem')}
            className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-colors ${
              subjectPairFilter === 'bio_chem'
                ? 'bg-rose-600 text-white font-semibold'
                : 'bg-slate-100 text-slate-600 hover:text-slate-900'
            }`}
          >
            Biologiya + Kimyo ({countBioChem})
          </button>
          <button
            onClick={() => setSubjectPairFilter('lang_hist')}
            className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-colors ${
              subjectPairFilter === 'lang_hist'
                ? 'bg-amber-600 text-white font-semibold'
                : 'bg-slate-100 text-slate-600 hover:text-slate-900'
            }`}
          >
            Tarix / Ona tili ({countOther})
          </button>
        </div>

        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="O'quvchi ismi, fan yoki OTM..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white"
          />
        </div>
      </div>

      {/* Monitoring Responses Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-100/80 text-slate-700 border-b border-slate-200 font-semibold">
                <th className="py-3 px-3 w-10 text-center">№</th>
                <th className="py-3 px-4">O'quvchi F.I.SH</th>
                <th className="py-3 px-3">1-Asosiy Fan</th>
                <th className="py-3 px-3">2-Asosiy Fan</th>
                <th className="py-3 px-3 text-center">Maqsadli Ball</th>
                <th className="py-3 px-3">Tayyorgarlik</th>
                <th className="py-3 px-3">Monitoring To'lqini</th>
                <th className="py-3 px-4">Maqsadli OTM & Mutaxassislik</th>
                <th className="py-3 px-3 text-right">Amallar</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredResponses.map((res) => {
                const st = students.find(s => s.id === res.studentId);
                const isMe = session?.type === 'student' && session.student?.id === res.studentId;

                return (
                  <tr 
                    key={res.studentId}
                    className={`hover:bg-slate-50/80 transition-colors ${
                      isMe ? 'bg-indigo-50/50 font-medium' : ''
                    }`}
                  >
                    <td className="py-3.5 px-3 text-center text-slate-400 tabular-nums font-medium">
                      {res.studentId}
                    </td>

                    <td className="py-3.5 px-4 font-semibold text-slate-900">
                      <div className="flex items-center gap-2">
                        {st && (
                          <div className={`w-7 h-7 rounded-full bg-gradient-to-tr ${st.avatarColor} text-white flex items-center justify-center font-bold text-[11px] shrink-0`}>
                            {res.studentName.slice(0, 1)}
                          </div>
                        )}
                        <div>
                          <p className="text-slate-900 leading-tight flex items-center gap-1.5">
                            <span>{res.studentName}</span>
                            {isMe && (
                              <span className="text-[10px] px-1.5 py-0.2 bg-indigo-100 text-indigo-700 rounded font-bold">
                                Siz
                              </span>
                            )}
                          </p>
                          <p className="text-[10px] text-slate-400">{res.classGrade} · Qayd: {res.submittedAt.split(' ')[0]}</p>
                        </div>
                      </div>
                    </td>

                    <td className="py-3.5 px-3">
                      <span className="px-2.5 py-1 rounded-md bg-indigo-50 text-indigo-800 font-bold border border-indigo-200/60 inline-block">
                        {res.subject1}
                      </span>
                    </td>

                    <td className="py-3.5 px-3">
                      <span className="px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-800 font-bold border border-emerald-200/60 inline-block">
                        {res.subject2}
                      </span>
                    </td>

                    <td className="py-3.5 px-3 text-center">
                      <span className="font-extrabold text-slate-900 tabular-nums">
                        {res.targetScore}
                      </span>
                      <span className="text-[10px] text-slate-400 block">/ 189 ball</span>
                    </td>

                    <td className="py-3.5 px-3">
                      <span className={`text-[11px] font-semibold ${
                        res.preparednessLevel.includes('Yuqori')
                          ? 'text-emerald-700'
                          : res.preparednessLevel.includes('O\'rta')
                          ? 'text-indigo-700'
                          : 'text-amber-700'
                      }`}>
                        {res.preparednessLevel}
                      </span>
                    </td>

                    <td className="py-3.5 px-3">
                      <span className="text-slate-600 text-[11px]">
                        {res.examWave}
                      </span>
                    </td>

                    <td className="py-3.5 px-4">
                      <p className="font-semibold text-slate-800 text-[11px] truncate max-w-[200px]">
                        {res.targetUniversity}
                      </p>
                      <p className="text-[10px] text-slate-500 truncate max-w-[200px]">
                        {res.targetMajor}
                      </p>
                    </td>

                    <td className="py-3.5 px-3 text-right">
                      <button
                        onClick={() => handleEditClick(res)}
                        className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-semibold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 rounded-md transition-colors"
                      >
                        <Edit3 className="w-3 h-3" />
                        <span>Tahrirlash</span>
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit / Survey Modal */}
      {isEditingModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div 
            className="bg-white rounded-2xl max-w-lg w-full shadow-2xl border border-slate-200 overflow-hidden"
            onClick={e => e.stopPropagation()}
          >
            <div className="px-6 py-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-slate-900">
                  Monitoring Test Fanlarini Belgilash
                </h3>
                <p className="text-[11px] text-slate-500">
                  Qaysi 2 ta asosiy fandan test topshirishini tasdiqlang
                </p>
              </div>
              <button
                onClick={() => setIsEditingModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 text-xs"
              >
                Yopish
              </button>
            </div>

            <form onSubmit={handleSaveResponse} className="p-6 space-y-4 text-xs">
              
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  O'quvchi
                </label>
                <select
                  value={formStudentId}
                  disabled={session?.type === 'student'}
                  onChange={e => setFormStudentId(Number(e.target.value))}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-slate-900"
                >
                  {students.map(s => (
                    <option key={s.id} value={s.id}>
                      {s.id}. {s.fullName} ({s.classGrade})
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    1-Asosiy Blok Fani
                  </label>
                  <select
                    value={formSubject1}
                    onChange={e => setFormSubject1(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-bold text-indigo-900"
                  >
                    <option value="Matematika">Matematika</option>
                    <option value="Biologiya">Biologiya</option>
                    <option value="Ona tili va adabiyot">Ona tili va adabiyot</option>
                    <option value="Tarix">Tarix</option>
                    <option value="Kimyo">Kimyo</option>
                    <option value="Fizika">Fizika</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    2-Asosiy Blok Fani
                  </label>
                  <select
                    value={formSubject2}
                    onChange={e => setFormSubject2(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-bold text-emerald-900"
                  >
                    <option value="Ingliz tili">Ingliz tili</option>
                    <option value="Fizika">Fizika</option>
                    <option value="Kimyo">Kimyo</option>
                    <option value="Huquq / Ingliz tili">Huquq / Ingliz tili</option>
                    <option value="Informatika va Fizika">Informatika va Fizika</option>
                    <option value="Biologiya">Biologiya</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Maqsadli ball (1-189)
                  </label>
                  <input
                    type="number"
                    min={100}
                    max={189}
                    required
                    value={formTargetScore}
                    onChange={e => setFormTargetScore(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-mono font-bold text-slate-900"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Tayyorgarlik darajasi
                  </label>
                  <select
                    value={formPreparedness}
                    onChange={e => setFormPreparedness(e.target.value as MonitoringSurveyResponse['preparednessLevel'])}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900"
                  >
                    <option value="Yuqori (A / B2)">Yuqori (A / B2)</option>
                    <option value="O'rta (B+ / B / B1)">O'rta (B+ / B / B1)</option>
                    <option value="Boshlang'ich (C+ / C)">Boshlang'ich (C+ / C)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Test topshirish to'lqini
                </label>
                <select
                  value={formWave}
                  onChange={e => setFormWave(e.target.value as MonitoringSurveyResponse['examWave'])}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900"
                >
                  <option value="1-to'lqin (Noyabr monitoringi)">1-to'lqin (Noyabr monitoringi)</option>
                  <option value="2-to'lqin (Yanvar oraliq)">2-to'lqin (Yanvar oraliq)</option>
                  <option value="Asosiy BMBA (Bahor)">Asosiy BMBA (Bahor)</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Maqsad qilingan Universitet (OTM)
                </label>
                <input
                  type="text"
                  required
                  value={formUniversity}
                  onChange={e => setFormUniversity(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Yo'nalish / Mutaxassislik
                </label>
                <input
                  type="text"
                  required
                  value={formMajor}
                  onChange={e => setFormMajor(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Izoh yoki imtiyozlar (sertifikatlar)
                </label>
                <input
                  type="text"
                  value={formNotes}
                  onChange={e => setFormNotes(e.target.value)}
                  placeholder="masalan: Milliy sertifikat A toifa bor"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsEditingModalOpen(false)}
                  className="px-3 py-2 border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-100"
                >
                  Bekor qilish
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg shadow-sm"
                >
                  Saqlash va Tasdiqlash
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
