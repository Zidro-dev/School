import React, { useState, useRef, useEffect } from 'react';
import { 
  Send, 
  MessageSquare, 
  Pin, 
  User, 
  Paperclip, 
  Sparkles, 
  Smile, 
  CheckCheck,
  ShieldCheck,
  Award
} from 'lucide-react';
import { ChatMessage, Student } from '../types';
import { AuthSession, saveStoredChat, getStoredChat } from '../services/storage';

interface ChatSectionProps {
  students: Student[];
  session: AuthSession | null;
  onOpenLogin: () => void;
  onSelectStudent: (student: Student) => void;
}

export const ChatSection: React.FC<ChatSectionProps> = ({
  students,
  session,
  onOpenLogin,
  onSelectStudent
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>(() => getStoredChat());
  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    if (!session) {
      onOpenLogin();
      return;
    }

    let senderName = '';
    let senderRole: ChatMessage['senderRole'] = 'O\'quvchi';
    let senderId: ChatMessage['senderId'] = 1;

    if (session.type === 'teacher') {
      senderName = 'Nargiza Salimova (Sinf rahbari)';
      senderRole = 'Sinf rahbari';
      senderId = 'teacher';
    } else if (session.student) {
      senderName = session.student.fullName;
      senderRole = 'O\'quvchi';
      senderId = session.student.id;
    }

    const newMsg: ChatMessage = {
      id: `m-${Date.now()}`,
      senderId,
      senderName,
      senderRole,
      channel: 'sinf',
      recipientId: 'all',
      text: inputText.trim(),
      timestamp: `Bugun, ${new Date().toLocaleTimeString('uz-UZ', { hour: '2-digit', minute: '2-digit' })}`
    };

    const updated = [...messages, newMsg];
    setMessages(updated);
    saveStoredChat(updated);
    setInputText('');
  };

  return (
    <div className="space-y-4">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-3 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold tracking-tight text-slate-900">
              11-A Sinf Muloqot Markazi & Chat
            </h2>
            <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-semibold">
              24 nafar a'zo
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Dars vazifalari, olimpiada savollari va o'qituvchi e'lonlari bo'yicha tezkor muloqot guruhi
          </p>
        </div>

        {!session && (
          <button
            onClick={onOpenLogin}
            className="px-3 py-1.5 text-xs font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors shadow-sm"
          >
            Chatda yozish uchun tizimga kiring
          </button>
        )}
      </div>

      {/* Main Chat Layout: 2 Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 h-[620px]">
        
        {/* Messages Stream (3 Cols) */}
        <div className="lg:col-span-3 bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col overflow-hidden">
          
          {/* Chat Room Top Bar */}
          <div className="px-5 py-3 border-b border-slate-100 bg-slate-50 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-bold text-xs">
                11-A
              </div>
              <div>
                <h3 className="text-xs font-bold text-slate-900">
                  Umumiy Sinf Muloqot Guruxi
                </h3>
                <p className="text-[11px] text-slate-500">
                  Moderator: Nargiza Salimova (Sinf rahbari)
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs text-slate-500">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              <span className="text-[11px]">Faol muloqot</span>
            </div>
          </div>

          {/* Messages List */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4 bg-slate-50/40">
            {messages.map((msg) => {
              const isTeacher = msg.senderRole === 'Sinf rahbari';
              const isMyMessage = session?.type === 'student' && session.student?.id === msg.senderId;

              return (
                <div
                  key={msg.id}
                  className={`flex gap-3 max-w-2xl ${isMyMessage ? 'ml-auto flex-row-reverse' : ''}`}
                >
                  {/* Sender Avatar */}
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                    isTeacher 
                      ? 'bg-amber-100 text-amber-900 border border-amber-300' 
                      : 'bg-indigo-100 text-indigo-800'
                  }`}>
                    {isTeacher ? 'U' : msg.senderName.slice(0, 1)}
                  </div>

                  {/* Message Bubble */}
                  <div className={`rounded-2xl p-3.5 text-xs shadow-sm ${
                    isMyMessage
                      ? 'bg-indigo-600 text-white rounded-br-none'
                      : isTeacher
                      ? 'bg-amber-50/90 border border-amber-200 text-slate-900 rounded-tl-none'
                      : 'bg-white border border-slate-200 text-slate-900 rounded-tl-none'
                  }`}>
                    <div className="flex items-center justify-between gap-3 mb-1">
                      <span className={`font-semibold ${
                        isMyMessage ? 'text-indigo-100' : isTeacher ? 'text-amber-900 font-bold' : 'text-slate-800'
                      }`}>
                        {msg.senderName}
                      </span>
                      {msg.senderRole && !isMyMessage && (
                        <span className={`text-[10px] px-1.5 py-0.2 rounded font-medium ${
                          isTeacher ? 'bg-amber-200 text-amber-900' : 'bg-slate-100 text-slate-600'
                        }`}>
                          {msg.senderRole}
                        </span>
                      )}
                    </div>

                    <p className={`text-xs leading-relaxed ${isMyMessage ? 'text-white' : 'text-slate-700'}`}>
                      {msg.text}
                    </p>

                    <div className={`mt-1.5 flex items-center justify-end gap-1 text-[10px] ${
                      isMyMessage ? 'text-indigo-200' : 'text-slate-400'
                    }`}>
                      <span>{msg.timestamp}</span>
                      <CheckCheck className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </div>
              );
            })}
            <div ref={messagesEndRef} />
          </div>

          {/* Chat Input Bar */}
          <form onSubmit={handleSendMessage} className="p-3 border-t border-slate-200 bg-white flex items-center gap-2">
            <input
              type="text"
              value={inputText}
              onChange={e => setInputText(e.target.value)}
              placeholder={session ? "Xabar yozing (masalan, vazifa yoki imtihon bo'yicha savol)..." : "Xabar yozish uchun tizimga kiring"}
              disabled={!session}
              className="flex-1 px-4 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white text-slate-900"
            />
            <button
              type="submit"
              disabled={!session || !inputText.trim()}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 shadow-sm transition-colors"
            >
              <span>Yuborish</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>

        </div>

        {/* Side Panel: Online Classmates (1 Col) */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 flex flex-col overflow-hidden">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h4 className="text-xs font-bold text-slate-900">Sinf Ishtirokchilari (24)</h4>
            <span className="text-[10px] text-slate-400 font-medium">11-A</span>
          </div>

          <div className="flex-1 overflow-y-auto divide-y divide-slate-100 mt-2 pr-1 space-y-1">
            {/* Teacher Row */}
            <div className="py-2 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-amber-100 text-amber-900 flex items-center justify-center font-bold text-[10px]">
                  U
                </div>
                <div>
                  <p className="font-semibold text-slate-900">Nargiza Salimova</p>
                  <p className="text-[10px] text-amber-700">Sinf rahbari</p>
                </div>
              </div>
              <span className="w-2 h-2 rounded-full bg-emerald-500" title="Onlayn"></span>
            </div>

            {/* Students rows */}
            {students.map((st) => (
              <button
                key={st.id}
                onClick={() => onSelectStudent(st)}
                className="w-full py-2 flex items-center justify-between text-xs hover:bg-slate-50 px-1 rounded transition-colors text-left"
              >
                <div className="flex items-center gap-2 min-w-0">
                  <div className={`w-6 h-6 rounded-full bg-gradient-to-tr ${st.avatarColor} text-white flex items-center justify-center font-bold text-[10px] shrink-0`}>
                    {st.fullName.slice(0, 1)}
                  </div>
                  <div className="min-w-0">
                    <p className="font-medium text-slate-800 truncate">{st.fullName.split(' ')[0]} {st.fullName.split(' ')[1]?.slice(0, 1)}.</p>
                    <p className="text-[10px] text-slate-400 truncate">{st.majorDirections.block1.subject}</p>
                  </div>
                </div>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0"></span>
              </button>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
