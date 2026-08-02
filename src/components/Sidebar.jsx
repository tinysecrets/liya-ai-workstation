import React, { useState, useMemo } from 'react';
import {
    Plus, Settings, MessageSquare, Edit2, Check, X, Trash2, Layout, HardDrive, User, MoreHorizontal, PenSquare,
    Newspaper, CloudSun, CircleDollarSign, Home, Shield, ChevronDown, ChevronRight, Grid, Sparkles
} from 'lucide-react';
import AppLauncherModal from './AppLauncherModal';

const Sidebar = ({
    activeModule,
    setActiveModule,
    sessions = [],
    currentSessionId,
    onSwitchSession,
    onDeleteSession,
    onRenameSession,
    onNewChat,
    isPicoMode,
}) => {
    const [editingId, setEditingId] = useState(null);
    const [editValue, setEditValue] = useState('');
    const [isAppsOpen, setIsAppsOpen] = useState(false);

    // --- SESSION GROUPING LOGIC ---
    const groupedSessions = useMemo(() => {
        const groups = {
            today: [],
            yesterday: [],
            last7Days: [],
            older: []
        };

        const now = new Date();
        const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
        const startOfYesterday = startOfToday - 86400000;
        const startOf7Days = startOfToday - (7 * 86400000);

        const sorted = [...sessions].sort((a, b) => b.updatedAt - a.updatedAt);

        sorted.forEach(session => {
            const time = session.updatedAt;
            if (time >= startOfToday) groups.today.push(session);
            else if (time >= startOfYesterday) groups.yesterday.push(session);
            else if (time >= startOf7Days) groups.last7Days.push(session);
            else groups.older.push(session);
        });

        return groups;
    }, [sessions]);

    const handleStartEdit = (session) => {
        setEditingId(session.id);
        setEditValue(session.title);
    };

    const handleSaveEdit = (id) => {
        if (editValue.trim()) {
            onRenameSession(id, editValue.trim());
        }
        setEditingId(null);
    };

    const renderSessionItem = (session) => {
        const isActive = currentSessionId === session.id && activeModule === 'chat';
        return (
            <div key={session.id} className="group relative">
                {editingId === session.id ? (
                    <div className="flex items-center gap-1 p-2 bg-white border border-gray-300 rounded-lg mx-2 shadow-sm">
                        <input
                            autoFocus
                            value={editValue}
                            onChange={(e) => setEditValue(e.target.value)}
                            onBlur={() => handleSaveEdit(session.id)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSaveEdit(session.id)}
                            className="flex-1 bg-transparent border-none outline-none text-sm text-gray-800 font-medium"
                        />
                        <button onClick={() => handleSaveEdit(session.id)} className="text-gray-500 hover:text-green-600">
                            <Check size={14} />
                        </button>
                        <button onClick={() => setEditingId(null)} className="text-gray-500 hover:text-red-600">
                            <X size={14} />
                        </button>
                    </div>
                ) : (
                    <div className="flex items-center gap-2 px-2">
                        <button
                            onClick={() => {
                                onSwitchSession(session.id);
                                setActiveModule('chat');
                            }}
                            className={`
                                flex-1 flex items-center gap-2 p-2 rounded-lg transition-all text-left group/btn
                                ${isActive
                                    ? 'bg-[#ececec] text-gray-900 font-medium'
                                    : 'text-gray-800 hover:bg-[#ececec]'
                                }
                            `}
                        >
                            <div className="flex-1 min-w-0 pr-6 relative">
                                <p className="text-[13px] truncate">{session.title}</p>
                                {isActive && (
                                    <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-[#ececec] to-transparent" />
                                )}
                            </div>
                        </button>

                        {/* Hover Controls - ChatGPT Style */}
                        {isActive && (
                            <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
                                <button
                                    onClick={(e) => { e.stopPropagation(); handleStartEdit(session); }}
                                    className="p-1 rounded-md text-gray-500 hover:text-gray-900"
                                >
                                    <PenSquare size={14} />
                                </button>
                                <button
                                    onClick={(e) => { e.stopPropagation(); onDeleteSession(session.id); }}
                                    className="p-1 rounded-md text-gray-500 hover:text-red-600"
                                >
                                    <Trash2 size={14} />
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </div>
        );
    };

    return (
        <aside className={`hidden md:flex flex-col h-full bg-[#f9f9f9] z-20 transition-all duration-300 overflow-hidden ${isPicoMode ? 'w-[64px]' : 'w-[260px]'} border-r border-gray-200`}>
            
            {/* 1. TOP ACTION: NEW CHAT */}
            <div className={`shrink-0 bg-transparent transition-all ${isPicoMode ? 'p-2' : 'p-3'}`}>
                <div className="flex justify-between items-center mb-4 px-2 pt-2">
                   {!isPicoMode && (
                        <button 
                            onClick={() => setActiveModule('home')}
                            className="flex items-center gap-2.5 rounded-xl hover:bg-gray-200/60 transition-all p-1 text-gray-800 font-semibold text-sm group"
                        >
                            <img 
                                src="/liya_logo.png" 
                                alt="LIYA Logo" 
                                className="w-8 h-8 rounded-xl object-cover shadow-sm ring-1 ring-slate-900/10 group-hover:scale-105 transition-transform" 
                            />
                            <span className="font-extrabold tracking-wider text-slate-900 font-mono text-sm">LIYA AI</span>
                        </button>
                   )}
                   <button
                        onClick={onNewChat}
                        className="p-2 rounded-lg text-gray-600 hover:bg-gray-200 transition-all"
                        title="New chat"
                    >
                        <PenSquare size={18} />
                    </button>
                </div>
            </div>

            {/* 2. MIDDLE SESSIONS */}
            <div className="flex-1 overflow-y-auto custom-scrollbar pb-4 space-y-4 px-1">
                {groupedSessions.today.length > 0 && (
                    <div className="space-y-0.5">
                        <p className="px-3 pt-2 pb-1 text-xs font-semibold text-gray-500">Today</p>
                        {groupedSessions.today.map(renderSessionItem)}
                    </div>
                )}

                {groupedSessions.yesterday.length > 0 && (
                    <div className="space-y-0.5">
                        <p className="px-3 pt-4 pb-1 text-xs font-semibold text-gray-500">Yesterday</p>
                        {groupedSessions.yesterday.map(renderSessionItem)}
                    </div>
                )}

                {groupedSessions.last7Days.length > 0 && (
                    <div className="space-y-0.5">
                        <p className="px-3 pt-4 pb-1 text-xs font-semibold text-gray-500">Previous 7 Days</p>
                        {groupedSessions.last7Days.map(renderSessionItem)}
                    </div>
                )}

                {groupedSessions.older.length > 0 && (
                    <div className="space-y-0.5">
                        <p className="px-3 pt-4 pb-1 text-xs font-semibold text-gray-500">Older Sessions</p>
                        {groupedSessions.older.map(renderSessionItem)}
                    </div>
                )}
            </div>

            {/* 3. BOTTOM MODULES & USER SETTINGS */}
            <div className="shrink-0 p-3 space-y-1">
                
                {/* Apps Accordion */}
                <button
                    onClick={() => setIsAppsOpen(true)}
                    className="w-full flex items-center justify-between p-2 rounded-lg transition-all text-gray-700 hover:bg-[#ececec]"
                >
                    <div className="flex items-center gap-2">
                        <div className="w-6 h-6 flex items-center justify-center rounded-md bg-white border border-gray-200 shadow-sm"><Grid size={14} /></div>
                        {!isPicoMode && <span className="text-sm font-medium">Mini Apps</span>}
                    </div>
                </button>





                <button
                    onClick={() => setActiveModule('settings')}
                    className={`w-full flex items-center gap-2 p-2 rounded-lg transition-all ${activeModule === 'settings' ? 'bg-[#ececec] text-gray-900 font-medium' : 'text-gray-800 hover:bg-[#ececec]'}`}
                >
                    <div className="w-6 h-6 flex items-center justify-center rounded-md bg-white border border-gray-200 shadow-sm"><Settings size={14} /></div>
                    <span className="text-sm">Settings</span>
                </button>

                {/* LIYA System Profile Area */}
                <div className="pt-2 mt-2 border-t border-gray-200">
                    <button 
                        onClick={() => setActiveModule('settings')}
                        className="w-full flex items-center gap-3 p-2 rounded-xl hover:bg-[#ececec] transition-colors text-left text-gray-800 group"
                        title="LIYA AI System Settings"
                    >
                        <img 
                            src="/liya_logo.png" 
                            alt="LIYA Logo" 
                            className="w-9 h-9 rounded-xl object-cover shadow-md shrink-0 ring-1 ring-slate-900/10 group-hover:scale-105 transition-transform" 
                        />
                        {!isPicoMode && (
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-extrabold text-slate-900 truncate tracking-tight">LIYA AI</p>
                                <p className="text-[11px] font-medium text-indigo-600 flex items-center gap-1.5">
                                    <span className="relative flex h-2 w-2">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                                    </span>
                                    <span>Neural Core Active</span>
                                </p>
                            </div>
                        )}
                    </button>
                </div>

            </div>
            
            {/* App Launcher Modal Overlay */}
            <AppLauncherModal 
                isOpen={isAppsOpen} 
                onClose={() => setIsAppsOpen(false)} 
                onSelectApp={setActiveModule} 
            />
        </aside>
    );
};

export default React.memo(Sidebar);
