"use client"

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { useAccount } from 'wagmi'

// Mock data - replace with TanStack Query later
const esports = [
    {
        icon: '🔫',
        name: 'CS2',
        count: 67
    },
    {
        icon: '🎮',
        name: 'League of Legends',
        count: 45
    },
    {
        icon: '⚔️',
        name: 'Dota 2',
        count: 32
    },
    {
        icon: '🏹',
        name: 'Valorant',
        count: 28
    },
    {
        icon: '🦎',
        name: 'Rocket League',
        count: 19
    },
]

const esportsMatches = [
    {
        id: 1,
        league: 'BLAST Premier',
        homeTeam: 'NaVi',
        awayTeam: 'FaZe Clan',
        homeScore: 14,
        awayScore: 12,
        time: 'Map 2',
        odds: { home: 1.35, draw: null, away: 3.10 },
        overUnder: { over: 1.90, under: 1.90 }
    },
    {
        id: 2,
        league: 'LCS Winter',
        homeTeam: 'Cloud9',
        awayTeam: 'Team Liquid',
        homeScore: 1,
        awayScore: 0,
        time: '23:45',
        odds: { home: 2.25, draw: null, away: 1.65 },
        overUnder: { over: 1.85, under: 1.95 }
    },
    {
        id: 3,
        league: 'DPC SA',
        homeTeam: 'Evil Geniuses',
        awayTeam: 'Team Liquid',
        homeScore: 28,
        awayScore: 25,
        time: '38:12',
        odds: { home: 1.80, draw: null, away: 2.00 },
        overUnder: { over: 1.75, under: 2.05 }
    },
    {
        id: 4,
        league: 'VCT Americas',
        homeTeam: 'Sentinels',
        awayTeam: '100 Thieves',
        homeScore: 8,
        awayScore: 6,
        time: 'Round 12',
        odds: { home: 1.95, draw: null, away: 1.85 },
        overUnder: { over: 1.88, under: 1.92 }
    }
]

