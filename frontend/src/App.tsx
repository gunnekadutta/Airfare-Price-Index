import { useState } from 'react';
import { FareDisplay } from './FareDisplay';

export type PageView = 'welcome' | 'overview' | 'route-analytics' | 'fare-forecast' | 'alerts' | 'methodology';

const MVP_ROUTES = [
  'DEL-BOM', 'DEL-BLR', 'DEL-HYD', 'DEL-CCU', 'DEL-MAA',
  'DEL-AMD', 'DEL-PNQ', 'DEL-GOI', 'DEL-COK', 'DEL-GAU',
  'BOM-BLR', 'BOM-HYD', 'BOM-MAA', 'BOM-CCU', 'BOM-AMD',
  'BOM-GOI', 'BLR-HYD', 'BLR-MAA', 'BLR-CCU', 'BLR-GOI',
  'BLR-COK', 'HYD-MAA', 'HYD-CCU', 'CCU-GAU', 'MAA-COK',
] as const;

type MvpRoute = typeof MVP_ROUTES[number];

type RouteObservation = {
  observation_id: string;
  collected_at: string | null;
  travel_date: string | null;
  origin: string;
  destination: string;
  route: MvpRoute;
  airline: string | null;
  flight_number: string | null;
  departure_time: string | null;
  fare_displayed: number | null;
  currency: string;
  fare_type: string | null;
  source: string | null;
  is_round_trip: boolean | null;
  taxes: number | null;
  total_fare: number | null;
};

const ROUTE_MEDIAN_FARES: Partial<Record<MvpRoute, number>> = {
  'DEL-BLR': 6120,
  'DEL-BOM': 5800,
};

const DEL_BLR_OBSERVATIONS: RouteObservation[] = [
  {
    observation_id: 'OBS-10921',
    collected_at: '15 Nov 08:12',
    travel_date: null,
    origin: 'DEL',
    destination: 'BLR',
    route: 'DEL-BLR',
    airline: 'Akasa Air',
    flight_number: 'QP-1342',
    departure_time: '07:28',
    fare_displayed: 5100,
    currency: 'INR',
    fare_type: null,
    source: 'Direct API',
    is_round_trip: false,
    taxes: 650,
    total_fare: 5750,
  },
  {
    observation_id: 'OBS-10922',
    collected_at: '15 Nov 08:15',
    travel_date: null,
    origin: 'DEL',
    destination: 'BLR',
    route: 'DEL-BLR',
    airline: 'IndiGo',
    flight_number: '6E-2131',
    departure_time: '09:45',
    fare_displayed: 5250,
    currency: 'INR',
    fare_type: null,
    source: 'GDS Aggregator',
    is_round_trip: false,
    taxes: 698,
    total_fare: 5948,
  },
  {
    observation_id: 'OBS-10923',
    collected_at: '15 Nov 08:20',
    travel_date: null,
    origin: 'DEL',
    destination: 'BLR',
    route: 'DEL-BLR',
    airline: 'IndiGo',
    flight_number: '6E-5012',
    departure_time: '14:18',
    fare_displayed: 5380,
    currency: 'INR',
    fare_type: null,
    source: 'GDS Aggregator',
    is_round_trip: false,
    taxes: 740,
    total_fare: 6120,
  },
  {
    observation_id: 'OBS-10924',
    collected_at: null,
    travel_date: null,
    origin: 'DEL',
    destination: 'BLR',
    route: 'DEL-BLR',
    airline: 'IndiGo',
    flight_number: null,
    departure_time: null,
    fare_displayed: 6200,
    currency: 'INR',
    fare_type: null,
    source: null,
    is_round_trip: null,
    taxes: null,
    total_fare: null,
  },
  {
    observation_id: 'OBS-10925',
    collected_at: null,
    travel_date: null,
    origin: 'DEL',
    destination: 'BLR',
    route: 'DEL-BLR',
    airline: 'Air India',
    flight_number: null,
    departure_time: null,
    fare_displayed: 6800,
    currency: 'INR',
    fare_type: null,
    source: null,
    is_round_trip: null,
    taxes: null,
    total_fare: null,
  },
];

