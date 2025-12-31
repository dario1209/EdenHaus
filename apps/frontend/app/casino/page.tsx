"use client"

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { useAccount } from 'wagmi'

// Mock data - replace with TanStack Query later
const casinoGames = [
    {
        icon: '🎰',
        name: 'Slots',
        count: 245
    },
    {
        icon: '🃏',
        name: 'Blackjack',
        count: 89
    },
    {
        icon: '♠️',
        name: 'Poker',
        count: 67
    },
    {
        icon: '🎲',
        name: 'Roulette',
        count: 54
    },
    {
        icon: '🦊',
        name: 'Crash',
        count: 112
    },
]

const casinoTables = [
    {
        id: 1,
        game: 'Lightning Roulette',
        table: 'Table 7',
        dealer: 'Elena K.',
        status: 'LIVE',
        bets: '$24.7K',
        odds: { player: 1.95, banker: 1.98, tie: 8.50 },
        multiplier: { crash: 2.15 }
    },
    {
        id: 2,
        game: 'Infinite Blackjack',
        table: 'Table 3',
        dealer: 'Mike R.',
        status: 'LIVE',
        bets: '$18.2K',
        odds: { player: 1.92, dealer: 1.05, tie: 9.00 },
        multiplier: { crash: null }
    },
    {
        id: 3,
        game: 'Speed Baccarat',
        table: 'Table 12',
        dealer: 'Sophia L.',
        status: 'LIVE',
        bets: '$31.5K',
        odds: { player: 1.98, banker: 0.95, tie: 8.00 },
        multiplier: { crash: null }
    },
    {
        id: 4,
        game: 'Rocket Crash',
        table: 'Crash-01',
        dealer: 'Auto',
        status: 'CRASHING',
        bets: '$42.8K',
        odds: { player: null, banker: null, tie: null },
        multiplier: { crash: 4.72 }
    }
]

