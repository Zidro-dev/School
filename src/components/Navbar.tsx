import React from 'react';
import { 
  GraduationCap, 
  User, 
  LogOut, 
  ShieldCheck, 
  BookOpen, 
  Award, 
  MessageSquare, 
  Users, 
  KeyRound,
  Menu,
  X
} from 'lucide-react';
import { AuthSession } from '../services/storage';

interface NavbarProps {
  session: AuthSession | null;
  activeTab: 'home' | 'students' | 'monitoring' | 'journal' | 'chat' | 'certificates';
  setActiveTab: (tab: 'home' | 'students' | 'monitoring' | 'journal' | 'chat' | 'certificates') => void;
  onOpenLogin: () => void;
  onOpenAccountsList: () => void;
  onOpenProfile: () => void;
  onLogout: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  session,
  activeTab,
  setActiveTab,
  onOpenLogin,
  onOpenAccountsList,
  onOpenProfile,
  onLogout
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-6 h-16">
          
          {/* Zone 1: Single text element wordmark with clean academic emblem */}
          <div className="flex items-center gap-3 shrink-0">
            <button 
              onClick={() => setActiveTab('home')}
              className="flex items-center gap-2.5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 rounded-md"
            >
              <div className="w-9 h-9 rounded-lg bg-indigo-600 text-white flex items-center justify-center shadow-sm">
                <GraduationCap className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <span className="text-base font-bold tracking-tight text-slate-900 whitespace-nowrap">
                  Maktabim Portali
                </span>
                <span className="text-[11px] text-slate-500 font-medium leading-none">
                  11-A Ixtisoslashtirilgan Sinf
                </span>
              </div>
            </button>
          </div>

          {/* Zone 2: 5 clean single-line text navigation links */}
          <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-600">
            <button
              onClick={() => setActiveTab('home')}
              className={`hover:text-slate-900 transition-colors whitespace-nowrap shrink-0 pb-0.5 border-b-2 ${
                activeTab === 'home' ? 'text-indigo-600 border-indigo-600 font-semibold' : 'border-transparent'
              }`}
            >
              Bosh sahifa
            </button>
            <button
              onClick={() => setActiveTab('students')}
              className={`hover:text-slate-900 transition-colors whitespace-nowrap shrink-0 pb-0.5 border-b-2 ${
                activeTab === 'students' ? 'text-indigo-600 border-indigo-600 font-semibold' : 'border-transparent'
              }`}
            >
              O'quvchilar & Fanlar
            </button>
            <button
              onClick={() => setActiveTab('monitoring')}
              className={`hover:text-slate-900 transition-colors whitespace-nowrap shrink-0 pb-0.5 border-b-2 ${
                activeTab === 'monitoring' ? 'text-indigo-600 border-indigo-600 font-semibold' : 'border-transparent'
              }`}
            >
              Monitoring So'rovnomasi
            </button>
            <button
              onClick={() => setActiveTab('journal')}
              className={`hover:text-slate-900 transition-colors whitespace-nowrap shrink-0 pb-0.5 border-b-2 ${
                activeTab === 'journal' ? 'text-indigo-600 border-indigo-600 font-semibold' : 'border-transparent'
              }`}
            >
              Darslar Jurnali
            </button>
            <button
              onClick={() => setActiveTab('chat')}
              className={`hover:text-slate-900 transition-colors whitespace-nowrap shrink-0 pb-0.5 border-b-2 ${
                activeTab === 'chat' ? 'text-indigo-600 border-indigo-600 font-semibold' : 'border-transparent'
              }`}
            >
              Sinf Chati
            </button>
            <button
              onClick={() => setActiveTab('certificates')}
              className={`hover:text-slate-900 transition-colors whitespace-nowrap shrink-0 pb-0.5 border-b-2 ${
                activeTab === 'certificates' ? 'text-indigo-600 border-indigo-600 font-semibold' : 'border-transparent'
              }`}
            >
              Sertifikatlar
            </button>
          </nav>