type FareAlert = {
  route: MvpRoute;
  observation_id: string;
  collected_at: string | null;
  airline: string | null;
  flight_number: string | null;
  fare_displayed: number | null;
  taxes: number | null;
  total_fare: number | null;
  currency: string;
  comparable_fare: number | null;
  absolute_change: number | null;
  percentage_change: number | null;
  alert_type: 'Fare Increase' | 'Fare Decrease' | 'Unusual Fare Movement';
};

const DEL_BLR_MEDIAN = ROUTE_MEDIAN_FARES['DEL-BLR'] ?? null;

const FARE_ALERTS: FareAlert[] = [
  {
    route: 'DEL-BLR',
    observation_id: 'OBS-10925',
    collected_at: null,
    airline: 'Air India',
    flight_number: null,
    fare_displayed: 6800,
    taxes: null,
    total_fare: null,
    currency: 'INR',
    comparable_fare: DEL_BLR_MEDIAN,
    absolute_change: DEL_BLR_MEDIAN !== null ? 6800 - DEL_BLR_MEDIAN : null,
    percentage_change: DEL_BLR_MEDIAN !== null ? ((6800 - DEL_BLR_MEDIAN) / DEL_BLR_MEDIAN) * 100 : null,
    alert_type: 'Fare Increase',
  },
  {
    route: 'DEL-BLR',
    observation_id: 'OBS-10921',
    collected_at: '15 Nov 08:12',
    airline: 'Akasa Air',
    flight_number: 'QP-1342',
    fare_displayed: 5100,
    taxes: 650,
    total_fare: 5750,
    currency: 'INR',
    comparable_fare: DEL_BLR_MEDIAN,
    absolute_change: DEL_BLR_MEDIAN !== null ? 5100 - DEL_BLR_MEDIAN : null,
    percentage_change: DEL_BLR_MEDIAN !== null ? ((5100 - DEL_BLR_MEDIAN) / DEL_BLR_MEDIAN) * 100 : null,
    alert_type: 'Fare Decrease',
  },
  {
    route: 'DEL-BLR',
    observation_id: 'OBS-10922',
    collected_at: '15 Nov 08:15',
    airline: 'IndiGo',
    flight_number: '6E-2131',
    fare_displayed: 5250,
    taxes: 698,
    total_fare: 5948,
    currency: 'INR',
    comparable_fare: DEL_BLR_MEDIAN,
    absolute_change: DEL_BLR_MEDIAN !== null ? 5250 - DEL_BLR_MEDIAN : null,
    percentage_change: DEL_BLR_MEDIAN !== null ? ((5250 - DEL_BLR_MEDIAN) / DEL_BLR_MEDIAN) * 100 : null,
    alert_type: 'Fare Decrease',
  },
  {
    route: 'DEL-BLR',
    observation_id: 'OBS-10923',
    collected_at: '15 Nov 08:20',
    airline: 'IndiGo',
    flight_number: '6E-5012',
    fare_displayed: 5380,
    taxes: 740,
    total_fare: 6120,
    currency: 'INR',
    comparable_fare: DEL_BLR_MEDIAN,
    absolute_change: DEL_BLR_MEDIAN !== null ? 5380 - DEL_BLR_MEDIAN : null,
    percentage_change: DEL_BLR_MEDIAN !== null ? ((5380 - DEL_BLR_MEDIAN) / DEL_BLR_MEDIAN) * 100 : null,
    alert_type: 'Fare Decrease',
  },
];

function formatFare(value: number | null, currency = 'INR') {
  if (value === null) return 'Not available';
  if (currency === 'INR') return `₹${value.toLocaleString('en-IN')}`;
  return `${currency} ${value.toLocaleString('en-IN')}`;
}