export default function EsportsPage() {
    const pathname = usePathname()
    const [selectedEsport, setSelectedEsport] = useState('CS2')
    const [betSlip, setBetSlip] = useState<{ match: string, selection: string, odds: number }[]>([])
    const { isConnected } = useAccount()

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
                {/* Main gradient - neon cyberpunk */}
                <div
                    className="absolute inset-0"
                    style={{
                        background: 'linear-gradient(180deg, #1A1B41 0%, #2D1B69 25%, #5A189A 50%, #9D4EDD 75%, #C77DFF 100%)'
                    }}
                />
                {/* Cyber grid overlay */}
                <div
                    className="absolute inset-0 opacity-20"
                    style={{
                        backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
                        backgroundSize: '50px 50px'
                    }}
                />
                {/* Neon particles */}
                <div className="absolute top-20 left-10 text-4xl opacity-40 animate-pulse">⚡️</div>
                <div className="absolute top-40 right-15 text-3xl opacity-30 animate-pulse" style={{ animationDelay: '1s' }}>💻</div>
                <div className="absolute top-60 left-25 text-2xl opacity-50 animate-pulse" style={{ animationDelay: '0.5s' }}>🎮</div>
                <div className="absolute bottom-40 right-25 text-3xl opacity-40 animate-pulse" style={{ animationDelay: '1.5s' }}>🌐</div>
                <div className="absolute bottom-60 left-15 text-4xl opacity-30 animate-pulse" style={{ animationDelay: '2s' }}>⚡️</div>
            </div>

            {/* Header - Cyberpunk window style */}
            <header className="relative z-10 mx-4 mt-4">
                <div className="rounded-t-lg overflow-hidden" style={{ background: 'linear-gradient(180deg, #5A189A 0%, #3D1B73 100%)', border: '2px solid #9D4EDD' }}>
                    {/* Window title bar */}
                    <div className="flex items-center justify-between px-3 py-1.5" style={{ background: 'linear-gradient(180deg, #9D4EDD 0%, #7B2CBF 100%)' }}>
                        <span className="text-xs font-bold text-white/90 tracking-wide">ESPORTS.EXE</span>
                        <div className="flex gap-1">
                            <div className="w-3 h-3 rounded-sm bg-white/40"></div>
                            <div className="w-3 h-3 rounded-sm bg-white/40"></div>
                            <div className="w-3 h-3 rounded-sm bg-purple-300"></div>
                        </div>
                    </div>

                    {/* Main header content */}
                    <div className="flex items-center justify-between px-4 py-3 bg-white/10 backdrop-blur-sm border-b border-purple-500/30">
                        <div className="flex items-center gap-2">
                            <Link href="/" className="flex items-center gap-2 group">
                                <div className="w-9 h-9 rounded-lg flex items-center justify-center text-lg font-black text-white"
                                    style={{
                                        background: 'linear-gradient(135deg, #C77DFF, #9D4EDD)',
                                        boxShadow: '0 2px 10px rgba(157, 78, 221, 0.4)'
                                    }}>
                                    E
                                </div>
                                <span className="text-lg font-black tracking-tight">
                                    <span style={{ color: '#C77DFF' }}>ESPORTS</span>
                                    <span style={{ color: '#9D4EDD' }}> HUB</span>
                                </span>
                            </Link>
                        </div>

                        {/* Navigation - Esports active */}
                        <nav className="hidden md:flex items-center gap-1">
                            {[
                                { name: 'Live', href: '/live' },
                                { name: 'Sports', href: '/sports' },
                                { name: 'Esports', href: '/esports' },
                                { name: 'Casino', href: '/casino' }
                            ].map(({ name, href }, i) => (
                                <Link
                                    key={name}
                                    ref={href}
                                    className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-all ${pathname === href
                                        ? 'text-purple-300 hover:text-purple-400 hover:bg-purple-900/50'
                                        : 'text-slate-300 hover:text-purple-400 hover:bg-purple-900/30'} ${i === 2 ? 'bg-gradient-to-r from-purple-500 to-purple-600 text-white shadow-lg shadow-purple-500/30 mr-1.5' : ''}`}
                                    style={i === 2 && pathname === href
                                        ? { background: 'linear-gradient(135deg, #C77DFF, #9D4EDD)', boxShadow: '0 2px 8px rgba(199, 127, 255, 0.3)' }
                                        : {}} href={'/'}                >
                                    {i === 2 && pathname === href && <span className="inline-block w-1.5 h-1.5 bg-white rounded-full mr-1.5 animate-pulse" />}
                                    {name}
                                </Link>
                            ))}
                        </nav>

                        <div className="flex items-center gap-2">
                            <button className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-all hover:scale-105"
                                style={{ background: 'rgba(255,255,255,0.1)', color: '#D1D5DB', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.2)' }}>
                                <span>🔍</span>
                                <span>Search</span>
                            </button>
                            <button className="px-4 py-2 rounded-full text-sm font-bold text-white transition-all hover:scale-105"
                                style={{
                                    background: 'linear-gradient(135deg, #00F5FF, #0099CC)',
                                    boxShadow: '0 2px 10px rgba(0, 245, 255, 0.4)'
                                }}>
                                Connect Wallet
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            <div className="relative z-10 flex px-4 pb-4">
                {/* Esports Sidebar */}
                <aside className="hidden lg:block w-20 mr-4 mt-4">
                    <div className="rounded-lg overflow-hidden"
                        style={{
                            background: 'rgba(255,255,255,0.1)',
                            border: '2px solid #9D4EDD',
                            backdropFilter: 'blur(10px)'
                        }}>
                        <div className="px-2 py-1 text-[10px] font-bold text-center text-white"
                            style={{ background: 'linear-gradient(180deg, #9D4EDD 0%, #7B2CBF 100%)' }}>
                            ESPORTS
                        </div>
                        <div className="flex flex-col items-center py-2 gap-1">
                            {esports.map(esport => (
                                <button
                                    key={esport.name}
                                    onClick={() => setSelectedEsport(esport.name)}
                                    className={`group relative w-12 h-12 rounded-lg flex flex-col items-center justify-center transition-all ${selectedEsport === esport.name ? 'bg-gradient-to-br from-purple-500/30 to-indigo-500/30 hover:bg-indigo-500/20' : 'hover:bg-purple-500/20'
                                        }`}
                                >
                                    <span className="text-xl">{esport.icon}</span>
                                    <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full text-[9px] font-bold flex items-center justify-center text-white"
                                        style={{ background: 'linear-gradient(to right, #C77DFF, #FF6B9D)' }}>
                                        {esport.count > 99 ? '99+' : esport.count}
                                    </span>
                                    <div className="absolute left-full ml-2 px-2 py-1 rounded text-[10px] font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-50 text-white bg-purple-600 shadow-lg">
                                        {esport.name}
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>
                </aside>

                {/* Main Content */}
                <main className="flex-1 mt-4 space-y-4">
                    {/* Live Matches Window */}
                    <div className="rounded-lg overflow-hidden" style={{ border: '2px solid #9D4EDD' }}>
                        {/* Window title bar */}
                        <div className="flex items-center justify-between px-3 py-1.5" style={{ background: 'linear-gradient(180deg, #9D4EDD 0%, #7B2CBF 100%)' }}>
                            <div className="flex items-center gap-2">
                                <span className="text-xs font-bold text-white/90 tracking-wide">ESPORTSMATCHES.DAT</span>
                                <span className="flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold text-white" style={{ background: 'linear-gradient(to right, #C77DFF, #FF6B9D)' }}>
                                    <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
                                    <span>{esportsMatches.length}</span> LIVE
                                </span>
                            </div>
                            <div className="flex gap-1">
                                <div className="w-3 h-3 rounded-sm bg-white/40"></div>
                                <div className="w-3 h-3 rounded-sm bg-white/40"></div>
                                <div className="w-3 h-3 rounded-sm bg-purple-300"></div>
                            </div>
                        </div>

                        {/* Matches table */}
                        <div style={{ background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)' }}>
                            {/* Table header */}
                            <div className="grid grid-cols-12 gap-4 px-4 py-2 text-xs font-bold uppercase tracking-wider" style={{ background: 'rgba(157, 78, 221, 0.2)', color: '#E0E7FF' }}>
                                <div className="col-span-5">Match</div>
                                <div className="col-span-3 text-center">1 X 2</div>
                                <div className="col-span-2 text-center">O/U</div>
                                <div className="col-span-2 text-center">Time</div>
                            </div>

                            {/* Matches rows */}
                            {esportsMatches.map((match, index) => (
                                <div
                                    key={match.id}
                                    className={`grid grid-cols-12 gap-4 px-4 py-3 items-center transition-all hover:bg-purple-500/10 ${index !== esportsMatches.length - 1 ? 'border-b border-purple-500/20' : ''
                                        }`}
                                >
                                    {/* Match info */}
                                    <div className="col-span-5">
                                        <div className="text-[10px] font-bold uppercase tracking-wider mb-1" style={{ color: '#C77DFF' }}>
                                            {match.league}
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center justify-between gap-2">
                                                    <span className="font-semibold truncate" style={{ color: '#E0E7FF' }}>
                                                        {match.homeTeam}
                                                    </span>
                                                    <span className="text-xl font-black" style={{ color: '#00F5FF' }}>
                                                        {match.homeScore}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="flex items-center justify-between gap-2 mt-0.5">
                                                <span className="font-semibold truncate" style={{ color: '#E0E7FF' }}>
                                                    {match.awayTeam}
                                                </span>
                                                <span className="text-xl font-black" style={{ color: '#FF6B9D' }}>
                                                    {match.awayScore}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* 1X2 Odds */}
                                    <div className="col-span-3 flex justify-center gap-1.5">
                                        {[
                                            { label: '1', value: match.odds.home },
                                            { label: 'X', value: match.odds.draw },
                                            { label: '2', value: match.odds.away }
                                        ].filter(odd => odd.value !== null).map(odd => (
                                            <button
                                                key={odd.label}
                                                onClick={() => addToBetSlip(
                                                    `${match.homeTeam} vs ${match.awayTeam}`,
                                                    odd.label === '1' ? match.homeTeam : odd.label === '2' ? match.awayTeam : 'Map Draw',
                                                    odd.value!
                                                )}
                                                className="group px-2.5 py-1.5 rounded-lg transition-all hover:scale-105 min-w-[48px] backdrop-blur-sm"
                                                style={{
                                                    background: 'rgba(255,255,255,0.1)',
                                                    border: '2px solid rgba(199, 127, 255, 0.3)'
                                                }}
                                            >
                                                <div className="text-[9px] font-medium" style={{ color: '#D1D5DB' }}>
                                                    {odd.label}
                                                </div>
                                                <div className="text-sm font-bold" style={{ color: '#FFFFFF' }}>
                                                    {odd.value!.toFixed(2)}
                                                </div>
                                            </button>
                                        ))}
                                    </div>

                                    {/* Over/Under */}
                                    <div className="col-span-2 flex justify-center gap-1.5">
                                        <button
                                            onClick={() => addToBetSlip(`${match.homeTeam} vs ${match.awayTeam}`, 'Over', match.overUnder.over)}
                                            className="px-2 py-1.5 rounded-lg transition-all hover:scale-105 backdrop-blur-sm"
                                            style={{ background: 'rgba(0, 245, 255, 0.2)', border: '2px solid #00F5FF' }}
                                        >
                                            <div className="text-[9px]" style={{ color: '#00F5FF' }}>O</div>
                                            <div className="text-sm font-bold" style={{ color: '#00F5FF' }}>
                                                {match.overUnder.over.toFixed(2)}
                                            </div>
                                        </button>
                                        <button
                                            onClick={() => addToBetSlip(`${match.homeTeam} vs ${match.awayTeam}`, 'Under', match.overUnder.under)}
                                            className="px-2 py-1.5 rounded-lg transition-all hover:scale-105 backdrop-blur-sm"
                                            style={{ background: 'rgba(255, 107, 157, 0.2)', border: '2px solid #FF6B9D' }}
                                        >
                                            <div className="text-[9px]" style={{ color: '#FF6B9D' }}>U</div>
                                            <div className="text-sm font-bold" style={{ color: '#FF6B9D' }}>
                                                {match.overUnder.under.toFixed(2)}
                                            </div>
                                        </button>
                                    </div>

                                    {/* Time */}
                                    <div className="col-span-2 text-center">
                                        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full backdrop-blur-sm" style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)' }}>
                                            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: 'linear-gradient(to right, #00F5FF, #FF6B9D)' }} />
                                            <span className="text-xs font-bold" style={{ color: '#00F5FF' }}>
                                                {match.time}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Esports Stats */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        {[
                            { label: 'Tournament Prize', value: '$1.2M', change: '+28%', color: '#C77DFF' },
                            { label: 'Live Viewers', value: '247K', change: '+15%', color: '#00F5FF' },
                            { label: 'Avg Bet Size', value: '$42', change: '+8%', color: '#9D4EDD' },
                            { label: 'Settlement Time', value: '0.3s', change: '-22%', color: '#FF6B9D' },
                        ].map((stat) => (
                            <div
                                key={stat.label}
                                className="p-4 rounded-lg transition-all hover:scale-105 backdrop-blur-sm"
                                style={{
                                    background: 'rgba(255,255,255,0.1)',
                                    border: `2px solid ${stat.color}20`,
                                    boxShadow: `0 4px 15px ${stat.color}20`
                                }}
                            >
                                <div className="text-xs font-medium mb-1" style={{ color: '#D1D5DB' }}>
                                    {stat.label}
                                </div>
                                <div className="text-2xl font-black" style={{ color: stat.color }}>
                                    {stat.value}
                                </div>
                                {stat.change && (
                                    <div className="text-xs font-semibold mt-1" style={{ color: '#A78BFA' }}>
                                        {stat.change} today
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </main>

                {/* BetSlip Sidebar */}
                <aside className="hidden xl:block w-72 ml-4 mt-4">
                    <div className="rounded-lg overflow-hidden sticky top-4" style={{ border: '2px solid #00F5FF' }}>
                        {/* Window title bar */}
                        <div className="flex items-center justify-between px-3 py-1.5" style={{ background: 'linear-gradient(180deg, #00F5FF 0%, #0099CC 100%)' }}>
                            <span className="text-xs font-bold text-white/90 tracking-wide">BETSLIP.EXE</span>
                            <span className="w-5 h-5 rounded-full text-[10px] font-bold flex items-center justify-center bg-white" style={{ color: '#0099CC' }}>
                                {betSlip.length}
                            </span>
                        </div>

                        {/* Bet slip content */}
                        <div style={{ background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)' }}>
                            {betSlip.length === 0 ? (
                                <div className="text-center py-8">
                                    <div className="text-4xl mb-2 opacity-50 mx-auto w-16 h-16 rounded-full bg-gradient-to-r from-purple-500/20 to-cyan-500/20 flex items-center justify-center">🎮</div>
                                    <div className="text-sm" style={{ color: '#D1D5DB' }}>Click odds to add bets</div>
                                </div>
                            ) : (
                                <>
                                    <div className="space-y-2 p-3">
                                        {betSlip.map((bet, index) => (
                                            <div key={index} className="p-2.5 rounded-lg backdrop-blur-sm" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}>
                                                <div className="flex items-start justify-between gap-2">
                                                    <div className="flex-1 min-w-0">
                                                        <div className="text-[10px] truncate" style={{ color: '#D1D5DB' }}>{bet.match}</div>
                                                        <div className="font-semibold text-sm" style={{ color: '#FFFFFF' }}>{bet.selection}</div>
                                                    </div>
                                                    <button
                                                        onClick={() => removeBet(index)}
                                                        className="text-purple-400 hover:text-pink-400 transition-colors text-sm hover:scale-110"
                                                    >
                                                        ×
                                                    </button>
                                                </div>
                                                <div className="mt-1.5 text-lg font-black" style={{ color: '#00F5FF' }}>
                                                    {bet.odds.toFixed(2)}
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="pt-2 border-t border-purple-500/30 p-3">
                                        <div className="flex items-center justify-between text-sm mb-2">
                                            <span style={{ color: '#D1D5DB' }}>Total Odds</span>
                                            <span className="font-bold" style={{ color: '#00F5FF' }}>
                                                {betSlip.reduce((acc, bet) => acc * bet.odds, 1).toFixed(2)}
                                            </span>
                                        </div>
                                        <input
                                            type="number"
                                            placeholder="Stake CRO"
                                            className="w-full px-3 py-2 rounded-lg text-sm outline-none backdrop-blur-sm"
                                            style={{ background: 'rgba(255,255,255,0.1)', border: '2px solid rgba(255,255,255,0.2)', color: 'white' }}
                                            defaultValue="0.01"
                                            step="0.01"
                                            min="0.01"
                                        />
                                        <button className="w-full mt-2 py-3 rounded-lg font-bold text-white transition-all hover:scale-[1.02] backdrop-blur-sm"
                                            style={{
                                                background: 'linear-gradient(135deg, #C77DFF, #9D4EDD)',
                                                boxShadow: '0 4px 15px rgba(199, 127, 255, 0.4)'
                                            }}>
                                            Place Bet
                                        </button>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </aside>
            </div>
        </div>
    )
}
