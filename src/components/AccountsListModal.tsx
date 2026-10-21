import React, { useState } from 'react';
import { X, Search, Check, Copy, LogIn, KeyRound, ShieldAlert, Award, Sparkles } from 'lucide-react';
import { Student } from '../types';

interface AccountsListModalProps {
  isOpen: boolean;
  onClose: () => void;
  students: Student[];
  onDirectLogin: (student: Student) => void;
  onTeacherLogin: () => void;
}

export const AccountsListModal: React.FC<AccountsListModalProps> = ({
  isOpen,
  onClose,
  students,
  onDirectLogin,
  onTeacherLogin
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  if (!isOpen) return null;

  const filteredStudents = students.filter(s =>
    s.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.majorDirections.block1.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.majorDirections.block2.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (s.majorDirections.block1.level && s.majorDirections.block1.level.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (s.majorDirections.block2.level && s.majorDirections.block2.level.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-5">
      <div 
        className="bg-white rounded-2xl max-w-5xl w-full max-h-[92vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-5 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-indigo-100 text-indigo-700">
                <KeyRound className="w-5 h-5" />
              </span>
              <h2 className="text-xl font-bold text-slate-900">
                24 ta O'quvchi Login & Parollari Ma'lumotnomasi
              </h2>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Ixtisoslashtirilgan 11-A sinfining barcha 24 nafar o'quvchisi shaxsiy kabinet hisoblari va yo'nalish fanlari
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Teacher bar notice & search */}
        <div className="p-5 border-b border-slate-200 bg-white flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="O'quvchi ismi, logini yoki fan (masalan: Matematika A, Ingliz tili B2, Fizika)..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white"
            />
          </div>

          <button
            onClick={() => {
              onTeacherLogin();
              onClose();
            }}
            className="inline-flex items-center justify-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-slate-800 hover:bg-slate-900 rounded-lg transition-colors whitespace-nowrap shadow-sm"
          >
            <Award className="w-4 h-4 text-amber-400" />
            <span>Sinf Rahbari (Ustoz) kabinetiga kirish</span>
          </button>
        </div>

        {/* Table Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
          <div className="overflow-x-auto rounded-xl border border-slate-200">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-100/80 text-slate-700 border-b border-slate-200 font-semibold">
                  <th className="py-3 px-3 w-10 text-center">№</th>
                  <th className="py-3 px-4">O'quvchi F.I.SH</th>
                  <th className="py-3 px-3">1-Blok Fani & Daraja</th>
                  <th className="py-3 px-3">2-Blok Fani & Daraja</th>
                  <th className="py-3 px-3">Login (Username)</th>
                  <th className="py-3 px-3">Parol</th>
                  <th className="py-3 px-3 text-right">Amal</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredStudents.map((st) => (
                  <tr key={st.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3 px-3 text-center font-medium text-slate-400 tabular-nums">
                      {st.id}
                    </td>
                    <td className="py-3 px-4 font-semibold text-slate-900">
                      <div className="flex items-center gap-2">
                        <div className={`w-7 h-7 rounded-full bg-gradient-to-tr ${st.avatarColor} text-white flex items-center justify-center font-bold text-[11px] shrink-0`}>
                          {st.fullName.slice(0, 1)}
                        </div>
                        <div>
                          <p className="font-semibold text-slate-900">{st.fullName}</p>
                          <p className="text-[10px] text-slate-400">{st.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-3">
                      <div className="flex flex-col">
                        <span className="font-medium text-slate-800">
                          {st.majorDirections.block1.subject}
                        </span>
                        {st.majorDirections.block1.level && (
                          <span className="text-[11px] font-semibold text-indigo-700">
                            Daraja: {st.majorDirections.block1.level}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="py-3 px-3">
                      <div className="flex flex-col">
                        <span className="font-medium text-slate-800">
                          {st.majorDirections.block2.subject}
                        </span>
                        {st.majorDirections.block2.level && (
                          <span className="text-[11px] font-semibold text-emerald-700">
                            Daraja: {st.majorDirections.block2.level}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="py-3 px-3">
                      <div className="flex items-center gap-1.5 font-mono text-[11px] text-slate-700 bg-slate-100 px-2 py-1 rounded border border-slate-200 w-fit">
                        <span>{st.username}</span>
                        <button
                          onClick={() => copyToClipboard(st.username, `u-${st.id}`)}
                          className="text-slate-400 hover:text-slate-700"
                          title="Logindan nusxa olish"
                        >
                          {copiedId === `u-${st.id}` ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                        </button>
                      </div>
                    </td>
                    <td className="py-3 px-3">
                      <div className="flex items-center gap-1.5 font-mono text-[11px] text-slate-700 bg-slate-100 px-2 py-1 rounded border border-slate-200 w-fit">
                        <span>{st.password}</span>
                        <button
                          onClick={() => copyToClipboard(st.password, `p-${st.id}`)}
                          className="text-slate-400 hover:text-slate-700"
                          title="Paroldan nusxa olish"
                        >
                          {copiedId === `p-${st.id}` ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                        </button>
                      </div>
                    </td>
                    <td className="py-3 px-3 text-right">
                      <button
                        onClick={() => {
                          onDirectLogin(st);
                          onClose();
                        }}
                        className="inline-flex items-center gap-1 px-2.5 py-1.5 text-[11px] font-semibold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 rounded-md transition-colors"
                      >
                        <LogIn className="w-3 h-3" />
                        <span>Kabinetga kirish</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer info */}
        <div className="px-6 py-4 border-t border-slate-200 bg-slate-50 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span>Jami 24 ta o'quvchi hisobi faol va darslar jurnaliga ulangan</span>
          </div>
          <p className="text-[11px]">
            O'quvchilar o'z profiliga kirgach parolini va xavfsizlik sozlamalarini o'zgartira oladi.
          </p>
        </div>
      </div>
    </div>
  );
};