function RouteFareBreakdown({
  fareDisplayed,
  taxes,
  totalFare,
  currency,
}: {
  fareDisplayed: number | null;
  taxes: number | null;
  totalFare: number | null;
  currency: string;
}) {
  if (fareDisplayed === null) {
    return <span className="text-[11px] italic text-slate-400/80">Not available</span>;
  }

  return (
    <div className="relative inline-block group">
      <span className="cursor-pointer font-semibold text-slate-900">
        {formatFare(fareDisplayed, currency)} <span className="text-[10px] font-normal text-slate-500">+ taxes ⓘ</span>
      </span>
      <div className="absolute left-0 top-6 z-20 w-56 rounded-lg bg-slate-900 p-3 text-[10px] text-white shadow-xl hidden group-hover:block">
        <div className="flex justify-between"><span className="text-slate-400">Fare Displayed</span><span>{formatFare(fareDisplayed, currency)}</span></div>
        <div className="flex justify-between mt-1"><span className="text-slate-400">Taxes &amp; Fees</span><span>{formatFare(taxes, currency)}</span></div>
        <div className="flex justify-between mt-2 border-t border-slate-700 pt-2 font-semibold"><span>Total Fare</span><span>{formatFare(totalFare, currency)}</span></div>
      </div>
    </div>
  );
}

