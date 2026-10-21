import React, { useState } from 'react';
import { 
  Award, 
  Search, 
  CheckCircle2, 
  FileCheck, 
  ShieldCheck, 
  ExternalLink, 
  Sparkles,
  QrCode,
  Building,
  GraduationCap
} from 'lucide-react';
import { Student, Certificate } from '../types';

interface CertificatesSectionProps {
  students: Student[];
  onSelectStudent: (student: Student) => void;
}

export const CertificatesSection: React.FC<CertificatesSectionProps> = ({
  students,
  onSelectStudent
}) => {
  const [filterType, setFilterType] = useState<string>('all');
  const [verifyCode, setVerifyCode] = useState('');
  const [verifiedResult, setVerifiedResult] = useState<{ cert: Certificate; student: Student } | null>(null);
  const [verifyError, setVerifyError] = useState(false);

  // Aggregate all certificates with their owner student
  const allCertificatesWithOwners: Array<{ cert: Certificate; student: Student }> = [];
  students.forEach(st => {
    st.certificates.forEach(c => {
      allCertificatesWithOwners.push({ cert: c, student: st });
    });
  });

  const filtered = allCertificatesWithOwners.filter(item => {
    if (filterType === 'all') return true;
    return item.cert.type.toLowerCase().includes(filterType.toLowerCase());
  });

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = verifyCode.trim().toUpperCase();
    if (!clean) return;

    const found = allCertificatesWithOwners.find(
      i => i.cert.verificationCode.toUpperCase() === clean ||
           i.cert.verificationCode.toUpperCase().includes(clean)
    );

    if (found) {
      setVerifiedResult(found);
      setVerifyError(false);
    } else {
      setVerifiedResult(null);
      setVerifyError(true);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Top Section Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold tracking-tight text-slate-900">
              Sertifikatlar va Yutuqlar Ko'rgazmasi
            </h2>
            <span className="text-xs px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-700 font-bold">
              {allCertificatesWithOwners.length} ta sertifikat
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            11-A sinfi o'quvchilarining Milliy va Xalqaro sertifikatlari, davlat imtihonlari imtiyozlari reyestri
          </p>
        </div>
      </div>

      {/* Verification Widget Box */}
      <div className="p-5 rounded-2xl bg-gradient-to-br from-slate-900 to-indigo-950 text-white shadow-lg space-y-4">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
              <h3 className="text-sm font-bold tracking-wide">
                Sertifikatni Haqiqiyligini Tekshirish (Verifikatsiya)
              </h3>
            </div>
            <p className="text-xs text-slate-300 mt-1">
              BMBA yoki xalqaro sertifikat seriya raqamini kiriting (masalan: <code className="text-indigo-300 font-mono">UZ-MATH-2026-8841</code> yoki <code className="text-indigo-300 font-mono">CAM-B2-993821</code>)
            </p>
          </div>

          <form onSubmit={handleVerify} className="w-full md:w-auto flex items-center gap-2">
            <input
              type="text"
              placeholder="Sertifikat kodini kiriting..."
              value={verifyCode}
              onChange={e => setVerifyCode(e.target.value)}
              className="px-3.5 py-2 text-xs bg-white/10 border border-white/20 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-400 w-full sm:w-64 font-mono"
            />
            <button
              type="submit"
              className="px-4 py-2 text-xs font-semibold bg-emerald-500 hover:bg-emerald-600 text-slate-950 rounded-lg transition-colors whitespace-nowrap shadow-sm"
            >
              Tekshirish
            </button>
          </form>
        </div>

        {/* Verification Result Card */}
        {verifiedResult && (
          <div className="p-4 rounded-xl bg-white/10 border border-emerald-500/40 text-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 animate-fadeIn">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div>
                <p className="font-bold text-white text-sm">
                  {verifiedResult.cert.title} ({verifiedResult.cert.level})
                </p>
                <p className="text-slate-300 text-xs mt-0.5">
                  Egasi: <strong className="text-white">{verifiedResult.student.fullName}</strong> ({verifiedResult.student.classGrade}) · Seriya: <span className="font-mono text-emerald-300">{verifiedResult.cert.verificationCode}</span>
                </p>
              </div>
            </div>

            <button
              onClick={() => onSelectStudent(verifiedResult.student)}
              className="px-3 py-1.5 bg-white text-slate-900 rounded-lg font-semibold hover:bg-slate-100 transition-colors text-xs whitespace-nowrap"
            >
              Profilini ko'rish
            </button>
          </div>
        )}

        {verifyError && (
          <p className="text-xs text-rose-300">
            Kiritilgan seriya raqami bo'yicha bazadan sertifikat topilmadi. Tekshirib qayta urinib ko'ring.
          </p>
        )}
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto p-1 bg-slate-100 rounded-xl border border-slate-200 text-xs font-semibold">
        <button
          onClick={() => setFilterType('all')}
          className={`px-3.5 py-1.5 rounded-lg transition-all ${
            filterType === 'all' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Barcha Sertifikatlar ({allCertificatesWithOwners.length})
        </button>
        <button
          onClick={() => setFilterType('milliy')}
          className={`px-3.5 py-1.5 rounded-lg transition-all ${
            filterType === 'milliy' ? 'bg-white text-indigo-700 shadow-sm' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Milliy Sertifikatlar (Matematika / Ona tili / Tarix)
        </button>
        <button
          onClick={() => setFilterType('cefr')}
          className={`px-3.5 py-1.5 rounded-lg transition-all ${
            filterType === 'cefr' ? 'bg-white text-emerald-700 shadow-sm' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          CEFR & IELTS (Ingliz tili)
        </button>
        <button
          onClick={() => setFilterType('olimpiada')}
          className={`px-3.5 py-1.5 rounded-lg transition-all ${
            filterType === 'olimpiada' ? 'bg-white text-amber-700 shadow-sm' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Fan Olimpiadalari & Musobaqalar
        </button>
      </div>

      {/* Certificates Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map(({ cert, student }) => (
          <div
            key={cert.id}
            className="p-5 bg-white rounded-xl border border-slate-200 hover:border-indigo-300 transition-all shadow-sm flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="p-2 rounded-lg bg-indigo-50 text-indigo-700">
                    <Award className="w-4 h-4" />
                  </span>
                  <div>
                    <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-wide">
                      {cert.type}
                    </span>
                    <h4 className="text-xs font-bold text-slate-900 line-clamp-1">{cert.title}</h4>
                  </div>
                </div>
                <span className="text-xs font-black px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 shrink-0">
                  {cert.level}
                </span>
              </div>

              {/* Owner Student */}
              <button
                onClick={() => onSelectStudent(student)}
                className="mt-3.5 w-full p-2.5 bg-slate-50 hover:bg-slate-100 rounded-lg border border-slate-100 text-left transition-colors flex items-center justify-between"
              >
                <div className="flex items-center gap-2">
                  <div className={`w-6 h-6 rounded-full bg-gradient-to-tr ${student.avatarColor} text-white flex items-center justify-center text-[10px] font-bold`}>
                    {student.fullName.slice(0, 1)}
                  </div>
                  <span className="text-xs font-semibold text-slate-800 truncate max-w-[170px]">
                    {student.fullName}
                  </span>
                </div>
                <span className="text-[11px] text-indigo-600 font-medium">Kabinet</span>
              </button>

              {/* Certificate Details */}
              <div className="mt-3 space-y-1.5 text-[11px] text-slate-500">
                <div className="flex justify-between">
                  <span>Fan:</span>
                  <span className="font-semibold text-slate-800">{cert.subject}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tashkilot:</span>
                  <span className="text-slate-700 truncate max-w-[180px]">{cert.institution}</span>
                </div>
                <div className="flex justify-between">
                  <span>Seriya kodi:</span>
                  <span className="font-mono text-indigo-700">{cert.verificationCode}</span>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
              <span>Berilgan: {cert.issueDate}</span>
              <span className="text-emerald-600 font-semibold flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" />
                <span>Tasdiqlangan</span>
              </span>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
