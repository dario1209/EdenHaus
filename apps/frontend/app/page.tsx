'use client'

import Link from 'next/link'
import { useState } from 'react'

// Mock live match data
const liveMatches = [
    {
        id: 1,
        league: 'Premier League',
        homeTeam: 'Arsenal',
        awayTeam: 'Chelsea',
        homeScore: 2,
        awayScore: 1,
        time: '67:23',
        odds: { home: 1.45, draw: 4.20, away: 6.50 },
        overUnder: { over: 1.85, under: 1.95 },
    },
    {
        id: 2,
        league: 'La Liga',
        homeTeam: 'Real Madrid',
        awayTeam: 'Barcelona',
        homeScore: 1,
        awayScore: 1,
        time: '34:12',
        odds: { home: 2.10, draw: 3.40, away: 3.25 },
        overUnder: { over: 1.72, under: 2.10 },
    },
    {
        id: 3,
        league: 'Serie A',
        homeTeam: 'AC Milan',
        awayTeam: 'Inter Milan',
        homeScore: 0,
        awayScore: 2,
        time: '81:45',
        odds: { home: 8.50, draw: 5.00, away: 1.25 },
        overUnder: { over: 1.55, under: 2.40 },
    },
    {
        id: 4,
        league: 'Bundesliga',
        homeTeam: 'Bayern Munich',
        awayTeam: 'Dortmund',
        homeScore: 3,
        awayScore: 2,
        time: '52:08',
        odds: { home: 1.65, draw: 4.00, away: 5.25 },
        overUnder: { over: 1.40, under: 2.85 },
    },
    {
        id: 5,
        league: 'Esports - CS2',
        homeTeam: 'NaVi',
        awayTeam: 'FaZe Clan',
        homeScore: 14,
        awayScore: 12,
        time: 'Map 2',
        odds: { home: 1.35, draw: null, away: 3.10 },
        overUnder: { over: 1.90, under: 1.90 },
    },
]

const sports = [
    { icon: '⚽', name: 'Football', count: 142 },
    { icon: '🏀', name: 'Basketball', count: 38 },
    { icon: '🎮', name: 'Esports', count: 67 },
    { icon: '🎾', name: 'Tennis', count: 24 },
    { icon: '🏈', name: 'American Football', count: 12 },
    { icon: '⚾', name: 'Baseball', count: 8 },
    { icon: '🏒', name: 'Hockey', count: 16 },
    { icon: '🥊', name: 'MMA/Boxing', count: 5 },
]