export function App() {
  const [activeTab, setActiveTab] = useState<PageView>('welcome');
  const [selectedRoute, setSelectedRoute] = useState<MvpRoute>('DEL-BLR');

  const isLanding = activeTab === 'welcome';
  const selectedRouteIndex = MVP_ROUTES.indexOf(selectedRoute) + 1;
  const selectedRouteFare = ROUTE_MEDIAN_FARES[selectedRoute] ?? null;
  const selectedRouteObservations = selectedRoute === 'DEL-BLR' ? DEL_BLR_OBSERVATIONS : [];
  const [selectedOrigin, selectedDestination] = selectedRoute.split('-');

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
            <button onClick={() => setActiveTab('alerts')} className="px-3.5 py-1 rounded-full border border-dashed border-slate-300 hover:text-slate-900 transition">Fare Alerts & Anomalies</button>
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
              <span>Fare Alerts & Anomalies</span>
              <span className="bg-amber-100 text-amber-800 text-[10px] px-1.5 py-0.5 rounded-full font-bold">{FARE_ALERTS.length}</span>
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
              <span>SAMPLE MVP ROUTES</span>
              <span className="text-[10px] text-slate-500 font-normal">25 Supported</span>
            </div>
            <div className="grid grid-cols-2 gap-1 font-mono text-[11px] text-slate-600">
              <div className="bg-slate-50 p-1 rounded border border-slate-200 text-center">DEL-BOM</div>
               <div className="bg-slate-50 p-1 rounded border border-slate-200 text-center">DEL-BLR</div>
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
                          <td className="px-4 py-3 text-[11px] italic text-slate-400/80">Not available</td>
                          <td className="px-4 py-3 text-slate-500">5</td>
                          <td className="px-5 py-3 text-right font-semibold">4.0%</td>
                        </tr>
                        <tr>
                          <td className="px-5 py-3 font-mono font-semibold text-slate-900">BLR-HYD</td>
                          <td className="px-4 py-3 text-[11px] italic text-slate-400/80">Not available</td>
                          <td className="px-4 py-3 text-slate-500">5</td>
                          <td className="px-5 py-3 text-right font-semibold">4.0%</td>
                        </tr>
                        <tr>
                          <td className="px-5 py-3 font-mono font-semibold text-slate-900">MAA-COK</td>
                          <td className="px-4 py-3 text-[11px] italic text-slate-400/80">Not available</td>
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
              <div className="flex justify-between items-start border-b border-slate-200/60 pb-5">
                <div>
                  <h2 className="text-2xl font-bold text-slate-900">Route Analytics</h2>
                  <p className="text-xs text-slate-500 mt-1">Inspect observed fares, route-level pricing, and observation telemetry across supported domestic corridors.</p>
                </div>
                <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-[#32533D] bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-200 shrink-0">
                  <span className="text-emerald-600">●</span> Live Demo Active
                </span>
              </div>

              <div className="bg-white p-4 rounded-xl border border-slate-200/80 flex items-center justify-between shadow-2xs">
                <div className="flex items-center gap-4">
                  <label htmlFor="route-selector" className="text-xs font-bold text-slate-400 uppercase">Select Route:</label>
                  <select id="route-selector" value={selectedRoute} onChange={(e) => setSelectedRoute(e.target.value as MvpRoute)} className="bg-slate-50 border border-slate-300 rounded-lg px-3 py-1.5 text-xs font-bold text-slate-800 focus:outline-none focus:border-[#32533D]">
                    {MVP_ROUTES.map((route) => <option key={route} value={route}>{route}</option>)}
                  </select>
                </div>
                <span className="text-xs text-slate-500">MVP route {selectedRouteIndex} of 25</span>
              </div>

              <div className="grid grid-cols-4 gap-4">
                <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">ROUTE</span>
                  <div className="text-2xl font-extrabold text-slate-900 font-mono">{selectedRoute}</div>
                  <p className="text-xs text-slate-500">{selectedOrigin} <span className="text-slate-300">→</span> {selectedDestination}</p>
                </div>
                <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">OBSERVATION COUNT</span>
                  <div className="text-2xl font-extrabold text-slate-900">5</div>
                  <p className="text-xs text-slate-500">5 observations for the MVP route</p>
                </div>
                <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">MEDIAN ROUTE FARE</span>
                  <div className="text-2xl font-extrabold text-slate-900">
                    <RouteFareBreakdown fareDisplayed={selectedRouteFare} taxes={null} totalFare={null} currency="INR" />
                  </div>
                  <p className="text-xs text-slate-500">Median route price where available</p>
                </div>
                <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">MVP ROUTE WEIGHT</span>
                  <div className="text-2xl font-extrabold text-slate-900">4.0%</div>
                  <p className="text-xs text-slate-500">Equal weighting · 1 / 25 routes</p>
                </div>
              </div>

              <div className="bg-[#f7f8fb] rounded-2xl border border-dashed border-indigo-200 p-4 flex items-center gap-4">
                <div className="w-9 h-9 rounded-xl bg-white border border-indigo-100 flex items-center justify-center text-indigo-500 shrink-0">↗</div>
                <div>
                  <div className="text-xs font-bold text-slate-800">How this route contributes to the index</div>
                  <p className="text-[11px] text-slate-500 mt-1">5 observations <span className="text-indigo-400 mx-1">→</span> median route price <span className="text-indigo-400 mx-1">→</span> 4.0% MVP route weight</p>
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
                <div className="p-5 border-b border-slate-100 flex items-start justify-between gap-4">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">OBSERVATION TELEMETRY</span>
                    <h3 className="text-base font-bold text-slate-900 mt-1">Observation Telemetry</h3>
                    <p className="text-[11px] text-slate-500 mt-1">5 observations · 5 / 5 route observations available</p>
                  </div>
                  <span className="text-[10px] font-semibold text-[#32533D] bg-emerald-50 border border-emerald-100 px-2.5 py-1.5 rounded-lg">MVP sample set</span>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[1160px] text-left border-collapse text-xs">
                    <caption className="sr-only">Observation-level fare data for {selectedRoute}</caption>
                    <thead>
                      <tr className="border-b border-slate-200/60 text-[10px] uppercase tracking-wider text-slate-400 bg-slate-50">
                        <th className="px-4 py-3 font-bold">Observation ID</th>
                        <th className="px-4 py-3 font-bold">Collected At</th>
                        <th className="px-4 py-3 font-bold">Travel Date</th>
                        <th className="px-4 py-3 font-bold">Airline</th>
                        <th className="px-4 py-3 font-bold">Flight</th>
                        <th className="px-4 py-3 font-bold">Departure</th>
                        <th className="px-4 py-3 font-bold">Fare</th>
                        <th className="px-4 py-3 font-bold">Fare Type</th>
                        <th className="px-4 py-3 font-bold">Source</th>
                        <th className="px-4 py-3 font-bold">Round Trip</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-slate-700">
                      {selectedRouteObservations.length > 0 ? selectedRouteObservations.map((observation, index) => (
                        <tr key={observation.observation_id} className={index === 2 ? 'bg-emerald-50/40' : 'hover:bg-slate-50/70'}>
                          <td className="px-4 py-3">
                            <div className="font-mono font-semibold text-slate-900">{observation.observation_id}</div>
                            <div className="text-[10px] text-slate-400 mt-1">{observation.origin} <span className="text-slate-300">→</span> {observation.destination}</div>
                          </td>
                          <td className="px-4 py-3 text-slate-500">{observation.collected_at ?? 'Not available'}</td>
                          <td className="px-4 py-3 text-slate-500">{observation.travel_date ?? 'Not available'}</td>
                          <td className="px-4 py-3 font-medium text-slate-800">{observation.airline ?? 'Not available'}</td>
                          <td className="px-4 py-3 font-mono text-slate-600">{observation.flight_number ?? 'Not available'}</td>
                          <td className="px-4 py-3 text-slate-600">{observation.departure_time ?? 'Not available'}</td>
                          <td className="px-4 py-3"><RouteFareBreakdown fareDisplayed={observation.fare_displayed} taxes={observation.taxes} totalFare={observation.total_fare} currency={observation.currency} /></td>
                          <td className="px-4 py-3 text-slate-500">{observation.fare_type ?? 'Not available'}</td>
                          <td className="px-4 py-3">
                            <span className={observation.source ? 'font-medium text-emerald-700' : 'italic text-slate-400'}>{observation.source ?? 'Not available'}</span>
                          </td>
                          <td className="px-4 py-3 text-slate-600">{observation.is_round_trip === true ? 'Round trip' : observation.is_round_trip === false ? 'One-way' : 'Not available'}</td>
                        </tr>
                      )) : (
                        <tr>
                          <td colSpan={10} className="px-6 py-12 text-center">
                            <div className="text-sm font-semibold text-slate-700">Observation rows are not available for {selectedRoute} in the current demo set.</div>
                            <div className="text-xs text-slate-400 mt-1">The route remains part of the 25-route MVP basket and is ready for observation-level data.</div>
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
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

          {/* PAGE 5: FARE ALERTS & ANOMALIES */}
          {activeTab === 'alerts' && (
            <div className="space-y-6">
              {/* Header */}
              <div className="flex justify-between items-start border-b border-slate-200/60 pb-5">
                <div>
                  <h2 className="text-2xl font-bold text-slate-900">Fare Alerts & Anomalies</h2>
                  <p className="text-xs text-slate-500 mt-1">Monitor unusual movements in observed domestic air fares across supported corridors.</p>
                </div>
                <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-[#32533D] bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-200 shrink-0">
                  <span className="text-emerald-600">●</span> Live Demo Active
                </span>
              </div>

              {/* Summary Cards */}
              <div className="grid grid-cols-4 gap-4">
                <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">ACTIVE FARE ALERTS</span>
                  <div className="text-2xl font-extrabold text-slate-900">{FARE_ALERTS.length}</div>
                  <p className="text-xs text-slate-500">Flagged observations</p>
                </div>
                <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">ROUTES WITH UNUSUAL MOVEMENT</span>
                  <div className="text-2xl font-extrabold text-slate-900">{new Set(FARE_ALERTS.map(a => a.route)).size}</div>
                  <p className="text-xs text-slate-500">MVP corridors affected</p>
                </div>
                <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">LARGEST OBSERVED INCREASE</span>
                  <div className="text-2xl font-extrabold text-amber-600">
                    {FARE_ALERTS.filter(a => a.absolute_change !== null && a.absolute_change > 0).length > 0
                      ? `+₹${Math.max(...FARE_ALERTS.filter(a => a.absolute_change !== null && a.absolute_change > 0).map(a => a.absolute_change!)).toLocaleString('en-IN')}`
                      : 'Not available'}
                  </div>
                  <p className="text-xs text-slate-500">Vs comparable fare</p>
                </div>
                <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">LARGEST OBSERVED DECREASE</span>
                  <div className="text-2xl font-extrabold text-emerald-600">
                    {FARE_ALERTS.filter(a => a.absolute_change !== null && a.absolute_change < 0).length > 0
                      ? `-₹${Math.abs(Math.min(...FARE_ALERTS.filter(a => a.absolute_change !== null && a.absolute_change < 0).map(a => a.absolute_change!))).toLocaleString('en-IN')}`
                      : 'Not available'}
                  </div>
                  <p className="text-xs text-slate-500">Vs comparable fare</p>
                </div>
              </div>

              {/* Alerts Table */}
              <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
                <div className="p-5 border-b border-slate-100">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">OBSERVATION-LEVEL ALERTS</span>
                  <h3 className="text-base font-bold text-slate-900 mt-1">Fare Alerts & Anomalies</h3>
                  <p className="text-[11px] text-slate-500 mt-1">Derived from observed fare data compared to route-level median fares.</p>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[1100px] text-left border-collapse text-xs">
                    <thead>
                      <tr className="border-b border-slate-200/60 text-[10px] uppercase tracking-wider text-slate-400 bg-slate-50">
                        <th className="px-4 py-3 font-bold">Route</th>
                        <th className="px-4 py-3 font-bold">Observation Date/Time</th>
                        <th className="px-4 py-3 font-bold">Airline</th>
                        <th className="px-4 py-3 font-bold">Flight</th>
                        <th className="px-4 py-3 font-bold">Observed Fare</th>
                        <th className="px-4 py-3 font-bold">Comparable Fare</th>
                        <th className="px-4 py-3 font-bold">Absolute Change</th>
                        <th className="px-4 py-3 font-bold">% Change</th>
                        <th className="px-4 py-3 font-bold">Alert Type</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-slate-700">
                      {FARE_ALERTS.map((alert) => (
                        <tr key={alert.observation_id} className="hover:bg-slate-50/70">
                          <td className="px-4 py-3 font-mono font-semibold text-slate-900">{alert.route}</td>
                          <td className="px-4 py-3 text-slate-500">{alert.collected_at ?? 'Not available'}</td>
                          <td className="px-4 py-3 font-medium text-slate-800">{alert.airline ?? 'Not available'}</td>
                          <td className="px-4 py-3 font-mono text-slate-600">{alert.flight_number ?? 'Not available'}</td>
                          <td className="px-4 py-3">
                            <RouteFareBreakdown fareDisplayed={alert.fare_displayed} taxes={alert.taxes} totalFare={alert.total_fare} currency={alert.currency} />
                          </td>
                          <td className="px-4 py-3 text-slate-600 font-medium">{formatFare(alert.comparable_fare)}</td>
                          <td className="px-4 py-3 font-semibold">
                            {alert.absolute_change !== null
                              ? <span className={alert.absolute_change > 0 ? 'text-amber-600' : 'text-emerald-600'}>
                                  {alert.absolute_change > 0 ? '+' : ''}₹{alert.absolute_change.toLocaleString('en-IN')}
                                </span>
                              : <span className="text-slate-400 italic text-[11px]">Not available</span>}
                          </td>
                          <td className="px-4 py-3 font-semibold">
                            {alert.percentage_change !== null
                              ? <span className={alert.percentage_change > 0 ? 'text-amber-600' : 'text-emerald-600'}>
                                  {alert.percentage_change > 0 ? '+' : ''}{alert.percentage_change.toFixed(1)}%
                                </span>
                              : <span className="text-slate-400 italic text-[11px]">Not available</span>}
                          </td>
                          <td className="px-4 py-3">
                            <span className={`text-[10px] font-bold px-2.5 py-1 rounded-md ${
                              alert.alert_type === 'Fare Increase' ? 'bg-amber-100 text-amber-800' :
                              alert.alert_type === 'Fare Decrease' ? 'bg-emerald-100 text-emerald-800' :
                              'bg-slate-100 text-slate-700'}`}>
                              {alert.alert_type}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Context Panel */}
              <div className="bg-[#f7f8fb] rounded-2xl border border-dashed border-indigo-200 p-4 flex items-center gap-4">
                <div className="w-9 h-9 rounded-xl bg-white border border-indigo-100 flex items-center justify-center text-indigo-500 shrink-0">ⓘ</div>
                <div>
                  <div className="text-xs font-bold text-slate-800">How alerts are determined</div>
                  <p className="text-[11px] text-slate-500 mt-1">Alerts are derived from changes in observed fares relative to recent comparable route-level observations. Alert thresholds will be applied according to the backend anomaly-detection methodology.</p>
                </div>
              </div>
            </div>
          )}

          {/* PAGE 6: METHODOLOGY */}
          {activeTab === 'methodology' && (
            <div className="space-y-6">
              {/* Header */}
              <div className="border-b border-slate-200/60 pb-5">
                <span className="text-[10px] uppercase font-bold text-emerald-800 bg-emerald-100 px-2.5 py-1 rounded-full">Live Demo Methodology</span>
                <h2 className="text-2xl font-bold text-slate-900 mt-2">Air Fare Index Methodology & Data</h2>
                <p className="text-xs text-slate-500 mt-1">How observed domestic air fares are collected, aggregated, and converted into the MVP Air Fare Index.</p>
              </div>

              {/* Top Summary Cards */}
              <div className="grid grid-cols-4 gap-4">
                <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">MVP INDEX BASKET</span>
                  <div className="text-2xl font-extrabold text-slate-900">25 <span className="text-xs font-normal text-slate-400">Routes</span></div>
                  <p className="text-xs text-slate-500">Supported domestic corridors</p>
                </div>
                <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">OBSERVATIONS PER ROUTE</span>
                  <div className="text-2xl font-extrabold text-slate-900">5</div>
                  <p className="text-xs text-slate-500">Used to derive each route median</p>
                </div>
                <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">MVP OBSERVATIONS</span>
                  <div className="text-2xl font-extrabold text-slate-900">125</div>
                  <p className="text-xs text-slate-500">25 routes × 5 observations</p>
                </div>
                <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">INITIAL ROUTE WEIGHT</span>
                  <div className="text-2xl font-extrabold text-slate-900">4.0%</div>
                  <p className="text-xs text-slate-500">Equal weight per MVP route</p>
                </div>
              </div>

              {/* Methodology Pipeline */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
                <h3 className="text-sm font-bold text-slate-900">How the MVP Air Fare Index is constructed</h3>
                <div className="space-y-3">
                  {[
                    { n: '1', title: 'Collect Fare Observations', desc: 'Collect 5 fare observations for each supported MVP route.' },
                    { n: '2', title: 'Calculate Route Median', desc: 'Calculate the median observed fare for each route to reduce the effect of individual extreme observations.' },
                    { n: '3', title: 'Compare With Base Period', desc: "Compare each route's current median fare with its corresponding base-period route fare." },
                    { n: '4', title: 'Apply Route Weights', desc: 'In the current MVP, each of the 25 routes receives an equal 4.0% weight.' },
                    { n: '5', title: 'Calculate Composite AFI', desc: 'Aggregate the weighted route fare relatives into the Air Fare Index using a fixed-base Laspeyres-style approach.' },
                  ].map((step) => (
                    <div key={step.n} className="flex items-start gap-3">
                      <div className="w-7 h-7 rounded-full bg-[#32533D] text-white text-xs font-bold flex items-center justify-center shrink-0">{step.n}</div>
                      <div className="pt-0.5">
                        <div className="text-xs font-bold text-slate-900">{step.title}</div>
                        <p className="text-[11px] text-slate-500 mt-0.5">{step.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Index Formula */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
                <h3 className="text-sm font-bold text-slate-900">Index Formula</h3>
                <div className="bg-slate-900 text-emerald-400 p-4 rounded-xl font-mono text-sm text-center">
                  AFI_t = 100 × Σ [ w_i × (P_i,t / P_i,0) ]
                </div>
                <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-xs text-slate-600">
                  <div><span className="font-mono font-semibold text-slate-800">P_i,t</span> = median observed fare for route i in the current period</div>
                  <div><span className="font-mono font-semibold text-slate-800">P_i,0</span> = base-period fare for route i</div>
                  <div><span className="font-mono font-semibold text-slate-800">w_i</span> = route weight</div>
                  <div><span className="font-mono font-semibold text-slate-800">Σw_i</span> = 1</div>
                </div>
                <p className="text-[11px] text-slate-500">In the MVP, w_i = 0.04 for each of the 25 supported routes.</p>
              </div>

              {/* Observation Data */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
                <h3 className="text-sm font-bold text-slate-900">Observation Data</h3>
                <p className="text-xs text-slate-500">Route-level medians are derived from collected fare observations. The production methodology will specify which fare field is used for index calculation once the backend methodology is finalized.</p>
                <div className="grid grid-cols-4 gap-2">
                  {['observation_id','collected_at','travel_date','origin','destination','route','airline','flight_number','departure_time','fare_displayed','currency','fare_type','source','is_round_trip','taxes','total_fare'].map((field) => (
                    <div key={field} className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-[11px] font-mono text-slate-700 text-center">{field}</div>
                  ))}
                </div>
              </div>

              {/* MVP Scope vs Broader Coverage */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#32533D]">MVP INDEX BASKET</span>
                  <p className="text-xs text-slate-600">25 supported routes are currently used for the MVP index calculation.</p>
                </div>
                <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">BROADER PLATFORM COVERAGE</span>
                  <p className="text-xs text-slate-600">The platform may monitor 120+ domestic corridors as broader coverage expands. Broader monitored coverage must not be presented as part of the current 25-route MVP index basket.</p>
                </div>
              </div>

              {/* Future Weighting */}
              <div className="bg-[#f7f8fb] rounded-2xl border border-dashed border-indigo-200 p-4 flex items-start gap-4">
                <div className="w-9 h-9 rounded-xl bg-white border border-indigo-100 flex items-center justify-center text-indigo-500 shrink-0">ⓘ</div>
                <div>
                  <div className="text-xs font-bold text-slate-800">Future Weighting</div>
                  <p className="text-[11px] text-slate-500 mt-1">The MVP begins with equal route weights of 4.0%. A future production methodology may replace equal weighting with passenger-traffic-based route weights when a validated traffic dataset is integrated.</p>
                </div>
              </div>
            </div>
          )}

        </main>
      </div>

      {/* FOOTER RIBBON */}
      <footer className="bg-white/80 border-t border-slate-200 px-8 py-3 flex justify-between text-[11px] text-slate-400 shrink-0">
        <div>Air Fare Index • Domestic Aviation Fare Intelligence</div>
        <div>Live Demo • MVP Observation Dataset</div>
      </footer>

    </div>
  );
}

export default App;