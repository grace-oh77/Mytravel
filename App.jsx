
import React, { useState, useEffect, useRef } from 'react';

// --- 1. 인라인 SVG 아이콘 집합 ---
const Icons = {
  PlaneTakeoff: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 22h20"/><path d="M6.36 17.4 4 17l-2-4 1.1-.55a2 2 0 0 1 1.8 0l.17.1a2 2 0 0 0 1.8 0L8 12l5-5 1.5-1.5a2.82 2.82 0 1 1 4 4L17 11l-5 5-2.92 1.46a24.35 24.35 0 0 1-2.72 1.35z"/></svg>,
  PlaneLand: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 22h20"/><path d="M17.5 17h1.41a2 2 0 0 0 1.9-2.61L18 10l-4-4-1.5 1.5 5 5-7.5 7.5a24.35 24.35 0 0 1-2.72-1.35l-2.92-1.46-5-5L1.1 11a2 2 0 0 1 1.8 0l.17.1a2 2 0 0 0 1.8 0L7 12l2 4-2.36.4L4 17h13.5z"/></svg>,
  Calendar: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>,
  Wallet: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12V7H5a2 2 0 0 1 0-4h14v4"/><path d="M3 5v14a2 2 0 0 0 2 2h16v-5"/><path d="M18 12a2 2 0 0 0 0 4h4v-4Z"/></svg>,
  Map: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21"/><line x1="9" y1="3" x2="9" y2="18"/><line x1="15" y1="6" x2="15" y2="21"/></svg>,
  Settings: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>,
  X: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>,
  Moon: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3a6.364 6.364 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>,
  Sun: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>,
  Plus: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>,
  Bed: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 4v16"/><path d="M2 8h18a2 2 0 0 1 2 2v10"/><path d="M2 17h20"/><path d="M6 8v9"/></svg>,
  Car: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2"/><circle cx="7" cy="17" r="2"/><path d="M9 17h6"/><circle cx="17" cy="17" r="2"/></svg>,
  Camera: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/><circle cx="12" cy="13" r="3"/></svg>,
  ShoppingBag: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>,
  Utensils: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"/><path d="M7 2v20"/><path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7"/></svg>,
  Search: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>,
  Pencil: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"/></svg>,
  Trash: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></svg>,
  Image: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>,
  Download: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>,
  Check: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
};

// --- 공통: 현재 시각 문자열 생성 ---
const getCurrentTimeStr = () => {
  const now = new Date();
  return `${String(now.getMonth() + 1).padStart(2, '0')}.${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
};

// --- 카테고리 정의 ---
const CATEGORIES = [
  { id: 'Bed', name: '숙소', icon: Icons.Bed }, { id: 'PlaneTakeoff', name: '항공', icon: Icons.PlaneTakeoff },
  { id: 'Car', name: '교통', icon: Icons.Car }, { id: 'Camera', name: '관광', icon: Icons.Camera },
  { id: 'ShoppingBag', name: '쇼핑', icon: Icons.ShoppingBag }, { id: 'Utensils', name: '식사', icon: Icons.Utensils }
];

// --- 2. 커스텀 알림 모달 ---
const CustomAlert = ({ message, onClose, isDarkMode }) => {
  if (!message) return null;
  return (
    <div className="absolute inset-0 bg-black/60 z-[100] flex items-center justify-center p-4 backdrop-blur-sm">
      <div className={`${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'} rounded-3xl w-full max-w-sm p-6 text-center shadow-2xl animate-in zoom-in-95 duration-200`}>
        <p className="font-medium whitespace-pre-wrap mb-6 text-sm leading-relaxed">{message}</p>
        <button onClick={onClose} className="w-full py-3.5 rounded-2xl font-bold active:scale-95 transition-transform bg-teal-500 text-white">확인</button>
      </div>
    </div>
  );
};

