import { useState } from 'react';
import { FareDisplay } from './FareDisplay';

export type PageView = 'welcome' | 'overview' | 'route-analytics' | 'fare-forecast' | 'alerts' | 'methodology';

export function App() {
  const [activeTab, setActiveTab] = useState<PageView>('welcome');
  const [selectedRoute, setSelectedRoute] = useState<string>('DEL-BLR');

  const isLanding = activeTab === 'welcome';

  return (
    <div className="w-screen h-screen bg-grid-lines flex flex-col overflow-hidden font-sans">
      
      {/* TOP HEADER RIBBON — ONLY FOR LANDING PAGE */}
      {isLanding && (
        <header className="bg-white/90 backdrop-blur-md border-b border-slate-200/80 px-8 py-3 flex items-center justify-between text-xs text-slate-600 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-2xl bg-[#32533D] flex items-center justify-center shadow-sm shrink-0">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3l7 18-7-4-7 4 7-18z"/>
              </svg>
            </div>
            <div className="leading-tight">
              <div className="font-extrabold text-slate-900 tracking-tight text-xs flex items-center gap-2">
                AIR FARE INDEX <span className="font-normal text-[10px] text-slate-400 uppercase tracking-wide">Aviation Intelligence</span>
              </div>
              <div className="text-[10px] text-slate-400">National Civil Aviation Telemetry • India</div>
            </div>
          </div>

          <div className="flex items-center gap-1 bg-slate-100/80 p-1 rounded-full border border-slate-200/80 text-[11px] font-medium text-slate-600">
            <button onClick={() => setActiveTab('welcome')} className="px-3.5 py-1 rounded-full bg-[#32533D] text-white font-semibold transition">Home</button>
            <button onClick={() => setActiveTab('overview')} className="px-3.5 py-1 rounded-full border border-dashed border-slate-300 hover:text-slate-900 transition">Overview & Indices</button>
            <button onClick={() => setActiveTab('route-analytics')} className="px-3.5 py-1 rounded-full border border-dashed border-slate-300 hover:text-slate-900 transition">Route Analytics</button>
            <button onClick={() => setActiveTab('fare-forecast')} className="px-3.5 py-1 rounded-full border border-dashed border-slate-300 hover:text-slate-900 transition">Fare Forecast</button>
            <button onClick={() => setActiveTab('alerts')} className="px-3.5 py-1 rounded-full border border-dashed border-slate-300 hover:text-slate-900 transition">Alerts & Surges</button>
            <button onClick={() => setActiveTab('methodology')} className="px-3.5 py-1 rounded-full border border-dashed border-slate-300 hover:text-slate-900 transition">Methodology & Data</button>
          </div>

          <div className="flex items-center gap-3 text-[11px]">
              <span className="inline-flex items-center gap-1.5 text-slate-600 font-medium">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span> Live Demo Active
            </span>
            <button onClick={() => setActiveTab('overview')} className="px-3.5 py-1 bg-white border border-dashed border-indigo-400 text-indigo-700 font-semibold rounded-lg hover:bg-slate-50 transition">
              Open Dashboard →
            </button>
          </div>
        </header>
      )}

      {/* WORKSPACE AREA (LEFT SIDEBAR + MAIN CONTENT) */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* LEFT SIDEBAR — ACTIVE FOR ALL DASHBOARD PAGES */}
        <aside className="w-64 bg-white/80 backdrop-blur-md border-r border-slate-200/80 flex flex-col shrink-0">
          {!isLanding && (
            <div className="p-4 border-b border-slate-200/60 flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-[#32533D] flex items-center justify-center shrink-0">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 3l7 18-7-4-7 4 7-18z"/>
                </svg>
              </div>
              <div className="leading-tight">
                <div className="font-bold text-slate-900 text-xs">Air Fare Index</div>
                <div className="text-[10px] text-slate-400">Aviation Intelligence</div>
              </div>
            </div>
          )}

          <div className="p-3 border-b border-slate-200/60">
            <div className="relative">
              <input 
                type="text" 
                placeholder="Search corridors, hubs..." 
                className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-8 pr-3 py-1.5 text-xs focus:outline-none focus:border-slate-400"
              />
              <svg className="w-3.5 h-3.5 absolute left-2.5 top-2 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
            </div>
          </div>

          <nav className="flex-1 p-3 space-y-1 text-xs font-medium text-slate-600">
            <button 
              onClick={() => setActiveTab('overview')} 
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl transition ${activeTab === 'overview' ? 'bg-[#32533D] text-white font-semibold shadow-sm' : 'hover:bg-slate-100'}`}
            >
              <span>Overview & Indices</span>
            </button>
            <button 
              onClick={() => setActiveTab('route-analytics')} 
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl transition ${activeTab === 'route-analytics' ? 'bg-[#32533D] text-white font-semibold shadow-sm' : 'hover:bg-slate-100'}`}
            >
              <span>Route Analytics</span>
              <span className={`text-[9px] px-1.5 py-0.5 rounded font-bold ${activeTab === 'route-analytics' ? 'bg-white/20 text-white' : 'bg-emerald-100 text-emerald-800'}`}>ACTIVE</span>
            </button>
            <button 
              onClick={() => setActiveTab('fare-forecast')} 
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl transition ${activeTab === 'fare-forecast' ? 'bg-[#32533D] text-white font-semibold shadow-sm' : 'hover:bg-slate-100'}`}
            >
              <span>Fare Forecast</span>
            </button>
            <button 
              onClick={() => setActiveTab('alerts')} 
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl transition ${activeTab === 'alerts' ? 'bg-[#32533D] text-white font-semibold shadow-sm' : 'hover:bg-slate-100'}`}
            >
              <span>Alerts & Surges</span>
              <span className="bg-amber-100 text-amber-800 text-[10px] px-1.5 py-0.5 rounded-full font-bold">4</span>
            </button>
            <button 
              onClick={() => setActiveTab('methodology')} 
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl transition ${activeTab === 'methodology' ? 'bg-[#32533D] text-white font-semibold shadow-sm' : 'hover:bg-slate-100'}`}
            >
              <span>Methodology & Data</span>
            </button>
          </nav>

          {!isLanding && (
            <div className="p-3 border-t border-slate-200/60">
              <button onClick={() => setActiveTab('welcome')} className="w-full text-left px-3 py-1.5 text-[11px] text-slate-500 hover:text-slate-900 transition flex items-center gap-1.5">
                ← Back to Home
              </button>
            </div>
          )}

          <div className="p-3 m-3 bg-white/90 rounded-xl border border-slate-200/80 text-xs shadow-xs">
            <div className="flex justify-between items-center mb-2 font-semibold text-slate-700">
              <span>MONITORED SECTORS</span>
              <span className="text-[10px] text-slate-500 font-normal">120 Active</span>
            </div>
            <div className="grid grid-cols-2 gap-1 font-mono text-[11px] text-slate-600">
              <div className="bg-slate-50 p-1 rounded border border-slate-200 text-center">DEL-BOM</div>
              <div className="bg-slate-50 p-1 rounded border border-slate-200 text-center">BLR-DEL</div>
              <div className="bg-slate-50 p-1 rounded border border-slate-200 text-center">BOM-GOI</div>
            </div>
          </div>
        </aside>

        {/* MAIN CONTENT WORKSPACE */}
        <main className="flex-1 p-8 overflow-y-auto">
          
          {/* PAGE 1: WELCOME / LANDING */}
          {activeTab === 'welcome' && (
            <div className="grid grid-cols-12 gap-10 items-start">
              <div className="col-span-7 space-y-7">
                <div>
                  <span className="text-[11px] font-semibold text-slate-600 bg-slate-200/60 px-3 py-1 rounded-full border border-slate-300/50">
                    • National Domestic Fare Observatory · Live Demo
                  </span>
                  <h1 className="text-5xl font-black text-slate-900 mt-4 tracking-tight">Air Fare Index</h1>
                  <p className="text-xl font-semibold text-[#32533D] mt-1">
                    India’s Domestic Air Fare Intelligence Platform
                  </p>
                  <p className="text-xs text-slate-500 mt-3 leading-relaxed max-w-lg">
                    Track observed domestic air fares, understand route-level price movements, and monitor India's aviation corridors.
                  </p>
                </div>

                <div className="flex items-center gap-4 pt-2">
                  <button onClick={() => setActiveTab('overview')} className="px-6 py-3 bg-[#32533D] hover:bg-[#274230] text-white font-semibold rounded-xl shadow-sm text-xs flex items-center gap-2 transition">
                    Explore Air Fare Index →
                  </button>
                  <button onClick={() => setActiveTab('methodology')} className="px-6 py-3 bg-white border-2 border-dashed border-indigo-300 hover:border-indigo-400 text-slate-700 font-medium rounded-xl text-xs transition">
                    View Methodology & Standards
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-1 text-xs">
                  <div className="space-y-2 rounded-xl border border-slate-200/80 bg-white/75 p-4 shadow-xs">
                    <div className="font-bold text-slate-800 flex items-center gap-1.5">✓ Air Fare Index Tracking</div>
                    <p className="text-[11px] text-slate-500 leading-relaxed">Measure route-level fare movements using observed domestic fare data.</p>
                  </div>
                  <div className="space-y-2 rounded-xl border border-slate-200/80 bg-white/75 p-4 shadow-xs">
                    <div className="font-bold text-slate-800 flex items-center gap-1.5">✓ Route Intelligence</div>
                    <p className="text-[11px] text-slate-500 leading-relaxed">Inspect route prices, observations, airlines, and fare components.</p>
                  </div>
                  <div className="space-y-2 rounded-xl border border-slate-200/80 bg-white/75 p-4 shadow-xs">
                    <div className="font-bold text-slate-800 flex items-center gap-1.5">✓ Fare Forecasting</div>
                    <p className="text-[11px] text-slate-500 leading-relaxed">View forward-looking fare estimates for supported domestic corridors.</p>
                  </div>
                  <div className="space-y-2 rounded-xl border border-slate-200/80 bg-white/75 p-4 shadow-xs">
                    <div className="font-bold text-slate-800 flex items-center gap-1.5">✓ Fare Alerts & Anomalies</div>
                    <p className="text-[11px] text-slate-500 leading-relaxed">Identify unusual increases and decreases in observed fares.</p>
                  </div>
                </div>

                <div className="grid grid-cols-4 gap-3 pt-5 border-t border-slate-200/80">
                  <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs">
                    <div className="text-slate-400 text-[9px] font-bold uppercase tracking-wide">ACTIVE CORRIDORS</div>
                    <div className="text-lg font-bold text-slate-900 mt-1">120+</div>
                    <div className="text-[9px] font-normal text-slate-400 mt-0.5">Domestic Corridors</div>
                  </div>
                  <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs">
                    <div className="text-slate-400 text-[9px] font-bold uppercase tracking-wide">MVP ROUTES</div>
                    <div className="text-lg font-bold text-slate-900 mt-1">25</div>
                    <div className="text-[9px] font-normal text-slate-400 mt-0.5">Supported Corridors</div>
                  </div>
                  <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs">
                    <div className="text-slate-400 text-[9px] font-bold uppercase tracking-wide">OBSERVATIONS</div>
                    <div className="text-lg font-bold text-slate-900 mt-1">125</div>
                    <div className="text-[9px] font-normal text-slate-400 mt-0.5">5 per MVP Route</div>
                  </div>
                  <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs">
                    <div className="text-slate-400 text-[9px] font-bold uppercase tracking-wide">ROUTE WEIGHT</div>
                    <div className="text-lg font-bold text-slate-900 mt-1">4.0%</div>
                    <div className="text-[9px] font-normal text-slate-400 mt-0.5">Equal MVP Weight</div>
                  </div>
                </div>
              </div>

              {/* Right Column: India Flight Network Map */}
              <div className="col-span-5 bg-white/90 rounded-3xl p-7 border border-slate-200/80 shadow-sm relative space-y-5">
                <div className="flex justify-between items-center text-xs font-semibold text-slate-700 border-b border-slate-100 pb-2">
                  <span>• Indian Airspace Flight Network</span>
                  <span className="text-emerald-600 text-[11px] font-normal">• Live Demo</span>
                </div>

                <div className="h-80 w-full relative flex items-center justify-center">
                  <svg className="w-full h-full" viewBox="0 0 340 280" fill="none">
                    <path d="M 140 25 C 180 15, 200 40, 210 70 C 240 90, 265 120, 235 160 C 215 200, 195 245, 160 255 C 140 245, 115 195, 95 165 C 75 135, 85 75, 140 25 Z" fill="#f1f5f9" opacity="0.85"/>
                    <path d="M 140 80 L 95 155" stroke="#94a3b8" strokeWidth="1.2" strokeDasharray="3 3"/>
                    <path d="M 140 80 L 165 205" stroke="#32533D" strokeWidth="2"/>
                    <path d="M 95 155 L 165 205" stroke="#cbd5e1" strokeWidth="1.2"/>
                    <path d="M 140 80 L 230 130" stroke="#cbd5e1" strokeWidth="1.2"/>

                    <circle cx="140" cy="80" r="5" fill="#0f172a"/>
                    <text x="150" y="76" fill="#0f172a" fontSize="10" fontWeight="bold">DEL</text>
                    <text x="150" y="86" fill="#94a3b8" fontSize="8">Delhi NCR</text>

                    <circle cx="95" cy="155" r="4" fill="#0f172a"/>
                    <text x="65" y="158" fill="#0f172a" fontSize="10" fontWeight="bold">BOM</text>
                    <text x="65" y="167" fill="#94a3b8" fontSize="8">Mumbai</text>

                    <circle cx="145" cy="158" r="3" fill="#64748b"/>
                    <text x="151" y="161" fill="#64748b" fontSize="8">HYD</text>

                    <circle cx="165" cy="205" r="5" fill="#32533D"/>
                    <text x="175" y="208" fill="#32533D" fontSize="10" fontWeight="bold">BLR</text>
                    <text x="175" y="217" fill="#94a3b8" fontSize="8">Bengaluru</text>

                    <circle cx="230" cy="130" r="3" fill="#64748b"/>
                    <text x="236" y="133" fill="#64748b" fontSize="8">CCU</text>

                    <g transform="translate(155, 115)">
                      <rect width="84" height="22" rx="6" fill="#ffffff" stroke="#e2e8f0" filter="drop-shadow(0 1px 2px rgba(0,0,0,0.05))"/>
                      <text x="7" y="14" fill="#0f172a" fontSize="9" fontWeight="bold">DEL-BLR</text>
                      <text x="50" y="14" fill="#d97706" fontSize="8" fontWeight="bold">Observed</text>
                    </g>
                  </svg>
                </div>

                <div className="flex justify-between text-[11px] text-slate-400 pt-2 border-t border-slate-100">
                  <span>• Representative Corridors</span>
                  <span>120+ Corridors Monitored</span>
                </div>
              </div>
            </div>
          )}

          {/* PAGE 2: OVERVIEW & INDICES */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div className="flex justify-between items-start border-b border-slate-200/60 pb-5">
                <div>
                  <div className="text-xs text-slate-400 font-medium">Air Fare Index / <span className="text-slate-800 font-semibold">Dashboard</span></div>
                  <h2 className="text-2xl font-bold text-slate-900 mt-1">Overview &amp; Indices</h2>
                  <p className="text-xs text-slate-500 mt-1">National and route-level views of observed domestic air fare movements.</p>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-[#32533D] bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-200">
                    <span className="text-emerald-600">●</span> Live Demo Active
                  </span>
                  <span className="text-[10px] text-slate-400">25 Supported MVP Corridors</span>
                </div>
              </div>

              <div className="grid grid-cols-4 gap-4">
                <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-3">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">NATIONAL COMPOSITE AIR FARE INDEX</span>
                  <div className="text-3xl font-extrabold text-slate-900">148.2</div>
                  <p className="text-[11px] text-slate-500">Composite MVP Index</p>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">AVERAGE OBSERVED FARE</span>
                  <div className="text-3xl font-extrabold text-slate-900">₹5,480</div>
                  <p className="text-[11px] text-slate-500">Across available observations</p>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">SUPPORTED MVP CORRIDORS</span>
                  <div className="text-3xl font-extrabold text-slate-900">25</div>
                  <p className="text-[11px] text-slate-500">Domestic routes</p>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">OBSERVATIONS</span>
                  <div className="text-3xl font-extrabold text-slate-900">125</div>
                  <p className="text-[11px] text-slate-500">5 per MVP route</p>
                </div>
              </div>

              {/* Index Movement Graph Card */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
                <div className="flex justify-between items-start gap-4">
                  <div>
                    <span className="text-[10px] font-bold uppercase text-slate-400">INDEX MOVEMENT</span>
                    <h3 className="text-base font-bold text-slate-900 mt-1">Air Fare Index Movement</h3>
                    <p className="text-[11px] text-slate-500 mt-1">Representative movement from the current MVP observation dataset.</p>
                  </div>
                  <div className="flex items-center gap-3 text-[10px] shrink-0">
                    <span className="inline-flex items-center gap-1.5 text-slate-500 bg-slate-50 border border-slate-200 px-2.5 py-1.5 rounded-lg">
                      <span className="w-2 h-2 bg-[#32533D] rounded-full"></span> Live Demo Dataset
                    </span>
                    <span className="flex items-center gap-1.5 text-slate-500"><span className="w-2 h-2 bg-blue-500 rounded-full"></span> Index</span>
                  </div>
                </div>

                <div className="h-48 w-full pt-2">
                  <svg className="w-full h-full" viewBox="0 0 600 140" fill="none" role="img" aria-label="Air Fare Index Movement demo chart">
                    <path d="M 40 20 H 570 M 40 55 H 570 M 40 90 H 570 M 40 120 H 570" stroke="#e2e8f0" strokeWidth="1"/>
                    <path d="M 40 20 V 120 M 172 20 V 120 M 305 20 V 120 M 438 20 V 120 M 570 20 V 120" stroke="#f1f5f9" strokeWidth="1"/>
                    <text x="4" y="23" fill="#94a3b8" fontSize="9">150</text>
                    <text x="4" y="58" fill="#94a3b8" fontSize="9">135</text>
                    <text x="4" y="93" fill="#94a3b8" fontSize="9">120</text>
                    <text x="4" y="123" fill="#94a3b8" fontSize="9">100</text>
                    <path d="M 40 98 Q 130 94, 215 78 T 385 55 T 500 42 T 570 30" stroke="#32533D" strokeWidth="2.5"/>
                    <path d="M 40 105 Q 130 100, 215 86 T 385 66 T 500 54 T 570 45" stroke="#3b82f6" strokeWidth="1.5" strokeDasharray="4 4"/>
                    <path d="M 40 98 Q 130 94, 215 78 T 385 55 T 500 42 T 570 30 L 570 120 L 40 120 Z" fill="#32533D" opacity="0.06"/>
                    <line x1="570" y1="20" x2="570" y2="120" stroke="#32533D" strokeWidth="1" strokeDasharray="3 3"/>
                    <circle cx="570" cy="30" r="4" fill="#32533D" stroke="white" strokeWidth="2"/>
                    <text x="40" y="136" fill="#94a3b8" fontSize="9">Dataset start</text>
                    <text x="530" y="136" fill="#32533D" fontSize="9" fontWeight="bold">Current</text>
                  </svg>
                </div>
              </div>

              <div className="grid grid-cols-12 gap-6">
                <div className="col-span-8 bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
                  <div className="p-5 border-b border-slate-100 flex items-start justify-between gap-4">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">ROUTE SNAPSHOT</span>
                      <h3 className="text-base font-bold text-slate-900 mt-1">Representative MVP Corridors</h3>
                      <p className="text-[11px] text-slate-500 mt-1">Five supported routes from the current demo scope.</p>
                    </div>
                    <button onClick={() => setActiveTab('route-analytics')} className="text-[11px] font-semibold text-[#32533D] hover:text-[#274230] whitespace-nowrap mt-1">
                      Open Route Analytics →
                    </button>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-slate-50 text-[10px] uppercase tracking-wider text-slate-400">
                        <tr>
                          <th className="px-5 py-3 font-bold">Route</th>
                          <th className="px-4 py-3 font-bold">Observed Fare</th>
                          <th className="px-4 py-3 font-bold">Observations</th>
                          <th className="px-5 py-3 font-bold text-right">Weight</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 text-slate-700">
                        <tr>
                          <td className="px-5 py-3 font-mono font-semibold text-slate-900">DEL-BOM</td>
                          <td className="px-4 py-3">
                            <details className="relative">
                              <summary className="list-none cursor-pointer font-semibold text-slate-900">₹5,800 <span className="text-[10px] font-normal text-slate-500">+ taxes ⓘ</span></summary>
                              <div className="absolute left-0 top-6 z-20 w-52 rounded-lg bg-slate-900 p-3 text-[10px] text-white shadow-xl">
                                <div className="flex justify-between"><span className="text-slate-400">Fare Displayed</span><span>₹5,800</span></div>
                                <div className="flex justify-between mt-1"><span className="text-slate-400">Taxes &amp; Fees</span><span>Not available</span></div>
                                <div className="flex justify-between mt-2 border-t border-slate-700 pt-2 font-semibold"><span>Total Fare</span><span>Not available</span></div>
                              </div>
                            </details>
                          </td>
                          <td className="px-4 py-3 text-slate-500">5</td>
                          <td className="px-5 py-3 text-right font-semibold">4.0%</td>
                        </tr>
                        <tr>
                          <td className="px-5 py-3 font-mono font-semibold text-slate-900">DEL-BLR</td>
                          <td className="px-4 py-3">
                            <details className="relative">
                              <summary className="list-none cursor-pointer font-semibold text-slate-900">₹6,120 <span className="text-[10px] font-normal text-slate-500">+ taxes ⓘ</span></summary>
                              <div className="absolute left-0 top-6 z-20 w-52 rounded-lg bg-slate-900 p-3 text-[10px] text-white shadow-xl">
                                <div className="flex justify-between"><span className="text-slate-400">Fare Displayed</span><span>₹6,120</span></div>
                                <div className="flex justify-between mt-1"><span className="text-slate-400">Taxes &amp; Fees</span><span>Not available</span></div>
                                <div className="flex justify-between mt-2 border-t border-slate-700 pt-2 font-semibold"><span>Total Fare</span><span>Not available</span></div>
                              </div>
                            </details>
                          </td>
                          <td className="px-4 py-3 text-slate-500">5</td>
                          <td className="px-5 py-3 text-right font-semibold">4.0%</td>
                        </tr>
                        <tr>
                          <td className="px-5 py-3 font-mono font-semibold text-slate-900">BOM-BLR</td>
                          <td className="px-4 py-3 text-slate-400">Not available</td>
                          <td className="px-4 py-3 text-slate-500">5</td>
                          <td className="px-5 py-3 text-right font-semibold">4.0%</td>
                        </tr>
                        <tr>
                          <td className="px-5 py-3 font-mono font-semibold text-slate-900">BLR-HYD</td>
                          <td className="px-4 py-3 text-slate-400">Not available</td>
                          <td className="px-4 py-3 text-slate-500">5</td>
                          <td className="px-5 py-3 text-right font-semibold">4.0%</td>
                        </tr>
                        <tr>
                          <td className="px-5 py-3 font-mono font-semibold text-slate-900">MAA-COK</td>
                          <td className="px-4 py-3 text-slate-400">Not available</td>
                          <td className="px-4 py-3 text-slate-500">5</td>
                          <td className="px-5 py-3 text-right font-semibold">4.0%</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="col-span-4 bg-[#f4f7f5] rounded-2xl border border-emerald-100 shadow-xs p-5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#32533D]">LIVE DEMO DATA</span>
                  <h3 className="text-base font-bold text-slate-900 mt-1">Current MVP observation set</h3>
                  <div className="mt-5 space-y-3 text-xs">
                    <div className="flex justify-between border-b border-emerald-100 pb-2"><span className="text-slate-500">Supported routes</span><span className="font-bold text-slate-900">25</span></div>
                    <div className="flex justify-between border-b border-emerald-100 pb-2"><span className="text-slate-500">Observations</span><span className="font-bold text-slate-900">125</span></div>
                    <div className="flex justify-between border-b border-emerald-100 pb-2"><span className="text-slate-500">Observations per route</span><span className="font-bold text-slate-900">5</span></div>
                    <div className="flex justify-between"><span className="text-slate-500">Route weighting</span><span className="font-bold text-slate-900">Equal · 4.0%</span></div>
                  </div>
                  <p className="text-[11px] leading-relaxed text-slate-600 mt-6 pt-4 border-t border-emerald-100">Observation-level fare data powers the index.</p>
                </div>
              </div>
            </div>
          )}

          {/* PAGE 3: ROUTE ANALYTICS */}
          {activeTab === 'route-analytics' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center border-b border-slate-200/60 pb-4">
                <div>
                  <h2 className="text-2xl font-bold text-slate-900">Route Analytics <span className="text-xs font-normal bg-emerald-100 text-emerald-800 px-2.5 py-1 rounded ml-2">MVP Corridor Desk</span></h2>
                  <p className="text-xs text-slate-500 mt-0.5">Analyze fare movements, underlying observation samples, and calculated route price indices.</p>
                </div>
              </div>

              <div className="bg-white p-4 rounded-xl border border-slate-200/80 flex items-center justify-between shadow-2xs">
                <div className="flex items-center gap-4">
                  <span className="text-xs font-bold text-slate-400 uppercase">Select Corridor:</span>
                  <select value={selectedRoute} onChange={(e) => setSelectedRoute(e.target.value)} className="bg-slate-50 border border-slate-300 rounded-lg px-3 py-1.5 text-xs font-bold text-slate-800">
                    <option value="DEL-BLR">DEL-BLR (Delhi ⇄ Bengaluru)</option>
                    <option value="DEL-BOM">DEL-BOM (Delhi ⇄ Mumbai)</option>
                    <option value="BOM-GOI">BOM-GOI (Mumbai ⇄ Goa)</option>
                  </select>
                </div>
                <span className="text-xs text-slate-500">Corridor 2 of 25 in MVP Set</span>
              </div>

              <div className="grid grid-cols-3 gap-6">
                <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-2">
                  <span className="text-[10px] font-bold uppercase text-slate-400">MEDIAN ROUTE PRICE</span>
                  <div className="text-3xl font-extrabold text-slate-900">₹6,120 <span className="text-xs font-normal text-slate-400">INR</span></div>
                  <p className="text-xs text-slate-500">Calculated from 5 route observations.</p>
                </div>
                <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-2">
                  <span className="text-[10px] font-bold uppercase text-slate-400">MVP ROUTE WEIGHT</span>
                  <div className="text-3xl font-extrabold text-slate-900">4.0% <span className="text-xs font-normal text-slate-400">(1 / 25)</span></div>
                  <p className="text-xs text-slate-500">Equal corridor weighting across MVP scope.</p>
                </div>
                <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-2">
                  <span className="text-[10px] font-bold uppercase text-slate-400">OBSERVATION TELEMETRY</span>
                  <div className="text-3xl font-extrabold text-emerald-700">5 of 5 Collected</div>
                  <p className="text-xs text-slate-500">Min: ₹5,750 • Max: ₹6,490</p>
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-xs">
                <div className="p-4 border-b border-slate-100 bg-slate-50/50 font-bold text-xs text-slate-800">
                  Route Fare Observations (Sample Set N=5) — Verified GDS / Direct API
                </div>
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="border-b border-slate-200/60 text-slate-400 bg-slate-50">
                      <th className="p-3">Obs ID</th>
                      <th className="p-3">Collected At</th>
                      <th className="p-3">Airline & Flight</th>
                      <th className="p-3">Dept Time</th>
                      <th className="p-3">Fare Displayed</th>
                      <th className="p-3">Taxes & Fees</th>
                      <th className="p-3">Total Fare</th>
                      <th className="p-3">Source</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    <tr>
                      <td className="p-3 font-mono font-medium">OBS-10921</td>
                      <td className="p-3 text-slate-400">15 Nov 08:12</td>
                      <td className="p-3 font-medium">Akasa Air QP-1342</td>
                      <td className="p-3">07:28</td>
                      <td className="p-3">₹5,100</td>
                      <td className="p-3">₹650</td>
                      <td className="p-3 font-bold text-slate-900"><FareDisplay amount={5100} taxes={650} /></td>
                      <td className="p-3 text-emerald-700 font-medium">Direct API</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-mono font-medium">OBS-10922</td>
                      <td className="p-3 text-slate-400">15 Nov 08:15</td>
                      <td className="p-3 font-medium">IndiGo 6E-2131</td>
                      <td className="p-3">09:45</td>
                      <td className="p-3">₹5,250</td>
                      <td className="p-3">₹698</td>
                      <td className="p-3 font-bold text-slate-900"><FareDisplay amount={5250} taxes={698} /></td>
                      <td className="p-3 text-blue-700 font-medium">GDS Aggregator</td>
                    </tr>
                    <tr className="bg-emerald-50/40">
                      <td className="p-3 font-mono font-medium">OBS-10923</td>
                      <td className="p-3 text-slate-400">15 Nov 08:20</td>
                      <td className="p-3 font-medium">IndiGo 6E-5012</td>
                      <td className="p-3">14:18</td>
                      <td className="p-3">₹5,380</td>
                      <td className="p-3">₹740</td>
                      <td className="p-3 font-bold text-slate-900"><FareDisplay amount={5380} taxes={740} /></td>
                      <td className="p-3 text-emerald-800 font-medium">GDS Aggregator (Median)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* PAGE 4: FARE FORECAST */}
          {activeTab === 'fare-forecast' && (
            <div className="space-y-6">
              <div className="border-b border-slate-200/60 pb-4">
                <h2 className="text-2xl font-bold text-slate-900">Fare Forecast</h2>
                <p className="text-xs text-slate-500 mt-0.5">Forward-looking fare estimates and trajectory projections across supported domestic corridors.</p>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
                  <span className="text-[11px] font-bold uppercase text-slate-400">FORECAST FARE ({selectedRoute}) • T+5 Target</span>
                  <div className="text-4xl font-extrabold text-slate-900"><FareDisplay amount={5380} taxes={820} /></div>
                  <p className="text-xs text-slate-500">Forward expected base retail fare median across sampled airlines.</p>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
                  <span className="text-[11px] font-bold uppercase text-slate-400">CURRENT OBSERVED FARE (T-0)</span>
                  <div className="text-4xl font-extrabold text-slate-900"><FareDisplay amount={5250} taxes={740} /></div>
                  <p className="text-xs text-slate-500">Based on 5 sampled observations median.</p>
                </div>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
                <h3 className="text-sm font-bold text-slate-900">{selectedRoute} — Fare Trajectory (Observed vs Forward Estimate)</h3>
                <div className="h-40 w-full pt-2">
                  <svg className="w-full h-full" viewBox="0 0 500 90" fill="none">
                    <path d="M 0 60 Q 150 55, 300 40" stroke="#32533D" strokeWidth="2.5"/>
                    <path d="M 300 40 Q 400 25, 500 15" stroke="#f59e0b" strokeWidth="2.5" strokeDasharray="4 4"/>
                    <circle cx="300" cy="40" r="4" fill="#0f172a"/>
                    <text x="305" y="35" fill="#0f172a" fontSize="9" fontWeight="bold">T-0 Cutoff</text>
                  </svg>
                </div>
              </div>
            </div>
          )}

          {/* PAGE 5: ALERTS & SURGES */}
          {activeTab === 'alerts' && (
            <div className="space-y-6">
              <div className="border-b border-slate-200/60 pb-4">
                <h2 className="text-2xl font-bold text-slate-900">Domestic Fare Alerts & Surge Anomaly Tracker</h2>
                <p className="text-xs text-slate-500 mt-0.5">Algorithmic early-warning system capturing non-linear yield movements and capacity shortfalls.</p>
              </div>

              <div className="grid grid-cols-4 gap-4">
                <div className="bg-white p-4 rounded-xl border border-red-200 bg-red-50/20">
                  <div className="text-red-700 font-bold text-2xl">4 <span className="text-xs font-normal text-slate-500">+2 vs yday</span></div>
                  <div className="text-xs font-semibold text-slate-800 mt-1">Critical Surges</div>
                </div>
                <div className="bg-white p-4 rounded-xl border border-amber-200 bg-amber-50/20">
                  <div className="text-amber-700 font-bold text-2xl">12 <span className="text-xs font-normal text-slate-500">+5 flagged</span></div>
                  <div className="text-xs font-semibold text-slate-800 mt-1">Moderate Spikes</div>
                </div>
                <div className="bg-white p-4 rounded-xl border border-emerald-200 bg-emerald-50/20">
                  <div className="text-emerald-700 font-bold text-2xl">9 <span className="text-xs font-normal text-slate-500">-18% spread</span></div>
                  <div className="text-xs font-semibold text-slate-800 mt-1">Compression Ops</div>
                </div>
                <div className="bg-white p-4 rounded-xl border border-blue-200 bg-blue-50/20">
                  <div className="text-blue-700 font-bold text-2xl">98.4% <span className="text-xs font-normal text-slate-500">1,817 safe</span></div>
                  <div className="text-xs font-semibold text-slate-800 mt-1">Monitored Normal</div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
                <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                  <span className="font-bold text-sm text-slate-800">🔴 Critical Surge Detected: DEL → PAT (Patna)</span>
                  <span className="text-xs bg-red-100 text-red-800 px-2.5 py-1 rounded-md font-semibold">+112% Yield Surge</span>
                </div>
                <div className="grid grid-cols-3 text-xs gap-4 text-slate-600">
                  <div><span className="font-semibold text-slate-700">Underlying Catalyst:</span> Diwali / Chhath Rush Capacity Squeeze</div>
                  <div><span className="font-semibold text-slate-700">Direct Trigger Metric:</span> Aggregate Seat Factor &gt;97.2%</div>
                  <div><span className="font-semibold text-slate-700">Primary Carriers Affected:</span> IndiGo (6E 2132), SpiceJet (SG 0721)</div>
                </div>
              </div>
            </div>
          )}

          {/* PAGE 6: METHODOLOGY */}
          {activeTab === 'methodology' && (
            <div className="space-y-6">
              <div className="border-b border-slate-200/60 pb-4">
                <span className="text-[10px] uppercase font-bold text-emerald-800 bg-emerald-100 px-2.5 py-1 rounded-full">Spec v2.4 (Independent Aviation Analytics)</span>
                <h2 className="text-2xl font-bold text-slate-900 mt-2">Air Fare Index Methodology & Data Sources</h2>
                <p className="text-xs text-slate-500 mt-1">The Composite AFI provides an empirical, volume-weighted pricing barometer across India's domestic aviation network.</p>
              </div>

              <div className="grid grid-cols-4 gap-4">
                <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs">
                  <span className="text-[10px] text-slate-400 font-bold uppercase">Network Calibration</span>
                  <div className="text-2xl font-bold text-slate-900 mt-1">120 <span className="text-xs font-normal text-slate-400">Segments</span></div>
                </div>
                <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs">
                  <span className="text-[10px] text-slate-400 font-bold uppercase">Weekly Ingestion Mass</span>
                  <div className="text-2xl font-bold text-slate-900 mt-1">1.48M <span className="text-xs font-normal text-slate-400">Seats</span></div>
                </div>
                <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs">
                  <span className="text-[10px] text-slate-400 font-bold uppercase">Historical Baseline</span>
                  <div className="text-2xl font-bold text-slate-900 mt-1">5 Years</div>
                </div>
                <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs">
                  <span className="text-[10px] text-slate-400 font-bold uppercase">Sampling Frequency</span>
                  <div className="text-2xl font-bold text-slate-900 mt-1">12 min</div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-3">
                <h3 className="font-bold text-sm text-slate-900">Composite AFI Index Calculation Engine</h3>
                <p className="text-xs text-slate-600">A baseline of 100.00 was established using the rolling median of non-holiday fare filings across all 120 key domestic corridors.</p>
                <div className="bg-slate-900 text-emerald-400 p-4 rounded-xl font-mono text-xs">
                  AFI_t = 100 * [ Sum(w_i * (F_i,t / F_i,0)) ] / Sum(w_i)
                </div>
              </div>
            </div>
          )}

        </main>
      </div>

      {/* FOOTER RIBBON */}
      <footer className="bg-white/80 border-t border-slate-200 px-8 py-3 flex justify-between text-[11px] text-slate-400 shrink-0">
        <div>AeroMetric Intelligence • National Air Fare Index & Yield Dynamics Protocol</div>
        <div>DGCA Tariff Telemetry • GDS Historical Curves • SIH 2024 Demo Prototype</div>
      </footer>

    </div>
  );
}

export default App;