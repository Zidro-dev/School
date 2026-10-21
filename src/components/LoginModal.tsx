import React, { useState } from 'react';
import { X, Lock, User, AlertCircle, KeyRound, CheckCircle2, ArrowRight } from 'lucide-react';
import { Student } from '../types';
import { AuthSession } from '../services/storage';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  students: Student[];
  onLoginSuccess: (session: AuthSession) => void;
  onOpenAccountsDirectory: () => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({
  isOpen,
  onClose,
  students,
  onLoginSuccess,
  onOpenAccountsDirectory
}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const cleanUsername = username.trim().toLowerCase();
    const cleanPassword = password.trim();

    // Check teacher account
    if (cleanUsername === 'ustoz_salimova' || cleanUsername === 'ustoz') {
      if (cleanPassword === 'Ustoz2026!' || cleanPassword === 'admin') {
        onLoginSuccess({
          type: 'teacher',
          teacherName: 'Nargiza Salimova',
          teacherRole: '11-A Sinf rahbari & Matematika ustozi'
        });
        onClose();
        return;
      } else {
        setError('Noto\'g\'ri parol! Ustoz paroli: Ustoz2026!');
        return;
      }
    }

    // Check student account
    const found = students.find(
      s => s.username.toLowerCase() === cleanUsername || s.id.toString() === cleanUsername
    );

    if (found) {
      if (found.password === cleanPassword) {
        onLoginSuccess({
          type: 'student',
          student: found
        });
        onClose();
        return;
      } else {
        setError(`Noto'g'ri parol! Ushbu o'quvchi uchun standart parol: Maktab2026! (yoki o'zgartirilgan bo'lsa yangi parol)`);
        return;
      }
    }

    setError('Bunday foydalanuvchi topilmadi. Iltimos loginni tekshiring yoki 24 ta hisoblar ro\'yxatidan tanlang.');
  };

  const handleSelectQuickStudent = (st: Student) => {
    setUsername(st.username);
    setPassword(st.password);
    setError(null);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div 
        className="bg-white rounded-2xl max-w-md w-full shadow-2xl border border-slate-200 overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-5 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div>
            <h2 className="text-lg font-bold text-slate-900">Maktabim Portaliga Kirish</h2>
            <p className="text-xs text-slate-500 mt-0.5">O'quvchi yoki o'qituvchi shaxsiy kabineti</p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-200/50"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && (
            <div className="p-3 text-xs bg-red-50 border border-red-200 text-red-700 rounded-lg flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Login (Foydalanuvchi nomi)
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                required
                value={username}
                onChange={e => setUsername(e.target.value)}
                placeholder="masalan: xurshidbek_a yoki muhammadqodir_y"
                className="w-full pl-9 pr-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white text-slate-900"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-semibold text-slate-700">Parol</label>
              <span className="text-[11px] text-slate-400">Standart: Maktab2026!</span>
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Parolingizni kiriting"
                className="w-full pl-9 pr-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white text-slate-900"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-2.5 px-4 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-sm transition-colors flex items-center justify-center gap-2"
          >
            <span>Shaxsiy Kabinetga Kirish</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          {/* Quick Select Buttons */}
          <div className="pt-3 border-t border-slate-200 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-slate-600">Tezkor namunalar:</span>
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onOpenAccountsDirectory();
                }}
                className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
              >
                <KeyRound className="w-3.5 h-3.5" />
                <span>24 ta login ro'yxati</span>
              </button>
            </div>

            <div className="grid grid-cols-2 gap-1.5 text-xs">
              <button
                type="button"
                onClick={() => handleSelectQuickStudent(students[0])}
                className="p-2 text-left bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-md transition-colors truncate"
              >
                <p className="font-semibold text-slate-800 truncate">1. Xurshidbek A.</p>
                <p className="text-[10px] text-slate-500">Matematika A / B2</p>
              </button>
              <button
                type="button"
                onClick={() => handleSelectQuickStudent(students[21])} // Muhammadqodir Yusufjonov
                className="p-2 text-left bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-md transition-colors truncate"
              >
                <p className="font-semibold text-slate-800 truncate">22. M. Yusufjonov</p>
                <p className="text-[10px] text-slate-500">Matematika B / Fizika</p>
              </button>
              <button
                type="button"
                onClick={() => handleSelectQuickStudent(students[3])} // Asadbek Bahriddinov
                className="p-2 text-left bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-md transition-colors truncate"
              >
                <p className="font-semibold text-slate-800 truncate">4. Asadbek B.</p>
                <p className="text-[10px] text-slate-500">Matematika A / Fizika</p>
              </button>
              <button
                type="button"
                onClick={() => {
                  setUsername('ustoz_salimova');
                  setPassword('Ustoz2026!');
                  setError(null);
                }}
                className="p-2 text-left bg-amber-50 hover:bg-amber-100 border border-amber-200 rounded-md transition-colors truncate"
              >
                <p className="font-semibold text-amber-900 truncate">Sinf Rahbari (Ustoz)</p>
                <p className="text-[10px] text-amber-700">Matematika o'qituvchisi</p>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
