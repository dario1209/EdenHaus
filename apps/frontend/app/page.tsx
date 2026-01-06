"use client"

import type { Route } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function Home() {
    const router = useRouter()
    const [knockSequence, setKnockSequence] = useState<number[]>([])
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [doorShaking, setDoorShaking] = useState(false)
    const [smokeEffect, setSmokeEffect] = useState(false)

    // Secret knock pattern: 3 knocks
    const secretPattern = [1, 1, 1]

    const handleKnock = () => {
        const newSequence = [...knockSequence, 1]
        setKnockSequence(newSequence)
        setDoorShaking(true)

        setTimeout(() => setDoorShaking(false), 200)

        // Check if pattern matches after 3 knocks
        if (newSequence.length === 3) {
            if (JSON.stringify(newSequence) === JSON.stringify(secretPattern)) {
                setIsAuthenticated(true)
                setSmokeEffect(true)
                setTimeout(() => {
                    router.push('/casino' as Route)
                }, 2000)
            } else {
                // Wrong pattern - reset
                setTimeout(() => setKnockSequence([]), 1000)
            }
        }
    }

    const handleEnter = () => {
        setSmokeEffect(true)
        setTimeout(() => {
            router.push('/casino' as Route)
        }, 1500)
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden">
            {/* Ambient smoke effect */}
            {smokeEffect && (
                <div className="absolute inset-0 bg-gradient-radial from-transparent via-[#5F6F52]/20 to-[#1F3D2B]/40 animate-pulse z-50 pointer-events-none" />
            )}

            {/* Vintage wallpaper texture overlay */}
            <div className="absolute inset-0 opacity-10 grid-bg" />

            {/* Main content */}
            <div className="relative z-10 flex flex-col items-center space-y-12 px-6">

                {/* Building illustration with interactive door */}
                <div className="relative group">
                    <div
                        className={`window-card p-8 transition-all duration-300 ${doorShaking ? 'animate-shake' : ''
                            } ${isAuthenticated ? 'glow-gold' : 'glow-emerald'}`}
                        style={{
                            background: 'linear-gradient(135deg, rgba(107, 74, 50, 0.9) 0%, rgba(74, 44, 29, 0.95) 100%)',
                            borderColor: isAuthenticated ? '#C2A14D' : '#6B4A32'
                        }}
                    >
                        {/* Building SVG - same as your current design */}
                        <svg
                            width="200"
                            height="200"
                            viewBox="0 0 200 200"
                            className="drop-shadow-2xl"
                            onClick={handleKnock}
                        >
                            {/* Building outline */}
                            <rect x="40" y="30" width="120" height="150"
                                fill="none"
                                stroke={isAuthenticated ? "#C2A14D" : "#D8CFC0"}
                                strokeWidth="2.5"
                                className="transition-all duration-500" />

                            {/* Windows - Top floor */}
                            <rect x="50" y="45" width="15" height="20" fill="none" stroke="#D8CFC0" strokeWidth="1.5" />
                            <rect x="70" y="45" width="15" height="20" fill="none" stroke="#D8CFC0" strokeWidth="1.5" />
                            <rect x="90" y="45" width="15" height="20" fill="none" stroke="#D8CFC0" strokeWidth="1.5" />
                            <rect x="110" y="45" width="15" height="20" fill="none" stroke="#D8CFC0" strokeWidth="1.5" />
                            <rect x="130" y="45" width="15" height="20" fill="none" stroke="#D8CFC0" strokeWidth="1.5" />

                            {/* Windows - Middle floor */}
                            <rect x="50" y="75" width="15" height="20" fill="none" stroke="#D8CFC0" strokeWidth="1.5" />
                            <rect x="70" y="75" width="15" height="20" fill="none" stroke="#D8CFC0" strokeWidth="1.5" />
                            <rect x="90" y="75" width="15" height="20" fill="none" stroke="#D8CFC0" strokeWidth="1.5" />
                            <rect x="110" y="75" width="15" height="20" fill="none" stroke="#D8CFC0" strokeWidth="1.5" />
                            <rect x="130" y="75" width="15" height="20" fill="none" stroke="#D8CFC0" strokeWidth="1.5" />

                            {/* Door - Interactive */}
                            <rect x="80" y="120" width="40" height="55"
                                fill={isAuthenticated ? "#C2A14D" : "#4A2C1D"}
                                stroke={isAuthenticated ? "#C2A14D" : "#D8CFC0"}
                                strokeWidth="2"
                                className="cursor-pointer hover:brightness-110 transition-all duration-300" />

                            {/* Door arch */}
                            <path d="M 80 120 Q 100 110 120 120"
                                fill="none"
                                stroke={isAuthenticated ? "#C2A14D" : "#D8CFC0"}
                                strokeWidth="2" />

                            {/* Door knob */}
                            <circle cx="110" cy="150" r="3"
                                fill={isAuthenticated ? "#F3EBDD" : "#B08D57"}
                                className="cursor-pointer hover:scale-125 transition-transform" />

                            {/* Speakeasy peephole */}
                            <rect x="95" y="135" width="10" height="6"
                                fill="#1F3D2B"
                                stroke={isAuthenticated ? "#C2A14D" : "#6B4A32"}
                                strokeWidth="1" />

                            {/* Corner brackets */}
                            <path d="M 45 35 L 45 45 M 45 35 L 55 35" stroke="#D8CFC0" strokeWidth="2" strokeLinecap="round" />
                            <path d="M 155 35 L 155 45 M 155 35 L 145 35" stroke="#D8CFC0" strokeWidth="2" strokeLinecap="round" />
                            <path d="M 45 175 L 45 165 M 45 175 L 55 175" stroke="#D8CFC0" strokeWidth="2" strokeLinecap="round" />
                            <path d="M 155 175 L 155 165 M 155 175 L 145 175" stroke="#D8CFC0" strokeWidth="2" strokeLinecap="round" />
                        </svg>

                        {/* Knock indicator dots */}
                        <div className="flex justify-center gap-2 mt-4">
                            {[0, 1, 2].map((i) => (
                                <div
                                    key={i}
                                    className={`w-3 h-3 rounded-full transition-all duration-300 ${knockSequence[i]
                                            ? 'bg-[#C2A14D] shadow-lg shadow-[#C2A14D]/50'
                                            : 'bg-[#6B4A32]/30'
                                        }`}
                                />
                            ))}
                        </div>
                    </div>
                </div>

                {/* Establishment name */}
                <div className="text-center space-y-3">
                    <h1 className="text-6xl md:text-7xl font-serif text-[#D8CFC0] tracking-wider drop-shadow-lg">
                        Bistro402
                    </h1>
                    <p className="text-sm text-[#B08D57] tracking-[0.3em] uppercase font-light">
                        In House Bets
                    </p>
                </div>

                {/* Mysterious description */}
                <p className="text-center text-[#D8CFC0]/80 max-w-md text-sm leading-relaxed font-light">
                    An exclusive establishment for distinguished members seeking refined sports wagering
                    in an atmosphere of sophistication
                </p>

                {/* Enter button */}
                <button
                    onClick={handleEnter}
                    className="btn-gold px-12 py-4 text-lg tracking-wider uppercase font-semibold hover:tracking-widest transition-all duration-300 shadow-2xl"
                >
                    Enter the House
                </button>

                {/* Secret hint (subtle) */}
                <p className="text-[#6B4A32]/40 text-xs italic">
                    {knockSequence.length > 0 && knockSequence.length < 3
                        ? `Knock ${3 - knockSequence.length} more time${3 - knockSequence.length > 1 ? 's' : ''}...`
                        : 'Those who know, knock thrice...'}
                </p>

                {/* Footer */}
                <div className="absolute bottom-8 left-0 right-0">
                    <div className="text-center space-y-4">
                        <p className="text-[#B08D57]/60 text-xs tracking-widest uppercase">
                            Est. 2024 • Members Only
                        </p>

                        <div className="flex justify-center gap-8 text-[#D8CFC0]/60 text-xs">
                            <Link href="/terms" className="hover:text-[#C2A14D] transition-colors">
                                Terms & Conditions
                            </Link>
                            <span className="text-[#6B4A32]">•</span>
                            <Link href="/responsible-gaming" className="hover:text-[#C2A14D] transition-colors">
                                Responsible Gaming
                            </Link>
                            <span className="text-[#6B4A32]">•</span>
                            <Link href="/contact" className="hover:text-[#C2A14D] transition-colors">
                                Contact
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            <style jsx>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-4px); }
          75% { transform: translateX(4px); }
        }
        .animate-shake {
          animation: shake 0.2s ease-in-out;
        }
      `}</style>
        </div>
    )
}