          {/* Zone 3: 1 primary action / user state & Accounts Directory button */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={onOpenAccountsList}
              title="24 ta o'quvchi login va parollari"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-200 rounded-lg transition-colors whitespace-nowrap"
            >
              <KeyRound className="w-3.5 h-3.5 text-slate-500" />
              <span>24 ta Login & Parol</span>
            </button>

            {session ? (
              <div className="flex items-center gap-2">
                <button
                  onClick={onOpenProfile}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50 transition-colors text-left"
                >
                  <div className="w-7 h-7 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-xs">
                    {session.type === 'student'
                      ? session.student?.fullName.slice(0, 1)
                      : 'U'}
                  </div>
                  <div className="hidden sm:block text-xs">
                    <p className="font-semibold text-slate-800 leading-tight max-w-[130px] truncate">
                      {session.type === 'student'
                        ? session.student?.fullName.split(' ')[0]
                        : 'Nargiza Salimova'}
                    </p>
                    <p className="text-[10px] text-slate-500">
                      {session.type === 'student' ? 'Shaxsiy Kabinet' : 'O\'qituvchi'}
                    </p>
                  </div>
                </button>
                <button
                  onClick={onLogout}
                  title="Chiqish"
                  className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button
                onClick={onOpenLogin}
                className="px-4 py-2 text-xs font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors shadow-sm whitespace-nowrap shrink-0"
              >
                Tizimga kirish
              </button>
            )}

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-slate-500 hover:text-slate-800 rounded-md"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile nav drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 py-3 space-y-2">
          <button
            onClick={() => { setActiveTab('home'); setMobileMenuOpen(false); }}
            className={`w-full text-left px-3 py-2 text-sm rounded-md ${activeTab === 'home' ? 'bg-indigo-50 text-indigo-700 font-semibold' : 'text-slate-700'}`}
          >
            Bosh sahifa
          </button>
          <button
            onClick={() => { setActiveTab('students'); setMobileMenuOpen(false); }}
            className={`w-full text-left px-3 py-2 text-sm rounded-md ${activeTab === 'students' ? 'bg-indigo-50 text-indigo-700 font-semibold' : 'text-slate-700'}`}
          >
            O'quvchilar & Fanlar
          </button>
          <button
            onClick={() => { setActiveTab('monitoring'); setMobileMenuOpen(false); }}
            className={`w-full text-left px-3 py-2 text-sm rounded-md ${activeTab === 'monitoring' ? 'bg-indigo-50 text-indigo-700 font-semibold' : 'text-slate-700'}`}
          >
            Monitoring So'rovnomasi
          </button>
          <button
            onClick={() => { setActiveTab('journal'); setMobileMenuOpen(false); }}
            className={`w-full text-left px-3 py-2 text-sm rounded-md ${activeTab === 'journal' ? 'bg-indigo-50 text-indigo-700 font-semibold' : 'text-slate-700'}`}
          >
            Darslar Jurnali
          </button>
          <button
            onClick={() => { setActiveTab('chat'); setMobileMenuOpen(false); }}
            className={`w-full text-left px-3 py-2 text-sm rounded-md ${activeTab === 'chat' ? 'bg-indigo-50 text-indigo-700 font-semibold' : 'text-slate-700'}`}
          >
            Sinf Chati
          </button>
          <button
            onClick={() => { setActiveTab('certificates'); setMobileMenuOpen(false); }}
            className={`w-full text-left px-3 py-2 text-sm rounded-md ${activeTab === 'certificates' ? 'bg-indigo-50 text-indigo-700 font-semibold' : 'text-slate-700'}`}
          >
            Sertifikatlar Ko'rgazmasi
          </button>
          <div className="pt-2 border-t border-slate-100 flex flex-col gap-2">
            <button
              onClick={() => { onOpenAccountsList(); setMobileMenuOpen(false); }}
              className="w-full text-left px-3 py-2 text-xs font-medium text-slate-700 bg-slate-100 rounded-md flex items-center gap-2"
            >
              <KeyRound className="w-4 h-4 text-slate-500" />
              24 ta Login va Parollar ro'yxati
            </button>
            {session && (
              <button
                onClick={() => { onOpenProfile(); setMobileMenuOpen(false); }}
                className="w-full text-left px-3 py-2 text-xs font-semibold text-indigo-700 bg-indigo-50 rounded-md flex items-center gap-2"
              >
                <User className="w-4 h-4 text-indigo-600" />
                Shaxsiy Kabinetga o'tish
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