export default function TravelMatePro() {
  const [isSetup, setIsSetup] = useState(true);
  const [tripInfo, setTripInfo] = useState({ title: '괌 가족 여행', start: '2026-11-18', end: '2026-11-21' });
  const [activeTab, setActiveTab] = useState('일정');
  
  const defaultMembers = ['오은혜', '김재훈', '사랑'];
  const [members, setMembers] = useState(defaultMembers);
  const [currentUser, setCurrentUser] = useState(defaultMembers[0]);
  
  // [추가] 환율 상태 관리
  const [exchangeRates, setExchangeRates] = useState({ USD: 1400, JPY: 9 });

  const [schedules, setSchedules] = useState([
    { category: 'PlaneTakeoff', date: '2026-11-18', time: '19:45', place: '인천국제공항(ICN)', memo: 'KE417 출국편', lat: 37.4602, lon: 126.4407, author: '오은혜', updatedAt: '11.11 10:00' },
    { category: 'Bed', date: '2026-11-18', time: '23:00', place: '롯데호텔 괌', memo: '체크인', lat: 13.5137, lon: 144.8078, author: '김재훈', updatedAt: '11.11 11:30' },
    { category: 'PlaneLand', date: '2026-11-21', time: '16:50', place: '괌(GUM)', memo: 'KE416 귀국편', lat: 13.4925, lon: 144.7944, author: '오은혜', updatedAt: '11.11 10:00' }
  ]);
  const [expenses, setExpenses] = useState([
    { amount: 1500000, desc: '호텔 숙박비 결제', currency: 'KRW', date: '2026-11-18', category: 'Bed', payer: '김재훈', participants: ['오은혜', '김재훈'] },
    { amount: 300, desc: '렌터카 비용 (환전액)', currency: 'USD', date: '2026-11-19', category: 'Car', payer: '오은혜', participants: ['오은혜', '김재훈', '사랑'] },
    { amount: 120, desc: '스테이크 하우스', currency: 'USD', date: '2026-11-19', category: 'Utensils', payer: '김재훈', participants: ['오은혜', '김재훈', '사랑'] }
  ]);
  
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [alertMsg, setAlertMsg] = useState(null);
  const [apiKey, setApiKey] = useState('1c51bc4cf1d36848a86bbc81f0d11fb9bfea729a26e02998a86fc3e0ad5722af');

  const [flightModal, setFlightModal] = useState({ isOpen: false, type: 'departure' });
  const [scheduleModal, setScheduleModal] = useState({ isOpen: false, date: null, editIndex: -1 });
  const [expenseModal, setExpenseModal] = useState({ isOpen: false, item: null, editIndex: -1 });
  const [detailModal, setDetailModal] = useState({ isOpen: false, item: null, originalIndex: -1 });
  const [photoModal, setPhotoModal] = useState({ isOpen: false, src: null });

  const [mapDateFilter, setMapDateFilter] = useState('ALL');
  const [expenseViewMode, setExpenseViewMode] = useState('DATE');

  const handleDateClick = (day) => {
    const dateStr = `2026-11-${day.toString().padStart(2, '0')}`;
    if (!tripInfo.start || (tripInfo.start && tripInfo.end)) setTripInfo(prev => ({ ...prev, start: dateStr, end: null }));
    else if (dateStr < tripInfo.start) setTripInfo(prev => ({ ...prev, start: dateStr, end: tripInfo.start }));
    else setTripInfo(prev => ({ ...prev, end: dateStr }));
  };

  const [draggedItem, setDraggedItem] = useState(null);
  const handleDragStart = (e, index) => { setDraggedItem(index); e.dataTransfer.effectAllowed = "move"; };
  const handleDragOver = (e, index) => {
    e.preventDefault();
    if (draggedItem === null || draggedItem === index) return;
    const newSchedules = [...schedules];
    const item = newSchedules.splice(draggedItem, 1)[0];
    newSchedules.splice(index, 0, item);
    setDraggedItem(index);
    setSchedules(newSchedules);
  };
  const handleDragEnd = () => setDraggedItem(null);

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    if (!lat1 || !lon1 || !lat2 || !lon2) return null;
    const R = 6371; 
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) * Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return (R * c).toFixed(1);
  };

  const getDDay = (targetDateStr) => {
    if (!tripInfo.start) return '';
    const diffDays = Math.floor((new Date(targetDateStr) - new Date(tripInfo.start)) / 86400000);
    return diffDays >= 0 ? `D${diffDays + 1}` : `D${diffDays}`;
  };

  const holdTimeout = useRef(null);
  const startHold = (date) => { holdTimeout.current = setTimeout(() => setScheduleModal({isOpen: true, date, editIndex: -1}), 600); };
  const endHold = () => { if(holdTimeout.current) clearTimeout(holdTimeout.current); };

  const getAllDates = () => {
    if (!tripInfo.start || !tripInfo.end) return [];
    const dates = [];
    let curr = new Date(tripInfo.start);
    const end = new Date(tripInfo.end);
    while (curr <= end) {
      dates.push(curr.toISOString().split('T')[0]);
      curr.setDate(curr.getDate() + 1);
    }
    return dates;
  };

  // [수정] 환율 상태(exchangeRates) 적용
  const getKRW = (amount, currency) => {
    if (currency === 'USD') return amount * exchangeRates.USD;
    if (currency === 'JPY') return amount * exchangeRates.JPY;
    return amount;
  };

  const calculateSettlement = () => {
    const balances = {};
    members.forEach(m => balances[m] = 0);

    expenses.forEach(exp => {
      const amountInKRW = getKRW(exp.amount, exp.currency);
      const payer = exp.payer;
      const parts = exp.participants || [];
      if (parts.length === 0) return;
      const splitAmt = amountInKRW / parts.length;

      if (balances[payer] !== undefined) balances[payer] += amountInKRW;
      parts.forEach(p => {
        if (balances[p] !== undefined) balances[p] -= splitAmt;
      });
    });

    const debtors = [];
    const creditors = [];
    Object.keys(balances).forEach(m => {
      if (balances[m] <= -1) debtors.push({ name: m, amount: -balances[m] });
      else if (balances[m] >= 1) creditors.push({ name: m, amount: balances[m] });
    });

    debtors.sort((a, b) => b.amount - a.amount);
    creditors.sort((a, b) => b.amount - a.amount);

    const transfers = [];
    let d = 0, c = 0;
    while (d < debtors.length && c < creditors.length) {
      const debtor = debtors[d];
      const creditor = creditors[c];
      const min = Math.min(debtor.amount, creditor.amount);

      transfers.push({ from: debtor.name, to: creditor.name, amount: min });

      debtor.amount -= min;
      creditor.amount -= min;

      if (debtor.amount < 1) d++;
      if (creditor.amount < 1) c++;
    }
    return { balances, transfers };
  };

  // [수정] 다운로드 차단 우회 및 에러 핸들링
  const downloadCSV = (content, fileName) => {
    try {
      const bom = "\uFEFF";
      const blob = new Blob([bom + content], { type: "text/csv;charset=utf-8;" });
      const link = document.createElement("a");
      
      if (link.download !== undefined) {
        const url = URL.createObjectURL(blob);
        link.setAttribute("href", url);
        link.setAttribute("download", fileName);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        setTimeout(() => URL.revokeObjectURL(url), 100);
      }
    } catch (e) {
      setAlertMsg("뷰어(보안 환경) 설정으로 인해 파일 다운로드가 일시 차단되었습니다.\n실제 Firebase 등에 배포 후에는 정상 작동합니다.");
    }
  };

  const exportSchedulesCSV = () => {
    const header = ["일자", "시간", "카테고리", "장소명", "메모", "위도", "경도", "등록자"];
    const rows = schedules.map(s => [s.date, s.time, CATEGORIES.find(c=>c.id===s.category)?.name||s.category, s.place||"메모 기록", s.memo, s.lat||"", s.lon||"", s.author]);
    const csvContent = [header, ...rows].map(e => e.map(item => `"${(item||'').toString().replace(/"/g, '""')}"`).join(",")).join("\n");
    downloadCSV(csvContent, "travel_schedules.csv");
  };

  const exportExpensesCSV = () => {
    const header = ["일자", "카테고리", "내용", "통화", "금액", "결제자", "N빵참여자"];
    const rows = expenses.map(e => [e.date, CATEGORIES.find(c=>c.id===e.category)?.name||e.category, e.desc, e.currency, e.amount, e.payer, e.participants.join(", ")]);
    const csvContent = [header, ...rows].map(e => e.map(item => `"${(item||'').toString().replace(/"/g, '""')}"`).join(",")).join("\n");
    downloadCSV(csvContent, "travel_expenses.csv");
  };

  const themeClasses = isDarkMode ? "bg-gray-900 text-gray-100" : "bg-gray-50 text-gray-800";
  const cardClasses = isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-100 shadow-sm";

  const allDates = getAllDates();
  const groupedSchedules = allDates.reduce((acc, d) => { acc[d] = []; return acc; }, {});
  schedules.forEach((sch, idx) => {
    if (groupedSchedules[sch.date]) groupedSchedules[sch.date].push({ ...sch, originalIndex: idx });
  });
  
  const groupedExpenses = allDates.reduce((acc, d) => { acc[d] = []; return acc; }, {});
  expenses.forEach((exp, idx) => {
    if (groupedExpenses[exp.date]) groupedExpenses[exp.date].push({ ...exp, originalIndex: idx });
  });

  const categoriesExpenses = CATEGORIES.reduce((acc, cat) => {
    acc[cat.id] = expenses.map((e, idx) => ({...e, originalIndex: idx})).filter(e => e.category === cat.id);
    return acc;
  }, {});

  const settlementData = calculateSettlement();
  const totalSpentKRW = expenses.reduce((acc, curr) => acc + getKRW(curr.amount, curr.currency), 0);

  const generateMapHtml = () => {
    const markers = [];
    if (mapDateFilter === 'ALL') {
      Object.keys(groupedSchedules).forEach(d => {
        let dailyCounter = 0;
        groupedSchedules[d].forEach(s => {
          if (s.lat && s.lon && s.place) {
            dailyCounter++;
            markers.push({ lat: s.lat, lon: s.lon, num: dailyCounter, place: s.place });
          }
        });
      });
    } else {
      let dailyCounter = 0;
      (groupedSchedules[mapDateFilter] || []).forEach(s => {
        if (s.lat && s.lon && s.place) {
          dailyCounter++;
          markers.push({ lat: s.lat, lon: s.lon, num: dailyCounter, place: s.place });
        }
      });
    }

    if (markers.length === 0) {
      return `<html><body style="display:flex;align-items:center;justify-content:center;color:#888;font-family:sans-serif;height:100vh;margin:0;">위치 좌표가 포함된 일정이 없습니다.</body></html>`;
    }

    const centerLat = markers[0].lat;
    const centerLon = markers[0].lon;
    const markersJson = JSON.stringify(markers);

    return `
      <!DOCTYPE html><html><head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"/>
      <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
      <style>
        body,html,#map{margin:0;padding:0;height:100%;}
        .num-icon { background: #14b8a6; color: white; border-radius: 50%; text-align: center; line-height: 22px; font-weight: bold; font-size: 11px; border: 2px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.3); }
      </style>
      </head><body><div id="map"></div>
      <script>
        const map = L.map('map').setView([${centerLat}, ${centerLon}], 11);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '© OSM'
        }).addTo(map);
        
        const markersData = ${markersJson};
        const latlngs = [];
        const bounds = L.latLngBounds();

        markersData.forEach(m => {
          const icon = L.divIcon({ className: 'num-icon', html: m.num, iconSize: [26,26] });
          L.marker([m.lat, m.lon], {icon}).addTo(map).bindPopup("<b>" + m.place + "</b>");
          latlngs.push([m.lat, m.lon]);
          bounds.extend([m.lat, m.lon]);
        });

        if (latlngs.length > 1) {
          L.polyline(latlngs, {color: '#14b8a6', weight: 3, dashArray: '5, 5'}).addTo(map);
        }
        if (markersData.length > 0) {
          map.fitBounds(bounds, {padding: [30, 30]});
        }
      </script>
      </body></html>
    `;
  };

  return (
    <div className={`min-h-screen flex justify-center ${isDarkMode ? 'bg-black' : 'bg-gray-200'} font-sans`}>
      <div className={`w-full max-w-md ${themeClasses} min-h-screen shadow-2xl relative flex flex-col overflow-hidden`}>
        
        <div className="absolute top-4 left-4 z-50 flex items-center gap-2">
          {!isSetup && (
            <select 
              value={currentUser} 
              onChange={e => setCurrentUser(e.target.value)}
              className={`p-1.5 px-3 rounded-full text-[10px] font-bold outline-none border shadow-sm ${isDarkMode ? 'bg-gray-800 border-gray-700 text-teal-400' : 'bg-white border-gray-200 text-teal-600'}`}
            >
              {members.map(m => <option key={m} value={m}>{m} 님</option>)}
            </select>
          )}
        </div>
        <div className="absolute top-4 right-4 z-50 flex items-center gap-2">
          <button onClick={() => setIsDarkMode(!isDarkMode)} className={`p-2.5 rounded-full backdrop-blur-md ${isDarkMode ? 'bg-gray-800 text-yellow-400' : 'bg-white/80 text-gray-600 shadow-sm'}`}>
            {isDarkMode ? <Icons.Sun /> : <Icons.Moon />}
          </button>
        </div>

        {isSetup ? (
          <div className="flex-1 flex flex-col p-6 pt-16">
            <h2 className="text-xl font-extrabold mb-1">여행 일정 설정</h2>
            <p className={`text-xs mb-6 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>달력에서 여행 시작일과 종료일을 터치하세요.</p>
            
            <input 
              type="text" 
              value={tripInfo.title}
              onChange={(e) => setTripInfo({...tripInfo, title: e.target.value})}
              className={`w-full p-3.5 mb-6 rounded-2xl font-bold text-center border outline-none text-sm ${isDarkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-200 shadow-sm'}`}
            />
            <div className={`p-5 rounded-3xl border ${cardClasses}`}>
              <div className="text-center font-bold mb-3 text-sm">2026년 11월</div>
              <div className="grid grid-cols-7 gap-1 text-center text-[10px] mb-2 font-medium text-gray-400">
                {['일','월','화','수','목','금','토'].map(d => <div key={d}>{d}</div>)}
              </div>
              <div className="grid grid-cols-7 gap-1 text-center">
                {Array.from({length: 30}, (_, i) => i + 1).map(day => {
                  const dateStr = `2026-11-${day.toString().padStart(2, '0')}`;
                  const isSelected = dateStr === tripInfo.start || dateStr === tripInfo.end;
                  const isBetween = tripInfo.start && tripInfo.end && dateStr > tripInfo.start && dateStr < tripInfo.end;
                  
                  return (
                    <button 
                      key={day} 
                      onClick={() => handleDateClick(day)}
                      className={`aspect-square rounded-xl flex items-center justify-center text-xs transition-all
                        ${isSelected ? 'bg-teal-500 text-white font-bold shadow-md shadow-teal-500/30' : ''}
                        ${isBetween ? 'bg-teal-100 dark:bg-teal-900/40 text-teal-800 dark:text-teal-300 font-medium' : ''}
                        ${!isSelected && !isBetween ? (isDarkMode ? 'hover:bg-gray-700 text-gray-200' : 'hover:bg-gray-100 text-gray-700') : ''}
                      `}
                    >
                      {day}
                    </button>
                  )
                })}
              </div>
            </div>
            <div className="mt-auto pt-6">
              <button 
                onClick={() => { if (tripInfo.start && tripInfo.end) setIsSetup(false); else setAlertMsg('시작일과 종료일을 모두 선택해주세요.'); }} 
                className="w-full py-4 bg-teal-500 text-white rounded-2xl font-bold shadow-lg shadow-teal-500/30 active:scale-95 transition-transform text-sm"
              >
                플래너 시작하기
              </button>
            </div>
          </div>
        ) : (
          <div className="flex-1 flex flex-col h-full overflow-hidden">
            <header className={`px-4 py-4 border-b ${isDarkMode ? 'border-gray-800 bg-gray-900' : 'border-gray-100 bg-white'} shadow-sm z-10 text-center flex flex-col items-center pt-14`}>
              <h1 className="font-extrabold text-sm">{tripInfo.title}</h1>
              <p className="text-[10px] text-teal-500 font-bold mt-0.5">{tripInfo.start?.replace(/-/g, '.')} ~ {tripInfo.end?.replace(/-/g, '.')}</p>
            </header>
            
            <div className="flex-1 overflow-y-auto pb-28 p-4 relative">
              
              {/* --- 일정 탭 --- */}
              {activeTab === '일정' && (
                <div className="space-y-5">
                  <div className="grid grid-cols-2 gap-2">
                    <button onClick={() => setFlightModal({isOpen: true, type: 'departure'})} className={`flex items-center justify-center py-3 px-2 rounded-xl border active:scale-95 transition-all ${isDarkMode ? 'bg-blue-900/20 border-blue-800 text-blue-400' : 'bg-blue-50 border-blue-100 text-blue-600'} font-bold text-[11px] shadow-sm`}>
                      <span className="mr-1.5"><Icons.PlaneTakeoff /></span> 출국 등록
                    </button>
                    <button onClick={() => setFlightModal({isOpen: true, type: 'arrival'})} className={`flex items-center justify-center py-3 px-2 rounded-xl border active:scale-95 transition-all ${isDarkMode ? 'bg-rose-900/20 border-rose-800 text-rose-400' : 'bg-rose-50 border-rose-100 text-rose-600'} font-bold text-[11px] shadow-sm`}>
                      <span className="mr-1.5"><Icons.PlaneLand /></span> 귀국 등록
                    </button>
                  </div>

                  <div className="space-y-6">
                    {allDates.map((date) => (
                      <div key={date} className="space-y-2.5">
                        <div 
                          onMouseDown={() => startHold(date)} onMouseUp={endHold} onMouseLeave={endHold}
                          onTouchStart={() => startHold(date)} onTouchEnd={endHold}
                          className="flex items-center gap-2 select-none pt-2 cursor-pointer active:opacity-70 transition-opacity"
                        >
                          <span className="font-extrabold text-teal-600 text-xs">{getDDay(date)}</span>
                          <span className={`text-[11px] font-bold ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{date.replace(/-/g, '.')}</span>
                          <div className="flex-1 h-px bg-gray-200 dark:bg-gray-700 ml-2"></div>
                        </div>

                        {groupedSchedules[date].length === 0 ? (
                          <div className={`text-center py-4 text-[11px] rounded-xl border border-dashed ${isDarkMode ? 'text-gray-400 bg-gray-800/50 border-gray-700' : 'text-gray-400 bg-gray-50 border-gray-200'}`}>
                            등록된 일정이 없습니다.
                          </div>
                        ) : (
                          (() => {
                            let badgeCounter = 0;
                            return groupedSchedules[date].map((sch, sIdx, arr) => {
                              const IconCmp = Icons[sch.category] || Icons.Map;
                              const isDragged = draggedItem === sch.originalIndex;
                              const isMappable = Boolean(sch.lat && sch.lon && sch.place);
                              
                              let badgeNum = null;
                              if (isMappable) {
                                badgeCounter++;
                                badgeNum = badgeCounter;
                              }

                              let nextMappableSch = null;
                              for (let i = sIdx + 1; i < arr.length; i++) {
                                if (arr[i].lat && arr[i].lon && arr[i].place) { nextMappableSch = arr[i]; break; }
                              }
                              const dist = (isMappable && nextMappableSch) ? calculateDistance(sch.lat, sch.lon, nextMappableSch.lat, nextMappableSch.lon) : null;

                              return (
                                <React.Fragment key={sch.originalIndex}>
                                  <div 
                                    draggable
                                    onDragStart={(e) => handleDragStart(e, sch.originalIndex)}
                                    onDragOver={(e) => handleDragOver(e, sch.originalIndex)}
                                    onDragEnd={handleDragEnd}
                                    onClick={() => setDetailModal({ isOpen: true, item: sch, originalIndex: sch.originalIndex })}
                                    className={`relative p-3 rounded-2xl border flex items-start gap-3 cursor-move ${cardClasses} ${isDragged ? 'opacity-40 scale-95' : 'opacity-100'} transition-all`}
                                  >
                                    {isMappable && badgeNum && (
                                      <div className="absolute -top-1.5 -left-1.5 w-5 h-5 bg-teal-500 text-white rounded-full flex items-center justify-center text-[10px] font-extrabold border-2 border-white dark:border-gray-800 shadow-sm z-10">
                                        {badgeNum}
                                      </div>
                                    )}

                                    <div className={`w-10 text-center shrink-0 border-r pr-2 flex flex-col items-center justify-center ${isDarkMode ? 'border-gray-700' : 'border-gray-100'}`}>
                                      <div className="text-teal-500 mb-1"><IconCmp /></div>
                                      <span className="text-[10px] font-bold block">{sch.time}</span>
                                    </div>
                                    
                                    <div className="flex-1 min-w-0">
                                      <h4 className="font-bold text-xs truncate flex items-center gap-1.5">
                                        {sch.place || '메모 기록'}
                                        {sch.photo && <span className="text-teal-500"><Icons.Image /></span>}
                                      </h4>
                                      {sch.memo && (
                                        <p className={`text-[10px] mt-1.5 p-2 rounded-xl break-words leading-relaxed ${isDarkMode ? 'bg-gray-700/60 text-gray-300' : 'bg-gray-50 text-gray-600'}`}>
                                          {sch.memo}
                                        </p>
                                      )}
                                      <div className="mt-2 text-right text-[9px] text-gray-400 font-medium">
                                        {sch.updatedBy ? `${sch.updatedBy} 수정` : `${sch.author} 등록`} ({sch.updatedAt})
                                      </div>
                                    </div>
                                  </div>

                                  {dist && (
                                    <div className="flex items-center justify-center my-1">
                                      <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full border ${isDarkMode ? 'bg-gray-800 border-gray-700 text-teal-400' : 'bg-teal-50 border-teal-100 text-teal-600'}`}>
                                        🚗 {dist} km
                                      </span>
                                    </div>
                                  )}
                                </React.Fragment>
                              )
                            })
                          })()
                        )}
                      </div>
                    ))}
                  </div>
                  
                  <div className="fixed bottom-20 left-0 right-0 flex justify-center pointer-events-none z-30">
                    <button 
                      onClick={() => setScheduleModal({isOpen: true, date: tripInfo.start, editIndex: -1})} 
                      className="pointer-events-auto bg-teal-500 text-white w-12 h-12 rounded-full shadow-xl shadow-teal-500/30 flex items-center justify-center active:scale-90 transition-transform"
                    >
                      <Icons.Plus />
                    </button>
                  </div>
                </div>
              )}

              {/* --- 비용 탭 --- */}
              {activeTab === '비용' && (
                <div className="space-y-4">
                  <div className={`flex rounded-xl p-1 border ${isDarkMode ? 'bg-gray-900 border-gray-800' : 'bg-gray-100 border-gray-200'}`}>
                    {[
                      {id: 'DATE', label: '일자별'}, {id: 'CATEGORY', label: '카테고리별'}, {id: 'SETTLEMENT', label: '정산 요약'}
                    ].map(mode => (
                      <button key={mode.id} onClick={() => setExpenseViewMode(mode.id)} className={`flex-1 py-1.5 text-[10px] font-bold rounded-lg transition-colors ${expenseViewMode === mode.id ? (isDarkMode ? 'bg-gray-700 text-white shadow-sm' : 'bg-white text-teal-600 shadow-sm') : 'text-gray-400'}`}>
                        {mode.label}
                      </button>
                    ))}
                  </div>

                  {expenseViewMode !== 'SETTLEMENT' && (
                    <div className={`p-4 rounded-2xl text-center border ${cardClasses}`}>
                      <div className="text-[11px] font-bold text-gray-400 mb-1">총 여행 경비 (KRW)</div>
                      <div className="text-2xl font-extrabold text-teal-500">
                        ₩{totalSpentKRW.toLocaleString()}
                      </div>
                    </div>
                  )}

                  <div className="space-y-4 pb-10">
                    {expenseViewMode === 'DATE' && allDates.map(date => {
                      const dayExps = groupedExpenses[date];
                      if(dayExps.length === 0) return null;
                      return (
                        <div key={`exp-${date}`} className="space-y-2">
                           <div className="text-[10px] font-bold text-gray-500 pt-1 border-b pb-1 dark:border-gray-700">
                             {getDDay(date)} ({date.replace(/-/g, '.')})
                           </div>
                           {dayExps.map((exp) => (
                             <div key={exp.originalIndex} className={`p-3 rounded-xl flex items-center justify-between border ${cardClasses}`}>
                               <div className="flex flex-col gap-0.5">
                                 <span className="font-bold text-xs flex items-center gap-1.5">
                                   {exp.desc}
                                   {exp.photo && <span className="text-teal-500 cursor-pointer" onClick={(e) => { e.stopPropagation(); setPhotoModal({isOpen: true, src: exp.photo}); }}><Icons.Image /></span>}
                                 </span>
                                 <span className="text-[9px] text-gray-400">결제: {exp.payer} | 대상: {exp.participants.length}명</span>
                               </div>
                               <div className="flex items-center gap-3">
                                 <span className="font-extrabold text-teal-500 text-[11px]">
                                   {exp.currency==='USD'?'$':exp.currency==='JPY'?'¥':'₩'}{exp.amount.toLocaleString()}
                                 </span>
                                 <button onClick={() => setExpenseModal({isOpen: true, item: exp, editIndex: exp.originalIndex})} className="text-gray-400 p-1 bg-gray-100 dark:bg-gray-700 rounded-lg"><Icons.Pencil /></button>
                               </div>
                             </div>
                           ))}
                        </div>
                      )
                    })}

                    {expenseViewMode === 'CATEGORY' && CATEGORIES.map(cat => {
                      const catExps = categoriesExpenses[cat.id];
                      if(catExps.length === 0) return null;
                      const catTotal = catExps.reduce((acc, curr) => acc + getKRW(curr.amount, curr.currency), 0);
                      return (
                        <div key={`cat-${cat.id}`} className={`p-3 rounded-2xl border ${cardClasses} space-y-2`}>
                          <div className="flex justify-between items-center border-b pb-2 dark:border-gray-700">
                            <span className="font-bold text-[11px] flex items-center gap-1.5 text-gray-500 dark:text-gray-300">
                              <span className="text-teal-500"><cat.icon /></span> {cat.name}
                            </span>
                            <span className="font-extrabold text-xs">₩{catTotal.toLocaleString()}</span>
                          </div>
                          {catExps.map((exp) => (
                             <div key={exp.originalIndex} className="flex justify-between items-center py-1">
                               <div className="flex flex-col">
                                 {/* [수정] 다크모드에서 텍스트가 잘 보이도록 dark:text-gray-100 추가 */}
                                 <span className="font-bold text-[11px] text-gray-800 dark:text-gray-100">{exp.desc}</span>
                                 <span className="text-[8px] text-gray-400">{exp.date.slice(5).replace('-','.')}</span>
                               </div>
                               <span className="font-bold text-[10px] text-teal-500">
                                 {exp.currency==='USD'?'$':exp.currency==='JPY'?'¥':'₩'}{exp.amount.toLocaleString()}
                               </span>
                             </div>
                           ))}
                        </div>
                      )
                    })}

                    {expenseViewMode === 'SETTLEMENT' && (
                      <div className="space-y-4">
                        <div className={`p-4 rounded-2xl border ${cardClasses}`}>
                          <h3 className="font-extrabold text-xs mb-3 flex items-center gap-1"><Icons.Check /> 멤버별 정산 결과</h3>
                          <div className="space-y-2">
                            {Object.entries(settlementData.balances).sort((a,b)=>b[1]-a[1]).map(([name, bal]) => (
                              <div key={name} className="flex justify-between items-center text-[11px]">
                                <span className="font-bold">{name}</span>
                                {bal > 0 ? (
                                  <span className="text-blue-500 font-extrabold">+ ₩{Math.floor(bal).toLocaleString()} (받을 돈)</span>
                                ) : bal < 0 ? (
                                  <span className="text-rose-500 font-bold">- ₩{Math.floor(Math.abs(bal)).toLocaleString()} (보낼 돈)</span>
                                ) : (
                                  <span className="text-gray-400 font-medium">정산 완료 ₩0</span>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className={`p-4 rounded-2xl border ${isDarkMode ? 'bg-teal-900/20 border-teal-900' : 'bg-teal-50 border-teal-100'}`}>
                          <h3 className="font-extrabold text-xs mb-3 text-teal-600 dark:text-teal-400 flex items-center gap-1"><Icons.Wallet /> 최종 송금 가이드</h3>
                          {settlementData.transfers.length === 0 ? (
                            <p className="text-[10px] text-gray-500 text-center py-2">보낼 돈이 없습니다.</p>
                          ) : (
                            <div className="space-y-2">
                              {settlementData.transfers.map((t, idx) => (
                                <div key={idx} className="flex justify-between items-center text-[11px] font-bold p-2 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
                                  <span><span className="text-rose-500">{t.from}</span> ➔ <span className="text-blue-500">{t.to}</span></span>
                                  <span className="text-teal-600 dark:text-teal-400">₩{Math.floor(t.amount).toLocaleString()} 송금</span>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="fixed bottom-20 left-0 right-0 flex justify-center pointer-events-none z-30">
                    <button 
                      onClick={() => setExpenseModal({isOpen: true, item: {date: tripInfo.start}, editIndex: -1})} 
                      className="pointer-events-auto bg-teal-500 text-white px-5 py-3 rounded-full shadow-xl shadow-teal-500/30 flex items-center font-bold text-xs active:scale-95 transition-transform gap-1"
                    >
                      <Icons.Plus /> 비용 추가
                    </button>
                  </div>
                </div>
              )}

              {/* --- 지도 탭 --- */}
              {activeTab === '지도' && (
                <div className="h-full flex flex-col -m-4">
                  <div className={`p-2 flex gap-2 overflow-x-auto whitespace-nowrap border-b ${isDarkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-100'} hide-scrollbar z-10`}>
                    <button onClick={() => setMapDateFilter('ALL')} className={`px-4 py-1.5 rounded-full text-[10px] font-bold border transition-colors ${mapDateFilter === 'ALL' ? 'bg-teal-500 text-white border-teal-500' : (isDarkMode ? 'bg-gray-800 text-gray-400 border-gray-700' : 'bg-gray-100 text-gray-500 border-gray-200')}`}>
                      전체 일정
                    </button>
                    {allDates.map(date => (
                      <button key={`map-filter-${date}`} onClick={() => setMapDateFilter(date)} className={`px-4 py-1.5 rounded-full text-[10px] font-bold border transition-colors ${mapDateFilter === date ? 'bg-teal-500 text-white border-teal-500' : (isDarkMode ? 'bg-gray-800 text-gray-400 border-gray-700' : 'bg-gray-100 text-gray-500 border-gray-200')}`}>
                        {getDDay(date)} ({date.slice(5).replace('-','.')})
                      </button>
                    ))}
                  </div>
                  <div className="flex-1 w-full bg-gray-100 relative">
                    <iframe className="w-full h-full border-0 absolute inset-0" srcDoc={generateMapHtml()} title="osm-map"></iframe>
                  </div>
                </div>
              )}

              {/* --- 설정 탭 --- */}
              {activeTab === '설정' && (
                <div className="space-y-4 pb-10">
                  
                  {/* [추가] 환율 설정 섹션 */}
                  <div className={`p-5 rounded-2xl border shadow-sm ${cardClasses}`}>
                    <h3 className="font-bold text-sm mb-3">환율 설정</h3>
                    <div className="flex gap-3">
                      <div className="flex-1">
                        <label className="text-[10px] text-gray-400 block mb-1">USD ($) 기준</label>
                        <input type="number" value={exchangeRates.USD} onChange={e => setExchangeRates({...exchangeRates, USD: Number(e.target.value)})} className={`w-full p-2.5 rounded-xl border outline-none text-xs font-bold ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-gray-50 border-gray-200'}`} />
                      </div>
                      <div className="flex-1">
                        <label className="text-[10px] text-gray-400 block mb-1">JPY (¥) 기준</label>
                        <input type="number" value={exchangeRates.JPY} onChange={e => setExchangeRates({...exchangeRates, JPY: Number(e.target.value)})} className={`w-full p-2.5 rounded-xl border outline-none text-xs font-bold ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-gray-50 border-gray-200'}`} />
                      </div>
                    </div>
                  </div>

                  <div className={`p-5 rounded-2xl border shadow-sm ${cardClasses}`}>
                    <h3 className="font-bold text-sm mb-2">인천국제공항 API 설정</h3>
                    <p className="text-[10px] text-gray-400 mb-3 leading-relaxed">공공데이터포털에서 발급받은 일반 인증키를 입력하세요.</p>
                    <input 
                      type="text" 
                      value={apiKey} 
                      onChange={(e) => setApiKey(e.target.value)} 
                      className={`w-full p-3 rounded-xl border outline-none text-[10px] break-all font-medium ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-gray-50 border-gray-200'}`}
                    />
                  </div>
                  <div className={`p-5 rounded-2xl border shadow-sm ${cardClasses}`}>
                    <h3 className="font-bold text-sm mb-3">정산 일행 관리</h3>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {members.map((m, i) => (
                        <div key={i} className={`px-3 py-1.5 rounded-full text-[10px] font-bold flex items-center gap-1.5 border ${isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-100 border-gray-200'}`}>
                          {m}
                          <button onClick={() => setMembers(members.filter((_, idx) => idx !== i))} className="text-gray-400 hover:text-rose-500 font-bold ml-1">×</button>
                        </div>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <input type="text" id="newMember" placeholder="새 멤버 이름" className={`flex-1 p-3 rounded-xl border outline-none text-[11px] font-medium ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-gray-50 border-gray-200'}`} />
                      <button onClick={() => {
                        const name = document.getElementById('newMember').value;
                        if(name && !members.includes(name)) {
                          setMembers([...members, name]);
                          document.getElementById('newMember').value = '';
                        }
                      }} className="px-4 bg-teal-500 text-white rounded-xl font-bold text-[11px] shadow-sm active:scale-95">추가</button>
                    </div>
                  </div>

                  <div className={`p-5 rounded-2xl border shadow-sm ${cardClasses}`}>
                    <h3 className="font-bold text-sm mb-3 flex items-center gap-1"><Icons.Download /> 데이터 내보내기 (CSV)</h3>
                    <div className="grid grid-cols-2 gap-2">
                      <button onClick={exportSchedulesCSV} className={`py-3 rounded-xl font-bold text-[10px] border active:scale-95 ${isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'}`}>
                        일정 CSV 다운로드
                      </button>
                      <button onClick={exportExpensesCSV} className={`py-3 rounded-xl font-bold text-[10px] border active:scale-95 ${isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'}`}>
                        비용 CSV 다운로드
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <nav className={`absolute bottom-0 w-full border-t flex justify-around pb-6 pt-2 px-2 ${isDarkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-100'} shadow-[0_-4px_20px_rgba(0,0,0,0.05)] z-40`}>
              {[ { id: '일정', icon: Icons.Calendar }, { id: '비용', icon: Icons.Wallet }, { id: '지도', icon: Icons.Map }, { id: '설정', icon: Icons.Settings } ].map(tab => (
                <button 
                  key={tab.id} 
                  onClick={() => setActiveTab(tab.id)} 
                  className={`flex flex-col items-center p-2 transition-colors ${activeTab === tab.id ? 'text-teal-500 font-extrabold' : 'text-gray-400 font-medium'}`}
                >
                  <tab.icon />
                  <span className="text-[9px] mt-1">{tab.id}</span>
                </button>
              ))}
            </nav>
          </div>
        )}

        {scheduleModal.isOpen && (
          <GeneralScheduleModal 
            initialDate={scheduleModal.date}
            editIndex={scheduleModal.editIndex}
            schedules={schedules}
            currentUser={currentUser}
            onClose={() => setScheduleModal({isOpen: false, date: null, editIndex: -1})}
            onSave={(newSch) => {
              if (scheduleModal.editIndex >= 0) {
                const newArr = [...schedules];
                newArr[scheduleModal.editIndex] = newSch;
                setSchedules(newArr);
              } else {
                setSchedules([...schedules, newSch]);
              }
              setScheduleModal({isOpen: false, date: null, editIndex: -1});
            }}
            isDarkMode={isDarkMode}
            showAlert={setAlertMsg}
          />
        )}

        {flightModal.isOpen && (
          <FlightApiModal 
            type={flightModal.type} 
            apiKey={apiKey}
            close={() => setFlightModal({isOpen: false, type: 'departure'})} 
            onAdd={(newSch) => {
              newSch.author = currentUser;
              newSch.updatedAt = getCurrentTimeStr();
              if(flightModal.type === 'departure' && tripInfo.start) newSch.date = tripInfo.start;
              if(flightModal.type === 'arrival' && tripInfo.end) newSch.date = tripInfo.end;
              setSchedules([...schedules, newSch]);
            }}
            showAlert={setAlertMsg}
            isDarkMode={isDarkMode}
          />
        )}

        {expenseModal.isOpen && (
          <ExpenseModal 
            item={expenseModal.item}
            editIndex={expenseModal.editIndex}
            members={members}
            currentUser={currentUser}
            onClose={() => setExpenseModal({isOpen: false, item: null, editIndex: -1})}
            onSave={(newExp) => {
              if (expenseModal.editIndex >= 0) {
                const newArr = [...expenses];
                newArr[expenseModal.editIndex] = newExp;
                setExpenses(newArr);
              } else {
                setExpenses([...expenses, newExp]);
              }
              setExpenseModal({isOpen: false, item: null, editIndex: -1});
            }}
            onDelete={() => {
              if(expenseModal.editIndex >= 0) {
                const newArr = [...expenses];
                newArr.splice(expenseModal.editIndex, 1);
                setExpenses(newArr);
              }
              setExpenseModal({isOpen: false, item: null, editIndex: -1});
            }}
            onPhotoClick={(url) => setPhotoModal({isOpen: true, src: url})}
            isDarkMode={isDarkMode}
            showAlert={setAlertMsg}
          />
        )}

        {detailModal.isOpen && (
          <DetailActionModal 
            item={detailModal.item}
            onClose={() => setDetailModal({isOpen: false, item: null, originalIndex: -1})}
            onEdit={() => {
              setScheduleModal({isOpen: true, date: null, editIndex: detailModal.originalIndex});
              setDetailModal({isOpen: false, item: null, originalIndex: -1});
            }}
            onDelete={() => {
              const newArr = [...schedules];
              newArr.splice(detailModal.originalIndex, 1);
              setSchedules(newArr);
              setDetailModal({isOpen: false, item: null, originalIndex: -1});
              setAlertMsg("일정이 삭제되었습니다.");
            }}
            onAddExpense={() => {
              setExpenseModal({
                isOpen: true, 
                editIndex: -1,
                item: { date: detailModal.item.date, category: detailModal.item.category, desc: detailModal.item.place }
              });
              setDetailModal({isOpen: false, item: null, originalIndex: -1});
              setActiveTab('비용');
            }}
            onPhotoClick={(url) => setPhotoModal({isOpen: true, src: url})}
            isDarkMode={isDarkMode}
          />
        )}

        {photoModal.isOpen && (
          <div className="absolute inset-0 bg-black/90 z-[100] flex items-center justify-center p-4 backdrop-blur-md" onClick={() => setPhotoModal({isOpen: false, src: null})}>
            <button className="absolute top-6 right-6 text-white p-2 bg-gray-800/50 rounded-full hover:bg-gray-700 transition-colors" onClick={() => setPhotoModal({isOpen: false, src: null})}>
              <Icons.X />
            </button>
            <img src={photoModal.src} alt="enlarged preview" className="max-w-full max-h-[85vh] object-contain rounded-xl" onClick={e => e.stopPropagation()} />
          </div>
        )}

        <CustomAlert message={alertMsg} onClose={() => setAlertMsg(null)} isDarkMode={isDarkMode} />
      </div>
    </div>
  );
}

// --- 일정 추가/수정 모달 ---
function GeneralScheduleModal({ initialDate, editIndex, schedules, currentUser, onClose, onSave, isDarkMode, showAlert }) {
  const existing = editIndex >= 0 ? schedules[editIndex] : {};
  const [formData, setFormData] = useState({
    category: existing.category || 'Map',
    date: existing.date || initialDate || '2026-11-18',
    time: existing.time || '10:00',
    place: existing.place || '',
    memo: existing.memo || '',
    lat: existing.lat || null,
    lon: existing.lon || null,
    photo: existing.photo || null
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [isManualLocation, setIsManualLocation] = useState(false);

  const handleOSMSearch = async () => {
    if (!searchQuery) return showAlert("검색할 주소/장소를 입력하세요.");
    try {
      const res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchQuery)}`);
      const data = await res.json();
      if(data && data.length > 0) {
        setFormData(prev => ({ ...prev, lat: parseFloat(data[0].lat), lon: parseFloat(data[0].lon) }));
        showAlert(`위치 좌표 연동 완료!\n(Lat: ${data[0].lat.substring(0,6)}, Lon: ${data[0].lon.substring(0,6)})`);
        setIsManualLocation(false);
      } else {
        showAlert("OSM 지도에서 장소를 찾을 수 없어 좌표 수동 입력창을 엽니다.");
        setIsManualLocation(true);
      }
    } catch(e) {
      showAlert("검색 오류 발생. 좌표 수동 입력창을 엽니다.");
      setIsManualLocation(true);
    }
  };

  const handlePhoto = (e) => {
    const file = e.target.files[0];
    if(!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => setFormData(prev => ({...prev, photo: ev.target.result}));
    reader.readAsDataURL(file);
  };

  const inputClass = `w-full p-3 rounded-xl border outline-none text-xs font-medium ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-gray-50 border-gray-200'}`;

  return (
    <div className="absolute inset-0 bg-black/60 z-[60] flex items-end justify-center backdrop-blur-xs">
      <div className={`${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'} w-full max-w-md max-h-[90vh] rounded-t-3xl flex flex-col shadow-2xl animate-in slide-in-from-bottom-10`}>
        <div className={`p-4 flex justify-between items-center border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-100'}`}>
          <h3 className="font-extrabold text-sm">{editIndex >= 0 ? '일정 수정' : '새 일정 추가'}</h3>
          <button onClick={onClose}><Icons.X /></button>
        </div>
        
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          <div>
            <div className="grid grid-cols-6 gap-2">
              {CATEGORIES.map(cat => (
                <button key={cat.id} onClick={() => setFormData({...formData, category: cat.id})} className={`flex flex-col items-center py-2.5 rounded-xl border transition-all ${formData.category === cat.id ? 'bg-teal-500 border-teal-500 text-white' : (isDarkMode ? 'border-gray-700 bg-gray-700/50 text-gray-400' : 'border-gray-200 bg-gray-50 text-gray-500')}`}>
                  <cat.icon />
                  <span className="text-[9px] font-bold mt-1">{cat.name}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="flex gap-2">
            <div className="flex-1"><input type="date" value={formData.date} onChange={e=>setFormData({...formData, date: e.target.value})} className={inputClass}/></div>
            <div className="flex-1"><input type="time" value={formData.time} onChange={e=>setFormData({...formData, time: e.target.value})} className={inputClass}/></div>
          </div>

          <div>
            <input type="text" value={formData.place} onChange={e=>setFormData({...formData, place: e.target.value})} placeholder="장소명 입력 (빈칸 시 메모로 저장)" className={inputClass}/>
          </div>
          
          <div>
            <div className="flex gap-2">
              <input type="text" value={searchQuery} onChange={e=>setSearchQuery(e.target.value)} placeholder="지도 검색어 (OSM 연동)" className={inputClass}/>
              <button onClick={handleOSMSearch} className="px-3 rounded-xl bg-teal-100 dark:bg-teal-900/50 text-teal-600 dark:text-teal-300 font-bold"><Icons.Search /></button>
            </div>
            <div className="mt-1 text-right">
              <button onClick={() => setIsManualLocation(!isManualLocation)} className="text-[9px] text-teal-500 font-bold underline">검색이 안되나요? 좌표 수동 입력</button>
            </div>
          </div>

          {isManualLocation && (
            <div className="flex gap-2">
              <input type="number" step="any" placeholder="위도 (Lat)" value={formData.lat || ''} onChange={e => setFormData({...formData, lat: parseFloat(e.target.value)})} className={inputClass}/>
              <input type="number" step="any" placeholder="경도 (Lon)" value={formData.lon || ''} onChange={e => setFormData({...formData, lon: parseFloat(e.target.value)})} className={inputClass}/>
            </div>
          )}

          <div>
            <textarea value={formData.memo} onChange={e=>setFormData({...formData, memo: e.target.value})} placeholder="메모 (예약번호 등)" className={`${inputClass} min-h-[60px] resize-none`}></textarea>
          </div>

          <div>
            <label className="text-[10px] font-bold text-gray-400 block mb-1.5">사진 첨부</label>
            <input type="file" accept="image/*" onChange={handlePhoto} className="text-[10px] w-full file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-[10px] file:font-bold file:bg-teal-50 file:text-teal-600 dark:file:bg-gray-700 dark:file:text-teal-400"/>
            {formData.photo && <img src={formData.photo} alt="preview" className="mt-2 h-16 w-16 rounded-xl border object-cover shadow-sm"/>}
          </div>
        </div>

        <div className={`p-4 border-t ${isDarkMode ? 'border-gray-700' : 'border-gray-100'}`}>
          <button onClick={() => { 
            if(!formData.place && !formData.memo) { showAlert("장소명이나 메모를 입력해주세요."); return; }
            const finalData = { ...formData };
            if (editIndex >= 0) {
              finalData.author = existing.author;
              finalData.updatedBy = currentUser;
              finalData.updatedAt = getCurrentTimeStr();
            } else {
              finalData.author = currentUser;
              finalData.updatedAt = getCurrentTimeStr();
            }
            onSave(finalData); 
          }} className="w-full py-3.5 bg-teal-500 text-white font-bold rounded-xl active:scale-95 text-xs shadow-md">
            저장하기
          </button>
        </div>
      </div>
    </div>
  )
}

function DetailActionModal({ item, onClose, onEdit, onDelete, onAddExpense, onPhotoClick, isDarkMode }) {
  if (!item) return null;
  return (
    <div className="absolute inset-0 bg-black/60 z-[70] flex items-center justify-center p-4 backdrop-blur-xs">
      <div className={`${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'} rounded-3xl w-full max-w-sm p-5 shadow-2xl animate-in zoom-in-95 space-y-4`}>
        <div className="flex justify-between items-center border-b pb-3 dark:border-gray-700">
          <h3 className="font-extrabold text-sm truncate">{item.place || '메모 기록'}</h3>
          <button onClick={onClose}><Icons.X /></button>
        </div>
        
        <div className="space-y-2 text-[11px]">
          <p><span className="font-bold text-gray-400">일시:</span> {item.date} {item.time}</p>
          {item.memo && <p><span className="font-bold text-gray-400">메모:</span> {item.memo}</p>}
          <p><span className="font-bold text-gray-400">업데이트:</span> {item.updatedBy ? `${item.updatedBy} 수정` : `${item.author} 등록`} ({item.updatedAt})</p>
        </div>
        
        {item.photo && (
          <div className="mt-2">
            <span className="font-bold text-gray-400 block mb-1 text-[11px]">첨부 사진:</span>
            <img src={item.photo} alt="상세 사진" onClick={() => onPhotoClick && onPhotoClick(item.photo)} className="w-full h-32 object-cover rounded-xl border dark:border-gray-700 shadow-sm cursor-pointer hover:opacity-90 transition-opacity" />
          </div>
        )}

        <div className="pt-2 grid grid-cols-1 gap-2">
          <button onClick={onAddExpense} className="w-full py-3 bg-teal-50 text-teal-600 dark:bg-teal-900/30 dark:text-teal-400 text-center font-bold rounded-xl active:scale-95 text-[11px] border border-teal-200 dark:border-teal-800 flex justify-center items-center gap-2">
             <Icons.Wallet /> 💳 이 일정으로 비용 추가
          </button>
          <div className="grid grid-cols-2 gap-2 mt-1">
             <button onClick={onEdit} className="py-2.5 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 font-bold rounded-xl active:scale-95 text-[11px] flex justify-center items-center gap-1">
               <Icons.Pencil /> 수정
             </button>
             <button onClick={onDelete} className="py-2.5 bg-rose-50 dark:bg-rose-900/20 text-rose-600 dark:text-rose-400 font-bold rounded-xl active:scale-95 text-[11px] flex justify-center items-center gap-1">
               <Icons.Trash /> 삭제
             </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function ExpenseModal({ item, editIndex, members, currentUser, onClose, onSave, onDelete, onPhotoClick, isDarkMode, showAlert }) {
  const [formData, setFormData] = useState({
    date: item?.date || '2026-11-18',
    category: item?.category || 'ShoppingBag',
    amount: item?.amount || '',
    currency: item?.currency || 'KRW',
    desc: item?.desc || '',
    payer: item?.payer || currentUser,
    participants: item?.participants || members,
    photo: item?.photo || null 
  });

  const inputClass = `w-full p-3 rounded-xl border outline-none text-xs font-medium ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-gray-50 border-gray-200'}`;

  const toggleParticipant = (m) => {
    if(formData.participants.includes(m)) setFormData({...formData, participants: formData.participants.filter(x => x !== m)});
    else setFormData({...formData, participants: [...formData.participants, m]});
  };

  const handlePhoto = (e) => {
    const file = e.target.files[0];
    if(!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => setFormData(prev => ({...prev, photo: ev.target.result}));
    reader.readAsDataURL(file);
  };

  return (
    <div className="absolute inset-0 bg-black/60 z-[60] flex items-end justify-center backdrop-blur-xs">
      <div className={`${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'} w-full max-w-md max-h-[90vh] rounded-t-3xl flex flex-col shadow-2xl animate-in slide-in-from-bottom-10`}>
        <div className={`p-4 flex justify-between items-center border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-100'}`}>
          <h3 className="font-extrabold text-sm">{editIndex >= 0 ? '비용 내역 수정' : '비용 추가'}</h3>
          <div className="flex gap-3">
             {editIndex >= 0 && <button onClick={onDelete} className="text-rose-500"><Icons.Trash /></button>}
             <button onClick={onClose}><Icons.X /></button>
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          <div className="grid grid-cols-6 gap-2">
            {CATEGORIES.map(cat => (
              <button key={cat.id} onClick={() => setFormData({...formData, category: cat.id})} className={`flex flex-col items-center py-2 rounded-xl border transition-all ${formData.category === cat.id ? 'bg-teal-500 border-teal-500 text-white' : (isDarkMode ? 'border-gray-700 bg-gray-700/50 text-gray-400' : 'border-gray-200 bg-gray-50 text-gray-500')}`}>
                <cat.icon />
              </button>
            ))}
          </div>

          <div className="flex gap-2">
            <input type="date" value={formData.date} onChange={e=>setFormData({...formData, date: e.target.value})} className={`${inputClass} flex-1`}/>
            <select value={formData.currency} onChange={e=>setFormData({...formData, currency: e.target.value})} className={`${inputClass} w-24`}>
               <option value="KRW">KRW ₩</option><option value="USD">USD $</option><option value="JPY">JPY ¥</option>
            </select>
          </div>
          
          {/* [수정] 3자리 콤마 표시 기능 적용 */}
          <input 
            type="text" 
            inputMode="numeric"
            placeholder="금액 입력" 
            value={formData.amount ? Number(formData.amount).toLocaleString() : ''} 
            onChange={e => {
              const val = e.target.value.replace(/,/g, '');
              if (!isNaN(val)) setFormData({...formData, amount: val ? Number(val) : ''});
            }} 
            className={`${inputClass} font-bold text-sm`}
          />
          
          <input type="text" placeholder="사용처 (예: 저녁식사)" value={formData.desc} onChange={e=>setFormData({...formData, desc: e.target.value})} className={inputClass}/>

          <div>
             <label className="text-[10px] font-bold text-gray-400 block mb-1.5">결제자 (돈 낸 사람)</label>
             <div className="flex gap-2 overflow-x-auto hide-scrollbar">
                {members.map(m => (
                  <button key={`payer-${m}`} onClick={() => setFormData({...formData, payer: m})} className={`px-3 py-1.5 rounded-full text-[10px] font-bold border whitespace-nowrap ${formData.payer === m ? 'bg-gray-800 text-white border-gray-800 dark:bg-gray-100 dark:text-gray-900' : 'bg-gray-50 text-gray-500 border-gray-200 dark:bg-gray-800 dark:border-gray-700'}`}>
                    {m}
                  </button>
                ))}
             </div>
          </div>

          <div>
             <label className="text-[10px] font-bold text-gray-400 block mb-1.5">N빵 정산 대상 (다중 선택)</label>
             <div className="flex gap-2 overflow-x-auto hide-scrollbar">
                {members.map(m => {
                  const isSel = formData.participants.includes(m);
                  return (
                    <button key={`part-${m}`} onClick={() => toggleParticipant(m)} className={`px-3 py-1.5 rounded-full text-[10px] font-bold border whitespace-nowrap ${isSel ? 'bg-teal-500 text-white border-teal-500' : 'bg-gray-50 text-gray-400 border-gray-200 dark:bg-gray-800 dark:border-gray-700'}`}>
                      {m}
                    </button>
                  )
                })}
             </div>
          </div>

          <div>
            <label className="text-[10px] font-bold text-gray-400 block mb-1.5">영수증 / 증빙 사진 첨부</label>
            <input type="file" accept="image/*" onChange={handlePhoto} className="text-[10px] w-full file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-[10px] file:font-bold file:bg-teal-50 file:text-teal-600 dark:file:bg-gray-700 dark:file:text-teal-400"/>
            {formData.photo && <img src={formData.photo} alt="preview" onClick={() => onPhotoClick && onPhotoClick(formData.photo)} className="mt-2 h-16 w-16 rounded-xl border object-cover shadow-sm cursor-pointer hover:opacity-90"/>}
          </div>
        </div>

        <div className={`p-4 border-t ${isDarkMode ? 'border-gray-700' : 'border-gray-100'}`}>
          <button onClick={() => { 
            if(!formData.amount || !formData.desc) { showAlert("금액과 사용처를 입력하세요."); return; }
            if(formData.participants.length === 0) { showAlert("N빵 대상을 1명 이상 선택하세요."); return; }
            onSave({...formData, amount: Number(formData.amount)}); 
          }} className="w-full py-3.5 bg-teal-500 text-white font-bold rounded-xl active:scale-95 text-xs shadow-md">
            비용 저장하기
          </button>
        </div>
      </div>
    </div>
  )
}

function FlightApiModal({ type, apiKey, close, onAdd, showAlert, isDarkMode }) {
  const [flightId, setFlightId] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const checkApiError = (text) => {
    if(!text) return null;
    if(text.includes('Unauthorized')) return 'API 인증키가 존재하지 않거나 유효하지 않습니다.';
    if(text.includes('Forbidden')) return 'API 서비스에 대한 신청내역이 확인되지 않습니다.';
    if(text.includes('API not found')) return 'API 서비스가 존재하지 않습니다.';
    if(text.includes('Error forwarding request')) return '기관 API 서버와의 연결에 실패했습니다.';
    if(text.includes('Error receiving response')) return '기관 API 서버로부터 응답을 받지 못했습니다.';
    if(text.includes('API rate limit exceeded')) return '서버의 최대 동시 요청 수를 초과하였습니다.';
    if(text.includes('API token quota exceeded')) return 'API 서비스 일일 허용량을 초과하였습니다.';
    if(text.includes('INVALID_REQUEST_PARAMETER_ERROR') || text.includes('<resultCode>11</resultCode>')) return '잘못된 요청 파라메터 에러입니다.';
    return null;
  };

  const handleSearch = async () => {
    if(!flightId) return showAlert('항공편명을 입력해주세요.');
    setIsLoading(true);
    
    try {
      const endpoint = type === 'departure' ? 'getFltDeparturesDeOdp' : 'getFltArrivalsDeOdp';
      const url = `https://apis.data.go.kr/B551177/statusOfAllFltDeOdp/${endpoint}?serviceKey=${apiKey}&flight_id=${flightId.toUpperCase()}&type=json`;
      const res = await fetch(url);
      const text = await res.text();
      
      const errorMsg = checkApiError(text);
      if(errorMsg) { showAlert(`[공공데이터 오류]\n${errorMsg}`); setIsLoading(false); return; }
      throw new Error('Fallback to Mock');
    } catch (e) {
      let mockData = null;
      if(flightId.toUpperCase() === 'KE417' && type === 'departure') {
        mockData = { category: 'PlaneTakeoff', time: '19:45', place: '인천국제공항(ICN) -> 괌(GUM)', memo: 'KE417 출국편', lat: 37.4602, lon: 126.4407 };
      } else if(flightId.toUpperCase() === 'KE416' && type === 'arrival') {
        mockData = { category: 'PlaneLand', time: '16:50', place: '괌(GUM) -> 인천국제공항(ICN)', memo: 'KE416 귀국편', lat: 13.4925, lon: 144.7944 };
      } else {
        showAlert('조회된 데이터가 없습니다.\n(테스트: KE417 출국, KE416 귀국 입력)');
        setIsLoading(false);
        return;
      }
      onAdd(mockData);
      showAlert('항공편이 성공적으로 등록되었습니다.');
      close();
    }
  };

  return (
    <div className="absolute inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-xs">
      <div className={`${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'} rounded-3xl w-full max-w-sm overflow-hidden shadow-2xl animate-in zoom-in-95`}>
        <div className={`p-4 flex justify-between items-center ${isDarkMode ? 'bg-gray-900 border-gray-700' : 'bg-gray-50 border-gray-100'} border-b`}>
          <h3 className="font-extrabold text-[11px] flex items-center">
            {type === 'departure' ? <span className="text-blue-500 mr-1.5"><Icons.PlaneTakeoff /></span> : <span className="text-rose-500 mr-1.5"><Icons.PlaneLand /></span>}
            {type === 'departure' ? '인천국제공항 출국편 조회' : '인천국제공항 도착편 조회'}
          </h3>
          <button onClick={close} className="p-1"><Icons.X /></button>
        </div>
        <div className="p-5 space-y-4">
          <input type="text" value={flightId} onChange={e => setFlightId(e.target.value.toUpperCase())} placeholder={type === 'departure' ? "예: KE417" : "예: KE416"} className={`w-full p-3 rounded-xl font-bold text-center outline-none border text-xs ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-gray-50 border-gray-200'}`} />
          <button onClick={handleSearch} disabled={isLoading} className="w-full py-3.5 font-bold rounded-xl bg-teal-500 text-white shadow-md active:scale-95 transition-transform text-xs">
            {isLoading ? '조회 중...' : '조회하기'}
          </button>
        </div>
      </div>
    </div>
  );
}
