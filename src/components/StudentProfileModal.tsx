import React, { useState } from 'react';
import { 
  X, 
  User, 
  ShieldCheck, 
  Award, 
  BookOpen, 
  KeyRound, 
  Check, 
  AlertCircle, 
  Smartphone, 
  Monitor, 
  Plus, 
  Lock, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar,
  Save,
  CheckCircle2,
  FileCheck,
  GraduationCap
} from 'lucide-react';
import { Student, Certificate } from '../types';
import { updateStudentProfile, addStudentCertificate } from '../services/storage';

interface StudentProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  student: Student;
  onStudentUpdated: (updated: Student) => void;
  isReadOnly?: boolean;
}

export const StudentProfileModal: React.FC<StudentProfileModalProps> = ({
  isOpen,
  onClose,
  student,
  onStudentUpdated,
  isReadOnly = false
}) => {
  const [activeTab, setActiveTab] = useState<'info' | 'directions' | 'certificates' | 'journal' | 'security'>('info');

  // Editable profile info
  const [phone, setPhone] = useState(student.phone);
  const [email, setEmail] = useState(student.email);
  const [address, setAddress] = useState(student.address);
  const [targetUniversity, setTargetUniversity] = useState(student.targetUniversity);
  const [careerGoal, setCareerGoal] = useState(student.careerGoal);
  const [bio, setBio] = useState(student.bio);

  // Security tab fields
  const [newUsername, setNewUsername] = useState(student.username);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(student.securitySettings.twoFactorEnabled);
  const [twoFactorPin, setTwoFactorPin] = useState(student.securitySettings.twoFactorPin || '');
  const [publicProfile, setPublicProfile] = useState(student.securitySettings.publicProfile);
  const [loginAlerts, setLoginAlerts] = useState(student.securitySettings.loginAlerts);
  
  // Feedback messages
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // New certificate modal state
  const [showAddCertModal, setShowAddCertModal] = useState(false);
  const [newCertTitle, setNewCertTitle] = useState('');
  const [newCertSubject, setNewCertSubject] = useState('Matematika');
  const [newCertType, setNewCertType] = useState<Certificate['type']>('Milliy sertifikat');
  const [newCertLevel, setNewCertLevel] = useState('A');
  const [newCertScore, setNewCertScore] = useState<number>(85);
  const [newCertInstitution, setNewCertInstitution] = useState('Bilim va malakalarni baholash agentligi (BMBA)');

  if (!isOpen) return null;

  const showSuccess = (msg: string) => {
    setSuccessMessage(msg);
    setErrorMessage(null);
    setTimeout(() => setSuccessMessage(null), 4000);
  };

  const showError = (msg: string) => {
    setErrorMessage(msg);
    setSuccessMessage(null);
  };

  // Save basic profile
  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    const updated: Student = {
      ...student,
      phone,
      email,
      address,
      targetUniversity,
      careerGoal,
      bio
    };

    updateStudentProfile(updated);
    onStudentUpdated(updated);
    showSuccess('Profil ma\'lumotlari muvaffaqiyatli saqlandi!');
  };

  // Update Username and Password
  const handleUpdateCredentials = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword) {
      if (currentPassword !== student.password) {
        showError('Joriy parol noto\'g\'ri kiritildi!');
        return;
      }
      if (newPassword.length < 6) {
        showError('Yangi parol kamida 6 ta belgidan iborat bo\'lishi shart!');
        return;
      }
      if (newPassword !== confirmPassword) {
        showError('Yangi parollar bir-biriga mos kelmadi!');
        return;
      }
    }

    if (!newUsername.trim()) {
      showError('Login (foydalanuvchi nomi) bo\'sh bo\'lishi mumkin emas!');
      return;
    }

    const updated: Student = {
      ...student,
      username: newUsername.trim(),
      password: newPassword ? newPassword : student.password,
      securitySettings: {
        ...student.securitySettings,
        lastPasswordChange: newPassword ? new Date().toISOString().split('T')[0] : student.securitySettings.lastPasswordChange
      }
    };

    updateStudentProfile(updated);
    onStudentUpdated(updated);
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    showSuccess('Login va xavfsizlik paroli muvaffaqiyatli yangilandi!');
  };

  // Update Security & 2FA
  const handleUpdateSecuritySettings = () => {
    if (twoFactorEnabled && twoFactorPin.length < 4) {
      showError('2FA PIN kodi kamida 4 xonali son bo\'lishi kerak!');
      return;
    }

    const updated: Student = {
      ...student,
      securitySettings: {
        ...student.securitySettings,
        twoFactorEnabled,
        twoFactorPin: twoFactorEnabled ? twoFactorPin : undefined,
        publicProfile,
        loginAlerts
      }
    };

    updateStudentProfile(updated);
    onStudentUpdated(updated);
    showSuccess('Xavfsizlik parametrlari muvaffaqiyatli saqlandi!');
  };

  // Terminate other sessions
  const handleTerminateOtherSessions = () => {
    const currentOnly = student.securitySettings.activeSessions.filter(s => s.current);
    const updated: Student = {
      ...student,
      securitySettings: {
        ...student.securitySettings,
        activeSessions: currentOnly.length > 0 ? currentOnly : [
          { id: 'cur', device: 'Joriy Brauzer', browser: 'Chrome 131', ip: '178.218.200.5', lastActive: 'Hozir faol', current: true }
        ]
      }
    };
    updateStudentProfile(updated);
    onStudentUpdated(updated);
    showSuccess('Boshqa barcha qurilmalardagi faol sessiyalar tugatildi.');
  };

  // Add new certificate
  const handleAddCertificate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCertTitle.trim()) {
      showError('Sertifikat nomi kiritilishi lozim');
      return;
    }

    const newCert: Omit<Certificate, 'id'> = {
      title: newCertTitle.trim(),
      subject: newCertSubject,
      type: newCertType,
      level: newCertLevel,
      score: newCertScore,
      issueDate: new Date().toISOString().split('T')[0],
      verificationCode: `CERT-${Date.now().toString().slice(-6)}`,
      institution: newCertInstitution,
      status: 'Tasdiqlangan'
    };

    addStudentCertificate(student.id, newCert);
    const updatedStudent = {
      ...student,
      certificates: [
        { ...newCert, id: `cert-${Date.now()}` },
        ...student.certificates
      ]
    };
    onStudentUpdated(updatedStudent);
    setShowAddCertModal(false);
    setNewCertTitle('');
    showSuccess('Yangi sertifikat shaxsiy kabinetingizga biriktirildi!');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-5">
      <div 
        className="bg-white rounded-2xl max-w-4xl w-full max-h-[92vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        {/* Top Header Card */}
        <div className="px-6 py-5 bg-gradient-to-r from-slate-900 to-indigo-950 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-4">
            <div className={`w-12 h-12 rounded-xl bg-gradient-to-tr ${student.avatarColor} text-white flex items-center justify-center font-bold text-lg shadow-md shrink-0`}>
              {student.fullName.slice(0, 1)}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold tracking-tight">{student.fullName}</h2>
                <span className="text-[11px] px-2 py-0.5 rounded bg-white/10 font-semibold text-indigo-200">
                  {student.classGrade}
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-0.5">
                Login: <span className="font-mono text-indigo-300">@{student.username}</span> · O'rtacha baho: <span className="font-semibold text-emerald-400">{student.overallAverage}</span> · Davomat: {student.attendanceRate}%
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Strip */}
        <div className="flex items-center gap-1 px-6 border-b border-slate-200 bg-slate-50 overflow-x-auto text-xs shrink-0">
          <button
            onClick={() => setActiveTab('info')}
            className={`py-3 px-3.5 font-semibold border-b-2 whitespace-nowrap transition-colors flex items-center gap-1.5 ${
              activeTab === 'info'
                ? 'border-indigo-600 text-indigo-700 bg-white'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <User className="w-3.5 h-3.5" />
            <span>O'zi haqida ma'lumot</span>
          </button>
          <button
            onClick={() => setActiveTab('directions')}
            className={`py-3 px-3.5 font-semibold border-b-2 whitespace-nowrap transition-colors flex items-center gap-1.5 ${
              activeTab === 'directions'
                ? 'border-indigo-600 text-indigo-700 bg-white'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <GraduationCap className="w-3.5 h-3.5" />
            <span>Asosiy Yo'nalish Fanlari</span>
          </button>
          <button
            onClick={() => setActiveTab('certificates')}
            className={`py-3 px-3.5 font-semibold border-b-2 whitespace-nowrap transition-colors flex items-center gap-1.5 ${
              activeTab === 'certificates'
                ? 'border-indigo-600 text-indigo-700 bg-white'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <Award className="w-3.5 h-3.5" />
            <span>Sertifikatlar ({student.certificates.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('journal')}
            className={`py-3 px-3.5 font-semibold border-b-2 whitespace-nowrap transition-colors flex items-center gap-1.5 ${
              activeTab === 'journal'
                ? 'border-indigo-600 text-indigo-700 bg-white'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Darslar Jurnali & Baholar</span>
          </button>
          <button
            onClick={() => setActiveTab('security')}
            className={`py-3 px-3.5 font-semibold border-b-2 whitespace-nowrap transition-colors flex items-center gap-1.5 ${
              activeTab === 'security'
                ? 'border-indigo-600 text-indigo-700 bg-white'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Xavfsizlik & Parolni o'zgartirish</span>
          </button>
        </div>

        {/* Feedback alerts */}
        {successMessage && (
          <div className="mx-6 mt-4 p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-lg flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{successMessage}</span>
          </div>
        )}
        {errorMessage && (
          <div className="mx-6 mt-4 p-3 bg-red-50 border border-red-200 text-red-800 text-xs rounded-lg flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Tab Panels */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          
          {/* TAB 1: INFO */}
          {activeTab === 'info' && (
            <form onSubmit={handleSaveProfile} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    To'liq F.I.SH
                  </label>
                  <input
                    type="text"
                    disabled
                    value={student.fullName}
                    className="w-full px-3 py-2 text-sm bg-slate-100 border border-slate-200 rounded-lg text-slate-600 cursor-not-allowed"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Sinf va Bosqich
                  </label>
                  <input
                    type="text"
                    disabled
                    value={`${student.classGrade} - Ixtisoslashtirilgan bitiruvchi sinf`}
                    className="w-full px-3 py-2 text-sm bg-slate-100 border border-slate-200 rounded-lg text-slate-600 cursor-not-allowed"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Telefon raqam
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      disabled={isReadOnly}
                      value={phone}
                      onChange={e => setPhone(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Elektron pochta
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      disabled={isReadOnly}
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white"
                    />
                  </div>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Yashash manzili
                  </label>
                  <div className="relative">
                    <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      disabled={isReadOnly}
                      value={address}
                      onChange={e => setAddress(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Maqsad qilingan OTM (Universitet)
                  </label>
                  <input
                    type="text"
                    disabled={isReadOnly}
                    value={targetUniversity}
                    onChange={e => setTargetUniversity(e.target.value)}
                    placeholder="masalan: Westminster, TATU, Inha, TDTU..."
                    className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Kelajakdagi kasbiy maqsad
                  </label>
                  <input
                    type="text"
                    disabled={isReadOnly}
                    value={careerGoal}
                    onChange={e => setCareerGoal(e.target.value)}
                    placeholder="masalan: Dasturiy ta'minot arxitektori, Kiberxavfsizlik mutaxassisi..."
                    className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    O'zi haqida qisqacha ma'lumot (Biografiya & Qiziqishlar)
                  </label>
                  <textarea
                    rows={3}
                    disabled={isReadOnly}
                    value={bio}
                    onChange={e => setBio(e.target.value)}
                    placeholder="Qiziqishlaringiz, qo'shimcha yutuqlaringiz va maqsadlaringiz haqida yozing..."
                    className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white"
                  />
                </div>
              </div>

              {!isReadOnly && (
                <div className="flex justify-end pt-3 border-t border-slate-100">
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-sm transition-colors"
                  >
                    <Save className="w-4 h-4" />
                    <span>Profil o'zgarishlarini saqlash</span>
                  </button>
                </div>
              )}
            </form>
          )}

          {/* TAB 2: DIRECTIONS */}
          {activeTab === 'directions' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-bold text-slate-900 mb-1">Asosiy Yo'nalishdagi Fanlar (1-Blok va 2-Blok)</h3>
                <p className="text-xs text-slate-500">
                  Davlat test markazi va nufuzli oliygohlar imtihonlari uchun tanlangan asosiy mutaxassislik fanlari
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* 1-Blok */}
                <div className="p-5 rounded-xl border border-indigo-200 bg-indigo-50/50">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold uppercase tracking-wider text-indigo-700">
                      1-Asosiy Blok Fani
                    </span>
                    {student.majorDirections.block1.level && (
                      <span className="text-xs font-bold px-2 py-0.5 rounded bg-indigo-100 text-indigo-800 border border-indigo-200">
                        Daraja: {student.majorDirections.block1.level}
                      </span>
                    )}
                  </div>
                  <h4 className="text-xl font-extrabold text-slate-900">
                    {student.majorDirections.block1.subject}
                  </h4>
                  <p className="text-xs text-slate-600 mt-2">
                    {student.majorDirections.block1.description || "Asosiy mutaxassislik fani bo'yicha tayyorgarlik."}
                  </p>
                  {student.majorDirections.block1.score && (
                    <div className="mt-4 pt-3 border-t border-indigo-100 flex items-center justify-between text-xs">
                      <span className="text-slate-500">To'plangan ko'rsatkich:</span>
                      <span className="font-bold text-slate-900 tabular-nums">
                        {student.majorDirections.block1.score} ball
                      </span>
                    </div>
                  )}
                </div>

                {/* 2-Blok */}
                <div className="p-5 rounded-xl border border-emerald-200 bg-emerald-50/50">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">
                      2-Asosiy Blok Fani
                    </span>
                    {student.majorDirections.block2.level && (
                      <span className="text-xs font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 border border-emerald-200">
                        Daraja: {student.majorDirections.block2.level}
                      </span>
                    )}
                  </div>
                  <h4 className="text-xl font-extrabold text-slate-900">
                    {student.majorDirections.block2.subject}
                  </h4>
                  <p className="text-xs text-slate-600 mt-2">
                    {student.majorDirections.block2.description || "Ikkinchi yo'nalish fani bo'yicha mustahkam bilim."}
                  </p>
                  {student.majorDirections.block2.score && (
                    <div className="mt-4 pt-3 border-t border-emerald-100 flex items-center justify-between text-xs">
                      <span className="text-slate-500">To'plangan ko'rsatkich:</span>
                      <span className="font-bold text-slate-900 tabular-nums">
                        {student.majorDirections.block2.score} ball
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Direction Guidance */}
              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 text-xs text-slate-600 space-y-1">
                <p className="font-semibold text-slate-800">Yo'nalish fanlari bo'yicha qo'shimcha imtiyozlar:</p>
                <p>• Matematika Milliy sertifikatining <strong>A yoki B+</strong> darajasi DTM kirish imtihonlarida maksimal 93-100% ball beradi.</p>
                <p>• Ingliz tili <strong>CEFR B2 yoki IELTS 6.0+</strong> sertifikati chet tili fanidan maksimal 100% ball beradi.</p>
                <p>• Fizika olimpiadasi g'oliblari davlat granti asosida o'qishga imtiyozli qabul qilinish huquqiga ega.</p>
              </div>
            </div>
          )}

          {/* TAB 3: CERTIFICATES */}
          {activeTab === 'certificates' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-slate-900">Rasmiy Sertifikatlar va Diplomlar</h3>
                  <p className="text-xs text-slate-500">
                    Milliy va xalqaro baholash tizimlari tomonidan tasdiqlangan hujjatlar
                  </p>
                </div>
                {!isReadOnly && (
                  <button
                    onClick={() => setShowAddCertModal(true)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-sm transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Yangi sertifikat qo'shish</span>
                  </button>
                )}
              </div>

              {student.certificates.length === 0 ? (
                <div className="text-center py-10 border border-dashed border-slate-200 rounded-xl">
                  <Award className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                  <p className="text-xs text-slate-500">Hozircha biriktirilgan sertifikatlar mavjud emas.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {student.certificates.map(cert => (
                    <div key={cert.id} className="p-4 rounded-xl border border-slate-200 bg-white hover:border-indigo-300 transition-colors shadow-sm">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <span className="p-2 rounded-lg bg-indigo-50 text-indigo-700">
                            <FileCheck className="w-4 h-4" />
                          </span>
                          <div>
                            <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-wide">
                              {cert.type}
                            </span>
                            <h4 className="text-xs font-bold text-slate-900 line-clamp-1">{cert.title}</h4>
                          </div>
                        </div>
                        <span className="text-xs font-extrabold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 shrink-0">
                          {cert.level}
                        </span>
                      </div>

                      <div className="mt-3 pt-2 border-t border-slate-100 text-[11px] text-slate-500 space-y-1">
                        <div className="flex justify-between">
                          <span>Fan:</span>
                          <span className="font-semibold text-slate-800">{cert.subject}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Tashkilot:</span>
                          <span className="text-slate-700 truncate max-w-[190px]">{cert.institution}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Verifikatsiya kodi:</span>
                          <span className="font-mono text-indigo-600">{cert.verificationCode}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Berilgan sana:</span>
                          <span>{cert.issueDate}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Add Certificate Modal / Drawer */}
              {showAddCertModal && (
                <div className="p-4 rounded-xl border border-indigo-200 bg-indigo-50/40 mt-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold text-indigo-900">Yangi Sertifikat Ma'lumotlarini Kiritish</h4>
                    <button
                      onClick={() => setShowAddCertModal(false)}
                      className="text-slate-400 hover:text-slate-600 text-xs"
                    >
                      Bekor qilish
                    </button>
                  </div>
                  <form onSubmit={handleAddCertificate} className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div className="sm:col-span-2">
                      <label className="block font-semibold text-slate-700 mb-1">Sertifikat nomi</label>
                      <input
                        type="text"
                        required
                        placeholder="masalan: Matematika fanidan Milliy Sertifikat"
                        value={newCertTitle}
                        onChange={e => setNewCertTitle(e.target.value)}
                        className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-md"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">Fani</label>
                      <input
                        type="text"
                        required
                        value={newCertSubject}
                        onChange={e => setNewCertSubject(e.target.value)}
                        className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-md"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">Sertifikat turi</label>
                      <select
                        value={newCertType}
                        onChange={e => setNewCertType(e.target.value as Certificate['type'])}
                        className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-md"
                      >
                        <option value="Milliy sertifikat">Milliy sertifikat</option>
                        <option value="CEFR">CEFR</option>
                        <option value="IELTS">IELTS</option>
                        <option value="Fizika">Fizika</option>
                        <option value="Olimpiada">Olimpiada</option>
                        <option value="IT">IT</option>
                        <option value="Boshqa">Boshqa</option>
                      </select>
                    </div>
                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">Daraja / Toifa</label>
                      <input
                        type="text"
                        required
                        placeholder="A, B+, B, B2, 7.0, 1-o'rin"
                        value={newCertLevel}
                        onChange={e => setNewCertLevel(e.target.value)}
                        className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-md"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">To'plangan ball</label>
                      <input
                        type="number"
                        value={newCertScore}
                        onChange={e => setNewCertScore(Number(e.target.value))}
                        className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-md"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block font-semibold text-slate-700 mb-1">Bergan tashkilot</label>
                      <input
                        type="text"
                        required
                        value={newCertInstitution}
                        onChange={e => setNewCertInstitution(e.target.value)}
                        className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-md"
                      />
                    </div>
                    <div className="sm:col-span-2 flex justify-end gap-2 pt-2">
                      <button
                        type="button"
                        onClick={() => setShowAddCertModal(false)}
                        className="px-3 py-1.5 border border-slate-200 rounded-md text-slate-600 hover:bg-slate-100"
                      >
                        Bekor qilish
                      </button>
                      <button
                        type="submit"
                        className="px-4 py-1.5 bg-indigo-600 text-white rounded-md font-semibold hover:bg-indigo-700"
                      >
                        Saqlash
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </div>
          )}

          {/* TAB 4: JOURNAL & GRADES */}
          {activeTab === 'journal' && (
            <div className="space-y-5">
              <div className="grid grid-cols-3 gap-3">
                <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-center">
                  <p className="text-[11px] text-slate-500">O'rtacha GPA / Ball</p>
                  <p className="text-xl font-bold text-slate-900 tabular-nums">{student.overallAverage}</p>
                </div>
                <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-center">
                  <p className="text-[11px] text-emerald-700">Davomat ko'rsatkichi</p>
                  <p className="text-xl font-bold text-emerald-800 tabular-nums">{student.attendanceRate}%</p>
                </div>
                <div className="p-3 bg-indigo-50 border border-indigo-200 rounded-xl text-center">
                  <p className="text-[11px] text-indigo-700">Jami baholar soni</p>
                  <p className="text-xl font-bold text-indigo-800 tabular-nums">
                    {student.journal.reduce((acc, j) => acc + j.grades.length, 0)} ta
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                {student.journal.map((subj, sIdx) => (
                  <div key={sIdx} className="rounded-xl border border-slate-200 overflow-hidden bg-white">
                    <div className="px-4 py-3 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
                      <div>
                        <h4 className="text-xs font-bold text-slate-900">{subj.subject}</h4>
                        <p className="text-[11px] text-slate-500">O'qituvchi: {subj.teacher} · {subj.room}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-xs text-slate-600">
                          Fan o'rtachasi: <strong className="text-slate-900 tabular-nums">{subj.averageScore}</strong>
                        </span>
                        {subj.finalQuarterGrade && (
                          <span className="text-xs font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                            Chorak: {subj.finalQuarterGrade}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="p-3 divide-y divide-slate-100">
                      {subj.grades.length === 0 ? (
                        <p className="text-xs text-slate-400 py-2 text-center">Hozircha baho qo'yilmagan</p>
                      ) : (
                        subj.grades.map((g, gIdx) => (
                          <div key={gIdx} className="py-2 flex items-center justify-between text-xs">
                            <div className="flex items-center gap-2">
                              <span className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs ${
                                g.score === 5 
                                  ? 'bg-emerald-100 text-emerald-800' 
                                  : g.score === 4 
                                  ? 'bg-blue-100 text-blue-800' 
                                  : 'bg-amber-100 text-amber-800'
                              }`}>
                                {g.score}
                              </span>
                              <div>
                                <p className="font-semibold text-slate-800">{g.topic}</p>
                                <p className="text-[10px] text-slate-500">{g.type} · {g.date}</p>
                              </div>
                            </div>
                            {g.teacherComment && (
                              <span className="text-[11px] text-slate-500 italic max-w-xs truncate">
                                "{g.teacherComment}"
                              </span>
                            )}
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: SECURITY & PASSWORD CHANGE */}
          {activeTab === 'security' && (
            <div className="space-y-6">
              
              {/* Login & Password Modification Card */}
              <div className="p-5 rounded-xl border border-slate-200 bg-white shadow-sm space-y-4">
                <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
                  <KeyRound className="w-4 h-4 text-indigo-600" />
                  <h3 className="text-sm font-bold text-slate-900">
                    Login va Parolni O'zgartirish
                  </h3>
                </div>

                <form onSubmit={handleUpdateCredentials} className="space-y-4 text-xs">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      Login (Foydalanuvchi nomi)
                    </label>
                    <input
                      type="text"
                      required
                      value={newUsername}
                      onChange={e => setNewUsername(e.target.value)}
                      placeholder="yangi login nomi"
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 font-mono text-xs focus:ring-2 focus:ring-indigo-500 focus:bg-white"
                    />
                    <p className="text-[10px] text-slate-400 mt-1">
                      Ushbu login orqali shaxsiy kabinetingizga kirasiz.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">
                        Joriy parol
                      </label>
                      <input
                        type="password"
                        value={currentPassword}
                        onChange={e => setCurrentPassword(e.target.value)}
                        placeholder="Joriy parolingiz"
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:ring-2 focus:ring-indigo-500 focus:bg-white"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">
                        Yangi parol
                      </label>
                      <input
                        type="password"
                        value={newPassword}
                        onChange={e => setNewPassword(e.target.value)}
                        placeholder="Kamida 6 belgi"
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:ring-2 focus:ring-indigo-500 focus:bg-white"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">
                        Yangi parolni tasdiqlang
                      </label>
                      <input
                        type="password"
                        value={confirmPassword}
                        onChange={e => setConfirmPassword(e.target.value)}
                        placeholder="Qayta kiriting"
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:ring-2 focus:ring-indigo-500 focus:bg-white"
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <span className="text-[11px] text-slate-500">
                      Oxirgi parolni yangilash: {student.securitySettings.lastPasswordChange}
                    </span>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg shadow-sm transition-colors"
                    >
                      Login va Parolni Yangilash
                    </button>
                  </div>
                </form>
              </div>

              {/* Two-Factor Authentication & Privacy */}
              <div className="p-5 rounded-xl border border-slate-200 bg-white shadow-sm space-y-4">
                <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
                  <ShieldCheck className="w-4 h-4 text-indigo-600" />
                  <h3 className="text-sm font-bold text-slate-900">
                    Qo'shimcha Xavfsizlik & 2FA Himoyasi
                  </h3>
                </div>

                <div className="space-y-4 text-xs">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-slate-800">2FA / PIN-kod bilan himoyalash</p>
                      <p className="text-[11px] text-slate-500">
                        Har gal shaxsiy kabinetga kirishda 4 xonali PIN so'raladi
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={twoFactorEnabled}
                        onChange={e => setTwoFactorEnabled(e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-9 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-indigo-600"></div>
                    </label>
                  </div>

                  {twoFactorEnabled && (
                    <div className="p-3 bg-indigo-50/60 rounded-lg border border-indigo-100">
                      <label className="block font-semibold text-indigo-950 mb-1">
                        4 xonali shaxsiy PIN kod:
                      </label>
                      <input
                        type="password"
                        maxLength={4}
                        value={twoFactorPin}
                        onChange={e => setTwoFactorPin(e.target.value.replace(/\D/g, ''))}
                        placeholder="masalan: 1234"
                        className="w-32 px-3 py-1.5 text-sm tracking-widest font-mono bg-white border border-slate-300 rounded-md text-center focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>
                  )}

                  <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                    <div>
                      <p className="font-semibold text-slate-800">Kirish xavfsizligi ogohlantirishlari</p>
                      <p className="text-[11px] text-slate-500">Noma'lum brauzerdan kirilganda ogohlantirish</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={loginAlerts}
                        onChange={e => setLoginAlerts(e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-9 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-indigo-600"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                    <div>
                      <p className="font-semibold text-slate-800">Profil va sertifikatlar ommaviyligi</p>
                      <p className="text-[11px] text-slate-500">Sertifikatlaringiz umumiy sinf reytingida ko'rinadi</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={publicProfile}
                        onChange={e => setPublicProfile(e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-9 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-indigo-600"></div>
                    </label>
                  </div>

                  <div className="pt-2 flex justify-end">
                    <button
                      type="button"
                      onClick={handleUpdateSecuritySettings}
                      className="px-4 py-2 bg-slate-800 hover:bg-slate-900 text-white font-semibold rounded-lg shadow-sm transition-colors"
                    >
                      Xavfsizlik parametrlarini saqlash
                    </button>
                  </div>
                </div>
              </div>

              {/* Active Sessions */}
              <div className="p-5 rounded-xl border border-slate-200 bg-white shadow-sm space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <Monitor className="w-4 h-4 text-indigo-600" />
                    <h3 className="text-sm font-bold text-slate-900">Faol Qurilmalar va Sessiyalar</h3>
                  </div>
                  <button
                    onClick={handleTerminateOtherSessions}
                    className="text-xs text-red-600 hover:text-red-800 font-semibold"
                  >
                    Boshqa barcha qurilmalardan chiqish
                  </button>
                </div>

                <div className="space-y-2 text-xs">
                  {student.securitySettings.activeSessions.map((session, sIdx) => (
                    <div key={session.id || sIdx} className="p-3 bg-slate-50 rounded-lg flex items-center justify-between border border-slate-200/80">
                      <div className="flex items-center gap-2.5">
                        <Monitor className="w-4 h-4 text-slate-500" />
                        <div>
                          <p className="font-semibold text-slate-800 flex items-center gap-2">
                            <span>{session.device} ({session.browser})</span>
                            {session.current && (
                              <span className="text-[10px] px-1.5 py-0.2 bg-emerald-100 text-emerald-800 rounded font-bold">
                                Joriy qurilma
                              </span>
                            )}
                          </p>
                          <p className="text-[11px] text-slate-400">
                            IP: {session.ip} · {session.lastActive}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

        </div>
      </div>
    </div>
  );
};