export default function CasinoPage() {
    const pathname = usePathname()
    const [selectedGame, setSelectedGame] = useState('Slots')
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
                {/* Vegas gold gradient */}
                <div
                    className="absolute inset-0"
                    style={{
                        background: 'linear-gradient(180deg, #1A0D2E 0%, #3D0F2A 25%, #8B1E4A 50%, #D62839 75%, #FF4757 100%)'
                    }}
                />
                {/* Casino grid overlay */}
                <div
                    className="absolute inset-0 opacity-25"
                    style={{
                        backgroundImage: 'linear-gradient(rgba(255,215,0,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,215,0,0.1) 1px, transparent 1px)',
                        backgroundSize: '60px 60px'
                    }}
                />
                {/* Vegas lights */}
                <div className="absolute top-20 left-10 text-4xl opacity-50 animate-pulse">✨</div>
                <div className="absolute top-40 right-15 text-3xl opacity-40 animate-pulse" style={{ animationDelay: '1s' }}>💎</div>
                <div className="absolute top-60 left-25 text-2xl opacity-60 animate-pulse" style={{ animationDelay: '0.5s' }}>⭐</div>
                <div className="absolute bottom-40 right-25 text-3xl opacity-50 animate-pulse" style={{ animationDelay: '1.5s' }}>🎰</div>
                <div className="absolute bottom-60 left-15 text-4xl opacity-40 animate-pulse" style={{ animationDelay: '2s' }}>✨</div>
            </div>

            {/* Header - Casino window style */}
            <header className="relative z-10 mx-4 mt-4">
                <div className="rounded-t-lg overflow-hidden" style={{ background: 'linear-gradient(180deg, #8B1E4A 0%, #5F0F30 100%)', border: '2px solid #D62839' }}>
                    {/* Window title bar */}
                    <div className="flex items-center justify-between px-3 py-1.5" style={{ background: 'linear-gradient(180deg, #D62839 0%, #A61E3A 100%)' }}>
                        <span className="text-xs font-bold text-white/90 tracking-wide">CASINO.EXE</span>
                        <div className="flex gap-1">
                            <div className="w-3 h-3 rounded-sm bg-white/40"></div>
                            <div className="w-3 h-3 rounded-sm bg-white/40"></div>
                            <div className="w-3 h-3 rounded-sm bg-red-300"></div>
                        </div>
                    </div>

                    {/* Main header content */}
                    <div className="flex items-center justify-between px-4 py-3 bg-white/10 backdrop-blur-sm border-b border-red-500/30">
                        <div className="flex items-center gap-2">
                            <Link href="/" className="flex items-center gap-2 group">
                                <div className="w-9 h-9 rounded-lg flex items-center justify-center text-lg font-black text-white"
                                    style={{
                                        background: 'linear-gradient(135deg, #FF4757, #D62839)',
                                        boxShadow: '0 2px 10px rgba(214, 40, 57, 0.4)'
                                    }}>
                                    C
                                </div>
                                <span className="text-lg font-black tracking-tight">
                                    <span style={{ color: '#FF4757' }}>CASINO</span>
                                    <span style={{ color: '#D62839' }}> ROYALE</span>
                                </span>
                            </Link>
                        </div>

                        {/* Navigation - Casino active */}
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
                                    background: 'linear-gradient(135deg, #FFD700, #FFA500)',
                                    boxShadow: '0 2px 10px rgba(255, 215, 0, 0.4)'
                                }}>
                                Connect Wallet
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            <div className="relative z-10 flex px-4 pb-4">
                {/* Casino Sidebar */}
                <aside className="hidden lg:block w-20 mr-4 mt-4">
                    <div className="rounded-lg overflow-hidden"
                        style={{
                            background: 'rgba(255,255,255,0.1)',
                            border: '2px solid #D62839',
                            backdropFilter: 'blur(10px)'
                        }}>
                        <div className="px-2 py-1 text-[10px] font-bold text-center text-white"
                            style={{ background: 'linear-gradient(180deg, #D62839 0%, #A61E3A 100%)' }}>
                            CASINO
                        </div>
                        <div className="flex flex-col items-center py-2 gap-1">
                            {casinoGames.map(game => (
                                <button
                                    key={game.name}
                                    onClick={() => setSelectedGame(game.name)}
                                    className={`group relative w-12 h-12 rounded-lg flex flex-col items-center justify-center transition-all ${selectedGame === game.name ? 'bg-gradient-to-br from-red-500/30 to-orange-500/30 hover:bg-orange-500/20' : 'hover:bg-red-500/20'
                                        }`}
                                >
                                    <span className="text-xl">{game.icon}</span>
                                    <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full text-[9px] font-bold flex items-center justify-center text-white bg-gradient-to-r from-red-500 to-orange-500">
                                        {game.count > 99 ? '99+' : game.count}
                                    </span>
                                    <div className="absolute left-full ml-2 px-2 py-1 rounded text-[10px] font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-50 text-white bg-red-600 shadow-lg">
                                        {game.name}
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>
                </aside>

                {/* Main Content */}
                <main className="flex-1 mt-4 space-y-4">
                    {/* Live Tables Window */}
                    <div className="rounded-lg overflow-hidden" style={{ border: '2px solid #D62839' }}>
                        {/* Window title bar */}
                        <div className="flex items-center justify-between px-3 py-1.5" style={{ background: 'linear-gradient(180deg, #D62839 0%, #A61E3A 100%)' }}>
                            <div className="flex items-center gap-2">
                                <span className="text-xs font-bold text-white/90 tracking-wide">LIVETABLES.DAT</span>
                                <span className="flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold text-white bg-gradient-to-r from-red-500 to-orange-500">
                                    <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
                                    <span>{casinoTables.length}</span> LIVE
                                </span>
                            </div>
                            <div className="flex gap-1">
                                <div className="w-3 h-3 rounded-sm bg-white/40"></div>
                                <div className="w-3 h-3 rounded-sm bg-white/40"></div>
                                <div className="w-3 h-3 rounded-sm bg-red-300"></div>
                            </div>
                        </div>

                        {/* Tables content */}
                        <div style={{ background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)' }}>
                            <div className="grid grid-cols-12 gap-4 px-4 py-2 text-xs font-bold uppercase tracking-wider" style={{ background: 'rgba(214, 40, 57, 0.2)', color: '#F7FAFC' }}>
                                <div className="col-span-4">Table</div>
                                <div className="col-span-2 text-center">Dealer</div>
                                <div className="col-span-2 text-center">Bets</div>
                                <div className="col-span-2 text-center">Odds</div>
                                <div className="col-span-2 text-center">Status</div>
                            </div>

                            {casinoTables.map((table, index) => (
                                <div
                                    key={table.id}
                                    className={`grid grid-cols-12 gap-4 px-4 py-3 items-center transition-all hover:bg-red-500/10 ${index !== casinoTables.length - 1 ? 'border-b border-red-500/20' : ''
                                        }`}
                                >
                                    <div className="col-span-4">
                                        <div className="text-[10px] font-bold uppercase tracking-wider mb-1" style={{ color: '#FF4757' }}>
                                            {table.game}
                                        </div>
                                        <div className="font-semibold truncate" style={{ color: '#F7FAFC' }}>
                                            {table.table}
                                        </div>
                                    </div>

                                    <div className="col-span-2 text-center">
                                        <span className="text-sm font-medium" style={{ color: '#FFD700' }}>
                                            {table.dealer}
                                        </span>
                                    </div>

                                    <div className="col-span-2 text-center">
                                        <span className="text-sm font-bold" style={{ color: '#FFD700' }}>
                                            ${table.bets}
                                        </span>
                                    </div>

                                    <div className="col-span-2 flex justify-center gap-1">
                                        {table.odds.player && (
                                            <button
                                                onClick={() => addToBetSlip(`${table.game} - ${table.table}`, 'Player', table.odds.player!)}  // ✅ !
                                                className="px-2 py-1 rounded transition-all hover:scale-105"
                                                style={{ background: 'rgba(255,215,0,0.2)', border: '1px solid #FFD700', color: '#FFD700' }}
                                            >
                                                P: {table.odds.player!.toFixed(2)}  // ✅ !
                                            </button>
                                        )}
                                        {table.odds.banker && (
                                            <button
                                                onClick={() => addToBetSlip(`${table.game} - ${table.table}`, 'Banker', table.odds.banker!)}  // ✅ !
                                                className="px-2 py-1 rounded transition-all hover:scale-105"
                                                style={{ background: 'rgba(34,197,94,0.2)', border: '1px solid #22C55E', color: '#22C55E' }}
                                            >
                                                B: {table.odds.banker!.toFixed(2)}  // ✅ !
                                            </button>
                                        )}
                                    </div>


                                    <div className="col-span-2 text-center">
                                        <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-bold backdrop-blur-sm"
                                            style={{
                                                background: table.status === 'CRASHING' ? 'rgba(255,71,87,0.3)' : 'rgba(34,197,94,0.3)',
                                                color: table.status === 'CRASHING' ? '#FF4757' : '#22C55E',
                                                border: `1px solid ${table.status === 'CRASHING' ? '#FF4757' : '#22C55E'}`
                                            }}>
                                            {table.multiplier?.crash ? `x${table.multiplier.crash.toFixed(2)}` : table.status}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Casino Stats */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        {[
                            { label: 'Total Jackpot', value: '$2.8M', change: '+14%', color: '#FFD700' },
                            { label: 'Live Players', value: '1,247', change: '+23%', color: '#FF4757' },
                            { label: 'House Edge', value: '1.24%', change: '-0.3%', color: '#D62839' },
                            { label: 'Max Win', value: 'x12,450', change: '+45%', color: '#FFA500' },
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
                                <div className="text-xs font-medium mb-1" style={{ color: '#F7FAFC' }}>
                                    {stat.label}
                                </div>
                                <div className="text-2xl font-black" style={{ color: stat.color }}>
                                    {stat.value}
                                </div>
                                {stat.change && (
                                    <div className="text-xs font-semibold mt-1" style={{ color: '#FCD34D' }}>
                                        {stat.change} today
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </main>

                {/* BetSlip Sidebar */}
                <aside className="hidden xl:block w-72 ml-4 mt-4">
                    <div className="rounded-lg overflow-hidden sticky top-4" style={{ border: '2px solid #FFD700' }}>
                        <div className="flex items-center justify-between px-3 py-1.5" style={{ background: 'linear-gradient(180deg, #FFD700 0%, #FFA500 100%)' }}>
                            <span className="text-xs font-bold text-white/90 tracking-wide">BETSLIP.EXE</span>
                            <span className="w-5 h-5 rounded-full text-[10px] font-bold flex items-center justify-center bg-black text-yellow-400">
                                {betSlip.length}
                            </span>
                        </div>

                        <div style={{ background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)' }}>
                            {betSlip.length === 0 ? (
                                <div className="text-center py-8">
                                    <div className="text-4xl mb-2 opacity-50 mx-auto w-16 h-16 rounded-full bg-gradient-to-r from-red-500/20 to-yellow-500/20 flex items-center justify-center">🎰</div>
                                    <div className="text-sm" style={{ color: '#F7FAFC' }}>Click odds to add bets</div>
                                </div>
                            ) : (
                                <>
                                    <div className="space-y-2 p-3">
                                        {betSlip.map((bet, index) => (
                                            <div key={index} className="p-2.5 rounded-lg backdrop-blur-sm" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}>
                                                <div className="flex items-start justify-between gap-2">
                                                    <div className="flex-1 min-w-0">
                                                        <div className="text-[10px] truncate" style={{ color: '#F7FAFC' }}>{bet.match}</div>
                                                        <div className="font-semibold text-sm" style={{ color: '#FFFFFF' }}>{bet.selection}</div>
                                                    </div>
                                                    <button
                                                        onClick={() => removeBet(index)}
                                                        className="text-red-400 hover:text-orange-400 transition-colors text-sm hover:scale-110"
                                                    >
                                                        ×
                                                    </button>
                                                </div>
                                                <div className="mt-1.5 text-lg font-black" style={{ color: '#FFD700' }}>
                                                    {bet.odds.toFixed(2)}
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="pt-2 border-t border-red-500/30 p-3">
                                        <div className="flex items-center justify-between text-sm mb-2">
                                            <span style={{ color: '#F7FAFC' }}>Total Odds</span>
                                            <span className="font-bold" style={{ color: '#FFD700' }}>
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
                                                background: 'linear-gradient(135deg, #FF4757, #D62839)',
                                                boxShadow: '0 4px 15px rgba(255, 71, 87, 0.4)'
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
