import React, { useState } from 'react';
import { 
  BookOpen, 
  Calendar, 
  Clock, 
  User, 
  Plus, 
  Check, 
  Search, 
  GraduationCap, 
  Award,
  Filter
} from 'lucide-react';
import { Student, ScheduleItem, GradeEntry } from '../types';
import { AuthSession, addGradeToStudent } from '../services/storage';

interface JournalSectionProps {
  students: Student[];
  schedule: ScheduleItem[];
  session: AuthSession | null;
  onRefreshStudents: () => void;
  onSelectStudent: (student: Student) => void;
}

export const JournalSection: React.FC<JournalSectionProps> = ({
  students,
  schedule,
  session,
  onRefreshStudents,
  onSelectStudent
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'journal' | 'schedule'>('journal');
  const [selectedDay, setSelectedDay] = useState<ScheduleItem['day']>('Dushanba');
  const [selectedSubject, setSelectedSubject] = useState<string>('Matematika');
  const [searchTerm, setSearchTerm] = useState('');

  // Add grade modal state (for teachers or demo)
  const [isGradingOpen, setIsGradingOpen] = useState(false);
  const [targetStudentId, setTargetStudentId] = useState<number>(students[0]?.id || 1);
  const [gradeSubject, setGradeSubject] = useState<string>('Matematika');
  const [gradeScore, setGradeScore] = useState<number>(5);
  const [gradeType, setGradeType] = useState<GradeEntry['type']>('Darsdagi javob');
  const [gradeTopic, setGradeTopic] = useState<string>('Mavzu bo\'yicha amaliy mashg\'ulot');
  const [gradeComment, setGradeComment] = useState<string>('A\'lo javob berdi');

  const isTeacher = session?.type === 'teacher';

  const days: ScheduleItem['day'][] = ['Dushanba', 'Seshanba', 'Chorshanba', 'Payshanba', 'Juma', 'Shanba'];
  const subjectsList = ['Matematika', 'Ingliz tili', 'Fizika', 'Ona tili va adabiyot', 'Tarix', 'Biologiya', 'Informatika'];

  const filteredSchedule = schedule.filter(item => item.day === selectedDay);

  const filteredStudents = students.filter(s =>
    s.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.majorDirections.block1.subject.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddGradeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addGradeToStudent(targetStudentId, gradeSubject, {
      date: `${new Date().getDate()}-Oktyabr`,
      score: gradeScore,
      type: gradeType,
      topic: gradeTopic,
      teacherComment: gradeComment
    });
    onRefreshStudents();
    setIsGradingOpen(false);
  };

  return (
    <div className="space-y-6">
      
      {/* Top Banner & Sub-Tabs */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-slate-900">
            Darslar Jurnali & Dars Jadvali
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            11-A Ixtisoslashtirilgan sinfining haftalik o'quv rejasi, kundalik baholari va monitoringi
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* Segmented control for tabs */}
          <div className="flex items-center p-1 bg-slate-100 rounded-lg border border-slate-200 text-xs font-semibold">
            <button
              onClick={() => setActiveSubTab('journal')}
              className={`px-3 py-1.5 rounded-md transition-all ${
                activeSubTab === 'journal'
                  ? 'bg-white text-indigo-700 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Elektron Baholar Jurnali
            </button>
            <button
              onClick={() => setActiveSubTab('schedule')}
              className={`px-3 py-1.5 rounded-md transition-all ${
                activeSubTab === 'schedule'
                  ? 'bg-white text-indigo-700 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Haftalik Dars Jadvali
            </button>
          </div>

          <button
            onClick={() => setIsGradingOpen(true)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-sm transition-colors whitespace-nowrap"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Baho qo'yish</span>
          </button>
        </div>
      </div>

      {/* VIEW 1: ELECTRONIC JOURNAL */}
      {activeSubTab === 'journal' && (
        <div className="space-y-4">
          
          {/* Filter Bar */}
          <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0">
              <span className="font-semibold text-slate-700 whitespace-nowrap">Fan bo'yicha:</span>
              {subjectsList.map(subj => (
                <button
                  key={subj}
                  onClick={() => setSelectedSubject(subj)}
                  className={`px-2.5 py-1 rounded-md font-medium whitespace-nowrap transition-colors ${
                    selectedSubject === subj
                      ? 'bg-indigo-600 text-white font-semibold'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {subj}
                </button>
              ))}
            </div>

            <div className="relative w-full md:w-64">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="O'quvchini qidirish..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white text-xs"
              />
            </div>
          </div>

          {/* Journal Table */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-50 text-slate-700 border-b border-slate-200 font-semibold">
                    <th className="py-3 px-3 w-10 text-center">№</th>
                    <th className="py-3 px-4">O'quvchi F.I.SH</th>
                    <th className="py-3 px-3">1-Blok Fani</th>
                    <th className="py-3 px-3">2-Blok Fani</th>
                    <th className="py-3 px-4">{selectedSubject} baholari</th>
                    <th className="py-3 px-3 text-center">Fan O'rtachasi</th>
                    <th className="py-3 px-3 text-center">Umumiy GPA</th>
                    <th className="py-3 px-3 text-right">Amal</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredStudents.map((st) => {
                    const subjectJournal = st.journal.find(
                      j => j.subject.toLowerCase() === selectedSubject.toLowerCase()
                    );
                    const isCurrentLoggedIn = session?.type === 'student' && session.student?.id === st.id;

                    return (
                      <tr 
                        key={st.id} 
                        className={`hover:bg-slate-50 transition-colors ${
                          isCurrentLoggedIn ? 'bg-indigo-50/50 font-medium' : ''
                        }`}
                      >
                        <td className="py-3 px-3 text-center text-slate-400 tabular-nums">
                          {st.id}
                        </td>
                        <td className="py-3 px-4">
                          <button
                            onClick={() => onSelectStudent(st)}
                            className="text-left font-semibold text-slate-900 hover:text-indigo-600 transition-colors flex items-center gap-2"
                          >
                            <span className={`w-6 h-6 rounded-full bg-gradient-to-tr ${st.avatarColor} text-white flex items-center justify-center text-[10px] shrink-0 font-bold`}>
                              {st.fullName.slice(0, 1)}
                            </span>
                            <span>{st.fullName}</span>
                            {isCurrentLoggedIn && (
                              <span className="text-[10px] px-1.5 py-0.5 rounded bg-indigo-100 text-indigo-700 font-bold">
                                Siz
                              </span>
                            )}
                          </button>
                        </td>
                        <td className="py-3 px-3">
                          <span className="text-slate-800 font-medium">
                            {st.majorDirections.block1.subject}
                          </span>
                          {st.majorDirections.block1.level && (
                            <span className="ml-1 text-[11px] font-bold text-indigo-700">
                              ({st.majorDirections.block1.level})
                            </span>
                          )}
                        </td>
                        <td className="py-3 px-3">
                          <span className="text-slate-800 font-medium">
                            {st.majorDirections.block2.subject}
                          </span>
                          {st.majorDirections.block2.level && (
                            <span className="ml-1 text-[11px] font-bold text-emerald-700">
                              ({st.majorDirections.block2.level})
                            </span>
                          )}
                        </td>
                        <td className="py-3 px-4">
                          {subjectJournal && subjectJournal.grades.length > 0 ? (
                            <div className="flex items-center gap-1.5 flex-wrap">
                              {subjectJournal.grades.map((g, gIdx) => (
                                <span
                                  key={g.id || gIdx}
                                  title={`${g.type} (${g.date}): ${g.topic}`}
                                  className={`w-6 h-6 rounded-md flex items-center justify-center font-bold text-xs cursor-help ${
                                    g.score === 5
                                      ? 'bg-emerald-100 text-emerald-800'
                                      : g.score === 4
                                      ? 'bg-blue-100 text-blue-800'
                                      : 'bg-amber-100 text-amber-800'
                                  }`}
                                >
                                  {g.score}
                                </span>
                              ))}
                            </div>
                          ) : (
                            <span className="text-slate-400 text-[11px]">Baho qo'yilmagan</span>
                          )}
                        </td>
                        <td className="py-3 px-3 text-center">
                          <span className="font-bold text-slate-900 tabular-nums">
                            {subjectJournal ? subjectJournal.averageScore : '—'}
                          </span>
                        </td>
                        <td className="py-3 px-3 text-center">
                          <span className="font-extrabold text-indigo-700 tabular-nums">
                            {st.overallAverage}
                          </span>
                        </td>
                        <td className="py-3 px-3 text-right">
                          <button
                            onClick={() => onSelectStudent(st)}
                            className="px-2.5 py-1 text-[11px] font-semibold text-slate-700 hover:text-indigo-600 hover:bg-indigo-50 rounded transition-colors"
                          >
                            Kabinet
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* VIEW 2: WEEKLY SCHEDULE */}
      {activeSubTab === 'schedule' && (
        <div className="space-y-4">
          
          {/* Day Selector */}
          <div className="flex items-center gap-2 overflow-x-auto p-1.5 bg-slate-100 rounded-xl border border-slate-200">
            {days.map(day => (
              <button
                key={day}
                onClick={() => setSelectedDay(day)}
                className={`px-4 py-2 text-xs font-semibold rounded-lg whitespace-nowrap transition-all ${
                  selectedDay === day
                    ? 'bg-white text-indigo-700 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {day}
              </button>
            ))}
          </div>

          {/* Schedule Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {filteredSchedule.map(item => (
              <div 
                key={item.id}
                className="p-4 bg-white rounded-xl border border-slate-200 hover:border-indigo-300 transition-colors shadow-sm space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold px-2 py-0.5 rounded bg-indigo-50 text-indigo-700 border border-indigo-100">
                    {item.period}-Dars
                  </span>
                  <div className="flex items-center gap-1 text-slate-500 text-xs">
                    <Clock className="w-3.5 h-3.5" />
                    <span className="font-mono">{item.time}</span>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-bold text-slate-900">{item.subject}</h4>
                  <div className="flex items-center gap-2 text-xs text-slate-500 mt-1">
                    <User className="w-3.5 h-3.5" />
                    <span>{item.teacher}</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                  <span>Xona:</span>
                  <span className="font-semibold text-slate-800">{item.room}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Modal: Add Grade */}
      {isGradingOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div 
            className="bg-white rounded-2xl max-w-md w-full shadow-2xl border border-slate-200 overflow-hidden"
            onClick={e => e.stopPropagation()}
          >
            <div className="px-6 py-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900">Jurnalga Yangi Baho Qo'yish</h3>
              <button 
                onClick={() => setIsGradingOpen(false)}
                className="text-slate-400 hover:text-slate-600 text-xs"
              >
                Bekor qilish
              </button>
            </div>

            <form onSubmit={handleAddGradeSubmit} className="p-6 space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">O'quvchini tanlang</label>
                <select
                  value={targetStudentId}
                  onChange={e => setTargetStudentId(Number(e.target.value))}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 font-semibold"
                >
                  {students.map(s => (
                    <option key={s.id} value={s.id}>
                      {s.id}. {s.fullName} ({s.majorDirections.block1.subject})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Fanni tanlang</label>
                <select
                  value={gradeSubject}
                  onChange={e => setGradeSubject(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900"
                >
                  {subjectsList.map(s => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Baho (1-5)</label>
                  <select
                    value={gradeScore}
                    onChange={e => setGradeScore(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-bold text-slate-900"
                  >
                    <option value={5}>5 (A'lo)</option>
                    <option value={4}>4 (Yaxshi)</option>
                    <option value={3}>3 (Qoniqarli)</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Nazorat turi</label>
                  <select
                    value={gradeType}
                    onChange={e => setGradeType(e.target.value as GradeEntry['type'])}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900"
                  >
                    <option value="Darsdagi javob">Darsdagi javob</option>
                    <option value="Uyga vazifa">Uyga vazifa</option>
                    <option value="Oraliq nazorat">Oraliq nazorat</option>
                    <option value="BSB">BSB</option>
                    <option value="CHSB">CHSB</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Dars mavzusi</label>
                <input
                  type="text"
                  required
                  value={gradeTopic}
                  onChange={e => setGradeTopic(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">O'qituvchi izohi</label>
                <input
                  type="text"
                  value={gradeComment}
                  onChange={e => setGradeComment(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsGradingOpen(false)}
                  className="px-3 py-1.5 border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-100"
                >
                  Bekor qilish
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 shadow-sm"
                >
                  Bahoni saqlash
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