export default function Home() {
    const [selectedSport, setSelectedSport] = useState('Football')
    const [betSlip, setBetSlip] = useState<Array<{ match: string; selection: string; odds: number }>>([])

    const addToBetSlip = (match: string, selection: string, odds: number) => {
        setBetSlip(prev => [...prev, { match, selection, odds }])
    }

    const removeBet = (index: number) => {
        setBetSlip(prev => prev.filter((_, i) => i !== index))
    }

    return (
        <div className="min-h-screen overflow-hidden relative">
            {/* Dreamy gradient background */}
            <div className="fixed inset-0">
                {/* Main gradient - pink to cyan */}
                <div
                    className="absolute inset-0"
                    style={{
                        background: 'linear-gradient(180deg, #FFB6C1 0%, #E0BBE4 25%, #957DAD 50%, #7EC8E3 75%, #7FE5F0 100%)'
                    }}
                />
                {/* Grid overlay */}
                <div
                    className="absolute inset-0 opacity-30"
                    style={{
                        backgroundImage: `
              linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)
            `,
                        backgroundSize: '40px 40px'
                    }}
                />
                {/* Floating clouds/sparkles */}
                <div className="absolute top-20 left-[10%] text-4xl opacity-60 animate-pulse">✦</div>
                <div className="absolute top-40 right-[15%] text-3xl opacity-50 animate-pulse" style={{ animationDelay: '1s' }}>☁️</div>
                <div className="absolute top-60 left-[25%] text-2xl opacity-40 animate-pulse" style={{ animationDelay: '0.5s' }}>✧</div>
                <div className="absolute bottom-40 right-[25%] text-3xl opacity-50 animate-pulse" style={{ animationDelay: '1.5s' }}>✦</div>
                <div className="absolute bottom-60 left-[15%] text-4xl opacity-40 animate-pulse" style={{ animationDelay: '2s' }}>☁️</div>
            </div>

            {/* Header - Retro window style */}
            <header className="relative z-10 mx-4 mt-4">
                <div
                    className="rounded-t-lg overflow-hidden"
                    style={{
                        background: 'linear-gradient(180deg, #E0BBE4 0%, #D4A5D9 100%)',
                        border: '2px solid #C9A0DC'
                    }}
                >
                    {/* Window title bar */}
                    <div
                        className="flex items-center justify-between px-3 py-1.5"
                        style={{ background: 'linear-gradient(180deg, #C9A0DC 0%, #B794C0 100%)' }}
                    >
                        <span className="text-xs font-bold text-white/90 tracking-wide">MICROBETS.EXE</span>
                        <div className="flex gap-1">
                            <div className="w-3 h-3 rounded-sm bg-white/40 flex items-center justify-center text-[8px]">−</div>
                            <div className="w-3 h-3 rounded-sm bg-white/40 flex items-center justify-center text-[8px]">□</div>
                            <div className="w-3 h-3 rounded-sm bg-pink-300 flex items-center justify-center text-[8px]">×</div>
                        </div>
                    </div>
                    {/* Main header content */}
                    <div className="flex items-center justify-between px-4 py-3 bg-white/80 backdrop-blur-sm">
                        <div className="flex items-center gap-6">
                            <Link href="/" className="flex items-center gap-2 group">
                                <div
                                    className="w-9 h-9 rounded-lg flex items-center justify-center text-lg font-black text-white"
                                    style={{
                                        background: 'linear-gradient(135deg, #FF6B9D, #C44569)',
                                        boxShadow: '0 2px 10px rgba(196, 69, 105, 0.3)'
                                    }}
                                >
                                    μ
                                </div>
                                <span className="text-lg font-black tracking-tight">
                                    <span style={{ color: '#C44569' }}>MICRO</span>
                                    <span style={{ color: '#957DAD' }}>BETS</span>
                                </span>
                            </Link>
                            <nav className="hidden md:flex items-center gap-1">
                                {['Live', 'Sports', 'Esports', 'Casino'].map((item, i) => (
                                    <Link
                                        key={item}
                                        href={item === 'Live' ? '/' : `/${item.toLowerCase()}`}
                                        className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-all ${i === 0
                                            ? 'text-white'
                                            : 'text-purple-400 hover:text-purple-600 hover:bg-purple-100'
                                            }`}
                                        style={i === 0 ? {
                                            background: 'linear-gradient(135deg, #FF6B9D, #C44569)',
                                            boxShadow: '0 2px 8px rgba(196, 69, 105, 0.25)'
                                        } : {}}
                                    >
                                        {i === 0 && <span className="inline-block w-1.5 h-1.5 bg-white rounded-full mr-1.5 animate-pulse" />}
                                        {item}
                                    </Link>
                                ))}
                            </nav>
                        </div>
                        <div className="flex items-center gap-2">
                            <button
                                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-all"
                                style={{ background: '#E0BBE4', color: '#6B4C7A' }}
                            >
                                <span>🔍</span>
                                Search
                            </button>
                            <button
                                className="px-4 py-2 rounded-full text-sm font-bold text-white transition-all hover:scale-105"
                                style={{
                                    background: 'linear-gradient(135deg, #7EC8E3, #5BA4C9)',
                                    boxShadow: '0 2px 10px rgba(126, 200, 227, 0.35)'
                                }}
                            >
                                Connect Wallet
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            <div className="relative z-10 flex px-4 pb-4">
                {/* Sidebar */}
                <aside className="hidden lg:block w-20 mr-4 mt-4">
                    <div
                        className="rounded-lg overflow-hidden"
                        style={{
                            background: 'rgba(255,255,255,0.85)',
                            border: '2px solid #E0BBE4',
                            backdropFilter: 'blur(10px)'
                        }}
                    >
                        <div
                            className="px-2 py-1 text-[10px] font-bold text-center text-white"
                            style={{ background: 'linear-gradient(180deg, #C9A0DC 0%, #B794C0 100%)' }}
                        >
                            SPORTS
                        </div>
                        <div className="flex flex-col items-center py-2 gap-1">
                            {sports.map((sport) => (
                                <button
                                    key={sport.name}
                                    onClick={() => setSelectedSport(sport.name)}
                                    className={`group relative w-12 h-12 rounded-lg flex flex-col items-center justify-center transition-all ${selectedSport === sport.name
                                        ? 'bg-gradient-to-br from-pink-200 to-purple-200'
                                        : 'hover:bg-purple-50'
                                        }`}
                                >
                                    <span className="text-xl">{sport.icon}</span>
                                    <span
                                        className="absolute -top-1 -right-1 w-4 h-4 rounded-full text-[9px] font-bold flex items-center justify-center text-white"
                                        style={{ background: '#FF6B9D' }}
                                    >
                                        {sport.count > 99 ? '99' : sport.count}
                                    </span>
                                    {/* Tooltip */}
                                    <div
                                        className="absolute left-full ml-2 px-2 py-1 rounded text-[10px] font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-50 text-white"
                                        style={{ background: '#957DAD' }}
                                    >
                                        {sport.name}
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>
                </aside>

                {/* Main Content */}
                <main className="flex-1 mt-4 space-y-4">
                    {/* Hero Banner - Window style */}
                    <div
                        className="rounded-lg overflow-hidden"
                        style={{
                            border: '2px solid #7EC8E3'
                        }}
                    >
                        {/* Window title bar */}
                        <div
                            className="flex items-center justify-between px-3 py-1.5"
                            style={{ background: 'linear-gradient(180deg, #7EC8E3 0%, #5BA4C9 100%)' }}
                        >
                            <span className="text-xs font-bold text-white/90 tracking-wide">✦ WELCOME.AVI</span>
                            <div className="flex gap-1">
                                <div className="w-3 h-3 rounded-sm bg-white/40"></div>
                                <div className="w-3 h-3 rounded-sm bg-white/40"></div>
                                <div className="w-3 h-3 rounded-sm bg-pink-300"></div>
                            </div>
                        </div>
                        <div
                            className="relative p-6 md:p-10"
                            style={{
                                background: 'linear-gradient(135deg, #FFE4EC 0%, #E8D5E0 50%, #D4E7ED 100%)'
                            }}
                        >
                            {/* Decorative elements */}
                            <div className="absolute top-4 right-4 text-5xl opacity-30">🌙</div>
                            <div className="absolute bottom-4 right-20 text-3xl opacity-20">✦</div>

                            <div className="max-w-2xl">
                                <div
                                    className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold mb-4"
                                    style={{ background: 'rgba(255,107,157,0.2)', color: '#C44569' }}
                                >
                                    <span className="w-1.5 h-1.5 bg-pink-400 rounded-full animate-pulse" />
                                    NEW SEASON
                                </div>
                                <h1
                                    className="text-4xl md:text-5xl font-black mb-4 leading-tight"
                                    style={{ color: '#6B4C7A' }}
                                >
                                    Micro-Bets Live
                                </h1>
                                <p className="text-base mb-6 max-w-xl" style={{ color: '#8B7A94' }}>
                                    x402 payments + Chainlink oracles on Cronos. Bet on every point, kill, corner.
                                    <span style={{ color: '#C44569' }} className="font-semibold"> Sub-second settlement.</span>
                                </p>
                                <div className="flex flex-wrap gap-3">
                                    <Link
                                        href="/live"
                                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-bold text-white shadow-lg hover:scale-105 transition-all"
                                        style={{
                                            background: 'linear-gradient(135deg, #FF6B9D, #C44569)',
                                            boxShadow: '0 4px 15px rgba(196, 69, 105, 0.3)'
                                        }}
                                    >
                                        <span>⚡</span>
                                        Enter Live Arena
                                    </Link>
                                    <button
                                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-semibold transition-all hover:bg-purple-100"
                                        style={{ background: 'white', color: '#957DAD', border: '2px solid #E0BBE4' }}
                                    >
                                        How It Works
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Feature Pills */}
                    <div className="flex flex-wrap gap-3">
                        {[
                            { icon: '⚡', label: '402 Tickets', desc: 'HTTP 402 Payments', color: '#FF6B9D' },
                            { icon: '🔗', label: 'Chainlink', desc: 'Oracle Settlement', color: '#7EC8E3' },
                            { icon: '⚫', label: 'Cronos', desc: 'Sub-second Blocks', color: '#957DAD' },
                        ].map((feature) => (
                            <div
                                key={feature.label}
                                className="flex items-center gap-3 px-4 py-2.5 rounded-full transition-all hover:scale-105"
                                style={{
                                    background: 'rgba(255,255,255,0.85)',
                                    border: '2px solid #E0BBE4',
                                    backdropFilter: 'blur(10px)'
                                }}
                            >
                                <div
                                    className="w-8 h-8 rounded-full flex items-center justify-center text-sm"
                                    style={{ background: `${feature.color}20` }}
                                >
                                    {feature.icon}
                                </div>
                                <div>
                                    <div className="text-sm font-bold" style={{ color: '#6B4C7A' }}>{feature.label}</div>
                                    <div className="text-xs" style={{ color: '#957DAD' }}>{feature.desc}</div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Live Matches Section - Window style */}
                    <div
                        className="rounded-lg overflow-hidden"
                        style={{ border: '2px solid #E0BBE4' }}
                    >
                        {/* Window title bar */}
                        <div
                            className="flex items-center justify-between px-3 py-1.5"
                            style={{ background: 'linear-gradient(180deg, #E0BBE4 0%, #C9A0DC 100%)' }}
                        >
                            <div className="flex items-center gap-2">
                                <span className="text-xs font-bold text-white/90 tracking-wide">LIVE_MATCHES.DAT</span>
                                <span
                                    className="flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold text-white"
                                    style={{ background: '#FF6B9D' }}
                                >
                                    <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
                                    {liveMatches.length} LIVE
                                </span>
                            </div>
                            <div className="flex gap-1">
                                <div className="w-3 h-3 rounded-sm bg-white/40"></div>
                                <div className="w-3 h-3 rounded-sm bg-white/40"></div>
                                <div className="w-3 h-3 rounded-sm bg-pink-300"></div>
                            </div>
                        </div>

                        {/* Table content */}
                        <div style={{ background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(10px)' }}>
                            {/* Table Header */}
                            <div
                                className="grid grid-cols-12 gap-4 px-4 py-2 text-xs font-bold uppercase tracking-wider"
                                style={{ background: '#F8E8F8', color: '#957DAD' }}
                            >
                                <div className="col-span-5">Match</div>
                                <div className="col-span-3 text-center">Result (1 X 2)</div>
                                <div className="col-span-2 text-center">O/U 2.5</div>
                                <div className="col-span-2 text-center">Time</div>
                            </div>

                            {/* Match Rows */}
                            {liveMatches.map((match, index) => (
                                <div
                                    key={match.id}
                                    className={`grid grid-cols-12 gap-4 px-4 py-3 items-center transition-colors hover:bg-pink-50 ${index !== liveMatches.length - 1 ? 'border-b border-purple-100' : ''
                                        }`}
                                >
                                    {/* Match Info */}
                                    <div className="col-span-5">
                                        <div
                                            className="text-[10px] font-bold uppercase tracking-wider mb-1"
                                            style={{ color: '#FF6B9D' }}
                                        >
                                            {match.league}
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center justify-between gap-2">
                                                    <span className="font-semibold truncate" style={{ color: '#6B4C7A' }}>{match.homeTeam}</span>
                                                    <span
                                                        className="text-xl font-black"
                                                        style={{ color: '#7EC8E3' }}
                                                    >
                                                        {match.homeScore}
                                                    </span>
                                                </div>
                                                <div className="flex items-center justify-between gap-2 mt-0.5">
                                                    <span className="font-semibold truncate" style={{ color: '#6B4C7A' }}>{match.awayTeam}</span>
                                                    <span
                                                        className="text-xl font-black"
                                                        style={{ color: '#FF6B9D' }}
                                                    >
                                                        {match.awayScore}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* 1X2 Odds */}
                                    <div className="col-span-3 flex justify-center gap-1.5">
                                        {[
                                            { label: '1', value: match.odds.home },
                                            { label: 'X', value: match.odds.draw },
                                            { label: '2', value: match.odds.away },
                                        ].filter((odd): odd is { label: string; value: number } => odd.value !== null)
                                            .map((odd) => (
                                                <button
                                                    key={odd.label}
                                                    onClick={() => addToBetSlip(
                                                        `${match.homeTeam} vs ${match.awayTeam}`,
                                                        odd.label === '1' ? match.homeTeam : odd.label === '2' ? match.awayTeam : 'Draw',
                                                        odd.value
                                                    )}
                                                    className="group px-2.5 py-1.5 rounded-lg transition-all hover:scale-105 min-w-[48px]"
                                                    style={{
                                                        background: '#F8E8F8',
                                                        border: '2px solid #E0BBE4'
                                                    }}
                                                >
                                                    <div className="text-[9px] font-medium" style={{ color: '#957DAD' }}>{odd.label}</div>
                                                    <div
                                                        className="text-sm font-bold"
                                                        style={{ color: '#C44569' }}
                                                    >
                                                        {odd.value.toFixed(2)}
                                                    </div>
                                                </button>
                                            ))}
                                    </div>

                                    {/* Over/Under */}
                                    <div className="col-span-2 flex justify-center gap-1.5">
                                        <button
                                            onClick={() => addToBetSlip(`${match.homeTeam} vs ${match.awayTeam}`, 'Over 2.5', match.overUnder.over)}
                                            className="px-2 py-1.5 rounded-lg transition-all hover:scale-105"
                                            style={{ background: '#E8F4F8', border: '2px solid #7EC8E3' }}
                                        >
                                            <div className="text-[9px]" style={{ color: '#5BA4C9' }}>O</div>
                                            <div className="text-sm font-bold" style={{ color: '#5BA4C9' }}>{match.overUnder.over.toFixed(2)}</div>
                                        </button>
                                        <button
                                            onClick={() => addToBetSlip(`${match.homeTeam} vs ${match.awayTeam}`, 'Under 2.5', match.overUnder.under)}
                                            className="px-2 py-1.5 rounded-lg transition-all hover:scale-105"
                                            style={{ background: '#FFE8EE', border: '2px solid #FF6B9D' }}
                                        >
                                            <div className="text-[9px]" style={{ color: '#C44569' }}>U</div>
                                            <div className="text-sm font-bold" style={{ color: '#C44569' }}>{match.overUnder.under.toFixed(2)}</div>
                                        </button>
                                    </div>

                                    {/* Time */}
                                    <div className="col-span-2 text-center">
                                        <div
                                            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full"
                                            style={{ background: '#E8F4F8' }}
                                        >
                                            <span
                                                className="w-1.5 h-1.5 rounded-full animate-pulse"
                                                style={{ background: '#7EC8E3' }}
                                            />
                                            <span
                                                className="text-xs font-bold"
                                                style={{ color: '#5BA4C9' }}
                                            >
                                                {match.time}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Stats Row */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        {[
                            { label: 'Total Volume', value: '$2.4M', change: '+12%', color: '#7EC8E3' },
                            { label: 'Active Bets', value: '8,432', change: '+5%', color: '#FF6B9D' },
                            { label: 'Avg Settlement', value: '0.8s', change: '-15%', color: '#957DAD' },
                            { label: 'Oracle Updates', value: '1.2K/min', change: '', color: '#C44569' },
                        ].map((stat) => (
                            <div
                                key={stat.label}
                                className="p-4 rounded-lg transition-all hover:scale-105"
                                style={{
                                    background: 'rgba(255,255,255,0.85)',
                                    border: '2px solid #E0BBE4',
                                    backdropFilter: 'blur(10px)'
                                }}
                            >
                                <div className="text-xs font-medium mb-1" style={{ color: '#957DAD' }}>{stat.label}</div>
                                <div className="text-2xl font-black" style={{ color: stat.color }}>{stat.value}</div>
                                {stat.change && (
                                    <div className="text-xs font-semibold" style={{ color: '#7EC8E3' }}>
                                        {stat.change} this week
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </main>

                {/* Bet Slip Sidebar */}
                <aside className="hidden xl:block w-72 ml-4 mt-4">
                    <div
                        className="rounded-lg overflow-hidden sticky top-4"
                        style={{ border: '2px solid #FF6B9D' }}
                    >
                        {/* Window title bar */}
                        <div
                            className="flex items-center justify-between px-3 py-1.5"
                            style={{ background: 'linear-gradient(180deg, #FF6B9D 0%, #C44569 100%)' }}
                        >
                            <span className="text-xs font-bold text-white/90 tracking-wide">BET_SLIP.EXE</span>
                            <span
                                className="w-5 h-5 rounded-full text-[10px] font-bold flex items-center justify-center bg-white"
                                style={{ color: '#C44569' }}
                            >
                                {betSlip.length}
                            </span>
                        </div>

                        <div style={{ background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(10px)' }}>
                            <div className="p-3">
                                {betSlip.length === 0 ? (
                                    <div className="text-center py-8">
                                        <div className="text-4xl mb-2 opacity-50">🎫</div>
                                        <div className="text-sm" style={{ color: '#957DAD' }}>Click odds to add bets</div>
                                    </div>
                                ) : (
                                    <div className="space-y-2">
                                        {betSlip.map((bet, index) => (
                                            <div
                                                key={index}
                                                className="p-2.5 rounded-lg"
                                                style={{ background: '#F8E8F8', border: '1px solid #E0BBE4' }}
                                            >
                                                <div className="flex items-start justify-between gap-2">
                                                    <div className="flex-1 min-w-0">
                                                        <div className="text-[10px] truncate" style={{ color: '#957DAD' }}>{bet.match}</div>
                                                        <div className="font-semibold text-sm" style={{ color: '#6B4C7A' }}>{bet.selection}</div>
                                                    </div>
                                                    <button
                                                        onClick={() => removeBet(index)}
                                                        className="text-purple-300 hover:text-pink-400 transition-colors text-sm"
                                                    >
                                                        ✕
                                                    </button>
                                                </div>
                                                <div
                                                    className="mt-1.5 text-lg font-bold"
                                                    style={{ color: '#C44569' }}
                                                >
                                                    {bet.odds.toFixed(2)}
                                                </div>
                                            </div>
                                        ))}

                                        <div className="pt-2 border-t border-purple-100">
                                            <div className="flex items-center justify-between text-sm mb-2">
                                                <span style={{ color: '#957DAD' }}>Total Odds</span>
                                                <span
                                                    className="font-bold"
                                                    style={{ color: '#C44569' }}
                                                >
                                                    {betSlip.reduce((acc, bet) => acc * bet.odds, 1).toFixed(2)}
                                                </span>
                                            </div>
                                            <input
                                                type="number"
                                                placeholder="Stake (CRO)"
                                                className="w-full px-3 py-2 rounded-lg text-sm outline-none"
                                                style={{
                                                    background: '#F8E8F8',
                                                    border: '2px solid #E0BBE4',
                                                    color: '#6B4C7A'
                                                }}
                                                defaultValue="0.01"
                                                step="0.01"
                                                min="0.01"
                                            />
                                            <button
                                                className="w-full mt-2 py-3 rounded-lg font-bold text-white transition-all hover:scale-[1.02]"
                                                style={{
                                                    background: 'linear-gradient(135deg, #FF6B9D, #C44569)',
                                                    boxShadow: '0 4px 15px rgba(196, 69, 105, 0.3)'
                                                }}
                                            >
                                                Place Bet ⚡
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </aside>
            </div>
        </div>
    )
}