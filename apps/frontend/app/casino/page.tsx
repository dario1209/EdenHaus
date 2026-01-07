"use client";

import type { Route } from "next";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

// Casino games data
const casinoGames = [
    { icon: "🎰", name: "Slots", count: 245 },
    { icon: "🃏", name: "Blackjack", count: 89 },
    { icon: "♠️", name: "Poker", count: 67 },
    { icon: "🎲", name: "Roulette", count: 54 },
    { icon: "🚀", name: "Crash", count: 112 },
    { icon: "🎯", name: "Dice", count: 38 },
];

const liveTables = [
    {
        id: 1,
        game: "Lightning Roulette",
        table: "Table 7",
        dealer: "Elena K.",
        players: 847,
        minBet: "$0.50",
        status: "SPINNING",
        odds: { red: 1.95, black: 1.95, green: 35.0 },
        lastNumbers: [7, 32, 15, 19, 4],
    },
    {
        id: 2,
        game: "Infinite Blackjack",
        table: "Table 3",
        dealer: "Mike R.",
        players: 1243,
        minBet: "$1.00",
        status: "DEALING",
        odds: { hit: 1.92, stand: 1.05, double: 2.0 },
        lastNumbers: [],
    },
    {
        id: 3,
        game: "Speed Baccarat",
        table: "Table 12",
        dealer: "Sophia L.",
        players: 562,
        minBet: "$5.00",
        status: "BETTING",
        odds: { player: 1.98, banker: 0.95, tie: 8.0 },
        lastNumbers: [],
    },
    {
        id: 4,
        game: "Rocket Crash",
        table: "Crash Arena",
        dealer: "Auto",
        players: 2891,
        minBet: "$0.10",
        status: "FLYING",
        odds: { cashout: null as any, banker: null as any, tie: null as any },
        multiplier: 3.47,
    },
    {
        id: 5,
        game: "Dream Catcher",
        table: "Wheel 1",
        dealer: "Luna M.",
        players: 423,
        minBet: "$0.25",
        status: "SPINNING",
        odds: { x1: 1.0, x2: 2.0, x5: 5.0 },
        lastNumbers: [2, 1, 5, 2, 1],
    },
];

const navItems: { name: string; path: Route }[] = [
    { name: "Live", path: "/" as Route },
    { name: "Sports", path: "/sports" as Route },
    { name: "Esports", path: "/esports" as Route },
    { name: "Casino", path: "/casino" as Route },
    { name: "Prediction", path: "/prediction" as Route },
];

export default function CasinoPage() {
    const pathname = usePathname();

    const [selectedGame, setSelectedGame] = useState("Slots");
    const [betSlip, setBetSlip] = useState<{ table: string; selection: string; odds: number }[]>([]);
    const [currentTime, setCurrentTime] = useState("");
    const [currentDate, setCurrentDate] = useState("");
    const [crashMultiplier, setCrashMultiplier] = useState(1.0);

    // Accordion for tables (prevents any dense grid collisions on mobile)
    const [expandedTableId, setExpandedTableId] = useState<number | null>(liveTables[0]?.id ?? null);

    useEffect(() => {
        const timer = setInterval(() => {
            const now = new Date();
            setCurrentTime(
                now.toLocaleTimeString("en-US", {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true,
                })
            );
            setCurrentDate(
                now.toLocaleDateString("en-US", {
                    weekday: "short",
                    month: "short",
                    day: "numeric",
                })
            );
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    // Crash multiplier animation (UI-only)
    useEffect(() => {
        const crashTimer = setInterval(() => {
            setCrashMultiplier((prev) => {
                if (prev >= 10) return 1.0;
                return Math.round((prev + 0.03) * 100) / 100;
            });
        }, 100);
        return () => clearInterval(crashTimer);
    }, []);

    const addToBetSlip = (table: string, selection: string, odds: number) => {
        setBetSlip((prev) => [...prev, { table, selection, odds }]);
    };

    const removeBet = (index: number) => {
        setBetSlip((prev) => prev.filter((_, i) => i !== index));
    };

    const liveCount = useMemo(() => liveTables.filter((t) => t.status !== "UPCOMING").length, []);
    const totalOdds = useMemo(() => betSlip.reduce((acc, bet) => acc * bet.odds, 1), [betSlip]);

    const isActiveNav = (path: string) => {
        if (path === "/") return pathname === "/";
        return pathname?.startsWith(path);
    };

    const panelClass =
        "relative rounded-3xl bg-[linear-gradient(135deg,rgba(10,14,12,0.55),rgba(10,14,12,0.22))] " +
        "backdrop-blur-md shadow-[0_40px_120px_rgba(0,0,0,0.55)] ring-1 ring-[#B08D57]/12 border border-[#B08D57]/45";

    const innerBorder = (
        <div className="pointer-events-none absolute inset-[10px] rounded-2xl border border-[#C2A14D]/16" />
    );

    return (
        <div className="relative min-h-screen overflow-hidden">
            {/* Eden Haus background */}
            <div className="absolute inset-0 bg-[#1F3D2B]" />
            <div className="absolute inset-0 bg-[radial-gradient(1200px_700px_at_50%_35%,rgba(243,235,221,0.10),rgba(31,61,43,0.65),rgba(10,14,12,0.92))]" />
            <div className="absolute inset-0 opacity-10 mix-blend-soft-light eh-wallpaper" />
            <div className="absolute inset-0 opacity-10 eh-decoLines" />

            <div className="relative z-10 px-4 md:px-8 py-10">
                {/* Header */}
                <header className={`${panelClass} px-6 py-5`}>
                    {innerBorder}

                    <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                        <div className="min-w-0">
                            <Link href={"/" as Route} className="group inline-block">
                                <div className="flex items-baseline gap-3">
                                    <span className="font-serif text-2xl md:text-3xl tracking-[0.12em] text-[#F3EBDD] drop-shadow-[0_10px_25px_rgba(0,0,0,0.55)]">
                                        Eden Haus
                                    </span>
                                    <span className="hidden sm:inline text-[11px] tracking-[0.45em] uppercase text-[#B08D57]/80">
                                        Members Only
                                    </span>
                                </div>

                                <div className="mt-1 text-[11px] tracking-[0.34em] uppercase text-[#D8CFC0]/50 group-hover:text-[#C2A14D]/80 transition-colors">
                                    Casino • Quiet Confidence • Reliable Odds
                                </div>
                            </Link>

                            <div className="mt-4 flex flex-wrap items-center gap-3">
                                <div className="inline-flex items-center gap-2 rounded-full px-3 py-2 border border-[#B08D57]/30 bg-[#0A0E0C]/14">
                                    <span className="inline-block h-2 w-2 rounded-full bg-[#C2A14D] shadow-[0_0_18px_rgba(194,161,77,0.40)]" />
                                    <span className="text-[11px] tracking-[0.28em] uppercase text-[#D8CFC0]/70">
                                        {liveCount} live tables • Crash {crashMultiplier.toFixed(2)}x
                                    </span>
                                </div>

                                <div className="hidden sm:inline-flex items-center gap-2 rounded-full px-3 py-2 border border-[#B08D57]/25 bg-[#0A0E0C]/12">
                                    <span className="text-[#C2A14D]/75">⏱</span>
                                    <span className="text-[11px] tracking-[0.22em] uppercase text-[#D8CFC0]/60">
                                        {currentDate} • {currentTime}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <nav className="flex flex-wrap items-center gap-2">
                            {navItems.map((item) => {
                                const isActive = isActiveNav(item.path as string);
                                return (
                                    <Link
                                        key={item.name}
                                        href={item.path}
                                        className={[
                                            "relative rounded-full px-4 py-2 text-xs uppercase tracking-[0.28em] transition border",
                                            isActive
                                                ? "border-[#C2A14D]/65 text-[#F3EBDD] bg-[linear-gradient(180deg,rgba(194,161,77,0.16),rgba(176,141,87,0.05))]"
                                                : "border-[#B08D57]/30 text-[#D8CFC0]/65 bg-[#0A0E0C]/10 hover:text-[#F3EBDD] hover:border-[#C2A14D]/45",
                                        ].join(" ")}
                                    >
                                        {item.name}
                                    </Link>
                                );
                            })}
                        </nav>
                    </div>
                </header>

                <main className="eh-main">
                    <div className="eh-layout">
                        {/* Left: categories */}
                        <aside className="eh-side">
                            <div className="eh-card">
                                <div className="eh-card__pad">
                                    <div className="eh-miniTitle">Games</div>
                                    <div className="eh-games">
                                        {casinoGames.map((g) => {
                                            const active = selectedGame === g.name;
                                            return (
                                                <button
                                                    key={g.name}
                                                    onClick={() => setSelectedGame(g.name)}
                                                    className={active ? "eh-game eh-game--active" : "eh-game"}
                                                    type="button"
                                                >
                                                    <span className="eh-game__icon">{g.icon}</span>
                                                    <span className="eh-game__name">{g.name}</span>
                                                    <span className="eh-game__count">{g.count > 99 ? "99+" : g.count}</span>
                                                </button>
                                            );
                                        })}
                                    </div>

                                    <div className="eh-dividerLine" />

                                    <div className="eh-miniTitle">Now trending</div>
                                    <div className="eh-trends">
                                        <div className="eh-trend">
                                            <div className="eh-trend__k">High volatility</div>
                                            <div className="eh-trend__v">Crash / Dice</div>
                                        </div>
                                        <div className="eh-trend">
                                            <div className="eh-trend__k">House edge</div>
                                            <div className="eh-trend__v">Varies by table</div>
                                        </div>
                                        <div className="eh-trend">
                                            <div className="eh-trend__k">Min stake</div>
                                            <div className="eh-trend__v">$0.10+</div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="eh-card">
                                <div className="eh-card__pad">
                                    <div className="eh-miniTitle">Crash live</div>
                                    <div className="eh-crash">
                                        <div className="eh-crash__k">Rocket running</div>
                                        <div className="eh-crash__v">{crashMultiplier.toFixed(2)}x</div>
                                        <div className="eh-crash__sub">Auto-updating demo ticker</div>
                                        <div className="eh-miniBar" aria-hidden="true">
                                            <div
                                                className="eh-miniBar__yes"
                                                style={{ width: `${Math.min(100, (crashMultiplier / 10) * 100)}%` }}
                                            />
                                            <div
                                                className="eh-miniBar__no"
                                                style={{ width: `${100 - Math.min(100, (crashMultiplier / 10) * 100)}%` }}
                                            />
                                        </div>
                                        <div className="eh-miniBarLegend">
                                            <span className="eh-yes">Live</span>
                                            <span className="eh-no">Reset at 10x</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </aside>

                        {/* Center: tables */}
                        <section className="eh-center">
                            <div className="eh-card">
                                <div className="eh-card__pad">
                                    <div className="eh-headRow">
                                        <div>
                                            <div className="eh-miniTitle">Live tables</div>
                                            <div className="eh-subtle">Tap a table to expand • {selectedGame}</div>
                                        </div>
                                        <div className="eh-pill">
                                            <span className="eh-dot" />
                                            {liveTables.length} rooms
                                        </div>
                                    </div>

                                    {/* Desktop header row */}
                                    <div className="eh-tableHead">
                                        <div>Table</div>
                                        <div className="text-center">Players</div>
                                        <div className="text-center">Min</div>
                                        <div className="text-center">Dealer</div>
                                        <div className="text-center">Status</div>
                                    </div>

                                    {/* Accordion list */}
                                    <div className="eh-acc">
                                        {liveTables.map((t) => {
                                            const isExpanded = expandedTableId === t.id;
                                            const lastNumbers = (t as any).lastNumbers as number[] | undefined;

                                            return (
                                                <div key={t.id} className={isExpanded ? "eh-rowAcc eh-rowAcc--open" : "eh-rowAcc"}>
                                                    <button
                                                        type="button"
                                                        className="eh-rowAcc__summary"
                                                        onClick={() => setExpandedTableId(isExpanded ? null : t.id)}
                                                    >
                                                        <div className="eh-rowAcc__left">
                                                            <div className="eh-league">
                                                                <span className="eh-liveDot" />
                                                                {t.game}
                                                            </div>

                                                            <div className="eh-teams">
                                                                <div className="eh-team">{t.table}</div>
                                                                <div className="eh-team eh-team--muted">Min {t.minBet} • {t.players.toLocaleString()} players</div>
                                                            </div>
                                                        </div>

                                                        <div className="eh-rowAcc__right">
                                                            <span className="eh-chipPill">{t.dealer}</span>
                                                            <span className="eh-status eh-status--live">{t.status}</span>
                                                            <span className="eh-rowAcc__chev" aria-hidden="true">
                                                                {isExpanded ? "−" : "+"}
                                                            </span>
                                                        </div>
                                                    </button>

                                                    {isExpanded ? (
                                                        <div className="eh-rowAcc__details">
                                                            {/* Quick meta */}
                                                            <div className="eh-rowAcc__meta">
                                                                <div className="eh-metaPill">
                                                                    <span className="eh-metaPill__k">Game</span>
                                                                    <span className="eh-metaPill__v">{t.game}</span>
                                                                </div>
                                                                <div className="eh-metaPill">
                                                                    <span className="eh-metaPill__k">Table</span>
                                                                    <span className="eh-metaPill__v">{t.table}</span>
                                                                </div>
                                                                <div className="eh-metaPill">
                                                                    <span className="eh-metaPill__k">Players</span>
                                                                    <span className="eh-metaPill__v">{t.players.toLocaleString()}</span>
                                                                </div>
                                                                <div className="eh-metaPill">
                                                                    <span className="eh-metaPill__k">Min</span>
                                                                    <span className="eh-metaPill__v">{t.minBet}</span>
                                                                </div>
                                                            </div>

                                                            {/* Odds */}
                                                            <div className="eh-rowAcc__grid">
                                                                <div className="eh-detailBlock">
                                                                    <div className="eh-detailBlock__k">Quick bets</div>
                                                                    <div className="eh-oddsBtns">
                                                                        {Object.entries(t.odds)
                                                                            .filter(([, v]) => typeof v === "number")
                                                                            .map(([k, v]) => (
                                                                                <button
                                                                                    key={k}
                                                                                    type="button"
                                                                                    className="eh-oddBtn"
                                                                                    onClick={() => addToBetSlip(`${t.game} • ${t.table}`, k.toUpperCase(), Number(v))}
                                                                                >
                                                                                    <div className="eh-oddBtn__k">{k}</div>
                                                                                    <div className="eh-oddBtn__v">{Number(v).toFixed(2)}</div>
                                                                                </button>
                                                                            ))}
                                                                    </div>

                                                                    {t.game === "Rocket Crash" ? (
                                                                        <div className="eh-crashInline">
                                                                            <div className="eh-crashInline__k">Current</div>
                                                                            <div className="eh-crashInline__v">{crashMultiplier.toFixed(2)}x</div>
                                                                            <div className="eh-crashInline__sub">Cash out before reset</div>
                                                                        </div>
                                                                    ) : null}
                                                                </div>

                                                                <div className="eh-detailBlock">
                                                                    <div className="eh-detailBlock__k">Recent results</div>
                                                                    {Array.isArray(lastNumbers) && lastNumbers.length ? (
                                                                        <div className="eh-balls">
                                                                            {lastNumbers.map((n, idx) => (
                                                                                <span key={`${t.id}-${idx}`} className="eh-ball">
                                                                                    {n}
                                                                                </span>
                                                                            ))}
                                                                        </div>
                                                                    ) : (
                                                                        <div className="eh-mutedBlock">No recent numbers shown for this table.</div>
                                                                    )}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ) : null}
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>

                            {/* KPIs */}
                            <div className="eh-statsGrid">
                                {[
                                    { label: "Tables live", value: String(liveCount), sub: "Active rooms" },
                                    { label: "Crash", value: `${crashMultiplier.toFixed(2)}x`, sub: "Live ticker" },
                                    { label: "Min bet", value: "$0.10", sub: "Entry point" },
                                    { label: "Latency", value: "0.4s", sub: "Demo stat" },
                                ].map((stat) => (
                                    <div key={stat.label} className="eh-card">
                                        <div className="eh-card__pad">
                                            <div className="eh-stat__k">{stat.label}</div>
                                            <div className="eh-stat__v">{stat.value}</div>
                                            <div className="eh-stat__sub">{stat.sub}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Right: bet slip */}
                        <aside className="eh-right">
                            <div className="eh-card eh-sticky">
                                <div className="eh-card__pad">
                                    <div className="eh-headRow">
                                        <div>
                                            <div className="eh-miniTitle">Bet slip</div>
                                            <div className="eh-subtle">Selections • {betSlip.length}</div>
                                        </div>
                                        <div className="eh-pill">
                                            <span className="eh-dot" />
                                            Ready
                                        </div>
                                    </div>

                                    {betSlip.length === 0 ? (
                                        <div className="eh-empty">
                                            <div className="eh-empty__k">No bets placed yet</div>
                                            <div className="eh-empty__sub">Tap odds to add selections.</div>
                                        </div>
                                    ) : (
                                        <>
                                            <div className="eh-slipList">
                                                {betSlip.map((bet, index) => (
                                                    <div key={index} className="eh-slipItem">
                                                        <div className="eh-slipItem__top">
                                                            <div className="min-w-0">
                                                                <div className="eh-slipItem__match">{bet.table}</div>
                                                                <div className="eh-slipItem__sel">{bet.selection}</div>
                                                            </div>
                                                            <button
                                                                onClick={() => removeBet(index)}
                                                                className="eh-x"
                                                                type="button"
                                                                aria-label="Remove bet"
                                                            >
                                                                ×
                                                            </button>
                                                        </div>
                                                        <div className="eh-slipItem__odds">{bet.odds.toFixed(2)}</div>
                                                    </div>
                                                ))}
                                            </div>

                                            <div className="eh-slipTotals">
                                                <div className="eh-slipTotals__row">
                                                    <span>Total odds</span>
                                                    <span className="eh-gold">{totalOdds.toFixed(2)}</span>
                                                </div>

                                                <input
                                                    type="number"
                                                    placeholder="Stake (CRO)"
                                                    className="eh-input"
                                                    defaultValue="0.01"
                                                    step="0.01"
                                                    min="0.01"
                                                />

                                                <button className="eh-action" type="button">
                                                    Place bet
                                                </button>

                                                <div className="eh-fineprint">Demo UI • Wallet + settlement wiring next</div>
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>

                            <div className="eh-card">
                                <div className="eh-card__pad">
                                    <div className="eh-miniTitle">House note</div>
                                    <div className="eh-mutedBlock">
                                        This is a visual mock to match the Eden Haus theme—connect gameplay and wagering logic next.
                                    </div>
                                </div>
                            </div>
                        </aside>
                    </div>
                </main>
            </div>

            <style jsx global>{`
        .eh-main {
          max-width: 1180px;
          margin: 0 auto;
          padding: 18px 0 56px;
        }

        .eh-layout {
          margin-top: 18px;
          display: grid;
          grid-template-columns: 1fr;
          gap: 18px;
        }

        @media (min-width: 1024px) {
          .eh-layout {
            grid-template-columns: 300px 1fr 360px;
            align-items: start;
          }
        }

        .eh-card {
          background: rgba(10, 14, 12, 0.22);
          border: 1px solid rgba(176, 141, 87, 0.22);
          border-radius: 18px;
          box-shadow: 0 18px 50px rgba(0, 0, 0, 0.45);
          backdrop-filter: blur(14px);
          overflow: hidden;
        }

        .eh-card__pad {
          padding: 16px;
        }

        .eh-miniTitle {
          font-size: 11px;
          font-weight: 900;
          letter-spacing: 0.34em;
          text-transform: uppercase;
          color: rgba(176, 141, 87, 0.8);
          margin-bottom: 8px;
        }

        .eh-subtle {
          margin-top: 6px;
          font-size: 12px;
          color: rgba(216, 207, 192, 0.6);
          letter-spacing: 0.06em;
        }

        .eh-pill {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 11px;
          font-weight: 900;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: rgba(216, 207, 192, 0.65);
          padding: 8px 10px;
          border-radius: 999px;
          background: rgba(10, 14, 12, 0.12);
          border: 1px solid rgba(176, 141, 87, 0.18);
          height: fit-content;
        }

        .eh-dot {
          width: 8px;
          height: 8px;
          border-radius: 999px;
          background: #c2a14d;
          box-shadow: 0 0 0 4px rgba(194, 161, 77, 0.16);
          display: inline-block;
        }

        .eh-headRow {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 10px;
          margin-bottom: 12px;
        }

        .eh-dividerLine {
          height: 1px;
          background: rgba(176, 141, 87, 0.16);
          margin: 14px 0;
          border-radius: 999px;
        }

        /* Left nav games */
        .eh-games {
          display: grid;
          gap: 10px;
        }

        .eh-game {
          width: 100%;
          display: grid;
          grid-template-columns: 34px 1fr auto;
          align-items: center;
          gap: 10px;
          padding: 12px 12px;
          border-radius: 16px;
          border: 1px solid rgba(176, 141, 87, 0.18);
          background: rgba(10, 14, 12, 0.12);
          cursor: pointer;
          transition: transform 120ms ease, border-color 120ms ease, background 120ms ease;
          text-align: left;
        }

        .eh-game:hover {
          transform: translateY(-1px);
          border-color: rgba(194, 161, 77, 0.35);
          background: rgba(10, 14, 12, 0.14);
        }

        .eh-game--active {
          border-color: rgba(194, 161, 77, 0.55);
          background: rgba(194, 161, 77, 0.08);
        }

        .eh-game__icon {
          font-size: 18px;
        }

        .eh-game__name {
          font-size: 12px;
          font-weight: 900;
          letter-spacing: 0.08em;
          color: rgba(243, 235, 221, 0.9);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .eh-game__count {
          font-size: 11px;
          font-weight: 900;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: rgba(216, 207, 192, 0.6);
          padding: 6px 10px;
          border-radius: 999px;
          border: 1px solid rgba(176, 141, 87, 0.18);
          background: rgba(10, 14, 12, 0.1);
        }

        /* Trends */
        .eh-trends {
          display: grid;
          gap: 10px;
        }

        .eh-trend {
          padding: 12px;
          border-radius: 16px;
          border: 1px solid rgba(176, 141, 87, 0.18);
          background: rgba(10, 14, 12, 0.12);
        }

        .eh-trend__k {
          font-size: 10px;
          font-weight: 900;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: rgba(216, 207, 192, 0.55);
        }

        .eh-trend__v {
          margin-top: 8px;
          font-size: 13px;
          font-weight: 900;
          color: rgba(243, 235, 221, 0.9);
        }

        /* Crash card */
        .eh-crash {
          border-radius: 16px;
          border: 1px solid rgba(176, 141, 87, 0.18);
          background: rgba(10, 14, 12, 0.12);
          padding: 14px;
          text-align: center;
        }

        .eh-crash__k {
          font-size: 10px;
          font-weight: 900;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: rgba(194, 161, 77, 0.75);
          margin-bottom: 10px;
        }

        .eh-crash__v {
          font-size: 28px;
          font-weight: 900;
          color: rgba(243, 235, 221, 0.95);
        }

        .eh-crash__sub {
          margin-top: 8px;
          font-size: 12px;
          color: rgba(216, 207, 192, 0.6);
        }

        .eh-miniBar {
          margin-top: 12px;
          height: 12px;
          border-radius: 999px;
          overflow: hidden;
          display: flex;
          background: rgba(10, 14, 12, 0.2);
          border: 1px solid rgba(176, 141, 87, 0.16);
        }

        .eh-miniBar__yes {
          background: linear-gradient(90deg, rgba(194, 161, 77, 0.95), rgba(176, 141, 87, 0.55));
        }

        .eh-miniBar__no {
          background: linear-gradient(90deg, rgba(216, 207, 192, 0.18), rgba(10, 14, 12, 0.3));
        }

        .eh-miniBarLegend {
          margin-top: 8px;
          display: flex;
          justify-content: space-between;
          font-size: 12px;
          font-weight: 900;
          letter-spacing: 0.06em;
        }

        .eh-yes {
          color: rgba(194, 161, 77, 0.9);
        }

        .eh-no {
          color: rgba(216, 207, 192, 0.6);
        }

        /* Desktop header row */
        .eh-tableHead {
          display: none;
          grid-template-columns: 4fr 1.2fr 1.2fr 1.6fr 1.5fr;
          gap: 10px;
          padding: 12px 14px;
          font-size: 10px;
          font-weight: 900;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: rgba(216, 207, 192, 0.55);
          border-radius: 16px;
          border: 1px solid rgba(176, 141, 87, 0.18);
          background: rgba(10, 14, 12, 0.12);
          margin-bottom: 10px;
        }

        @media (min-width: 980px) {
          .eh-tableHead {
            display: grid;
          }
        }

        /* Accordion rows */
        .eh-acc {
          display: grid;
          gap: 10px;
        }

        .eh-rowAcc {
          border-radius: 16px;
          border: 1px solid rgba(176, 141, 87, 0.18);
          background: rgba(10, 14, 12, 0.12);
          overflow: hidden;
        }

        .eh-rowAcc--open {
          border-color: rgba(194, 161, 77, 0.35);
          background: rgba(10, 14, 12, 0.14);
        }

        .eh-rowAcc__summary {
          width: 100%;
          border: 0;
          background: transparent;
          cursor: pointer;
          padding: 14px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          text-align: left;
        }

        .eh-rowAcc__left {
          min-width: 0;
        }

        .eh-rowAcc__right {
          display: flex;
          align-items: center;
          gap: 10px;
          flex-shrink: 0;
        }

        .eh-rowAcc__chev {
          width: 34px;
          height: 34px;
          border-radius: 12px;
          border: 1px solid rgba(176, 141, 87, 0.18);
          background: rgba(10, 14, 12, 0.12);
          display: inline-flex;
          align-items: center;
          justify-content: center;
          font-weight: 900;
          color: rgba(243, 235, 221, 0.75);
        }

        .eh-rowAcc__details {
          padding: 12px 14px 14px;
          border-top: 1px solid rgba(176, 141, 87, 0.12);
        }

        .eh-rowAcc__grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 12px;
          margin-top: 12px;
        }

        @media (min-width: 720px) {
          .eh-rowAcc__grid {
            grid-template-columns: 1fr 1fr;
          }
        }

        .eh-detailBlock {
          border-radius: 16px;
          border: 1px solid rgba(176, 141, 87, 0.18);
          background: rgba(10, 14, 12, 0.12);
          padding: 12px;
        }

        .eh-detailBlock__k {
          font-size: 10px;
          font-weight: 900;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: rgba(216, 207, 192, 0.55);
          margin-bottom: 10px;
        }

        .eh-rowAcc__meta {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
        }

        .eh-metaPill {
          display: inline-flex;
          align-items: baseline;
          gap: 10px;
          padding: 10px 12px;
          border-radius: 999px;
          border: 1px solid rgba(176, 141, 87, 0.18);
          background: rgba(10, 14, 12, 0.12);
        }

        .eh-metaPill__k {
          font-size: 10px;
          font-weight: 900;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: rgba(216, 207, 192, 0.55);
        }

        .eh-metaPill__v {
          font-size: 12px;
          font-weight: 900;
          color: rgba(243, 235, 221, 0.9);
        }

        .eh-chipPill {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 10px 12px;
          border-radius: 999px;
          border: 1px solid rgba(176, 141, 87, 0.18);
          background: rgba(10, 14, 12, 0.12);
          font-size: 11px;
          font-weight: 900;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: rgba(216, 207, 192, 0.65);
          white-space: nowrap;
        }

        .eh-league {
          font-size: 10px;
          font-weight: 900;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: rgba(176, 141, 87, 0.85);
          display: inline-flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 8px;
        }

        .eh-liveDot {
          width: 8px;
          height: 8px;
          border-radius: 999px;
          background: #c2a14d;
          box-shadow: 0 0 0 4px rgba(194, 161, 77, 0.16);
          display: inline-block;
        }

        .eh-teams {
          display: grid;
          gap: 6px;
        }

        .eh-team {
          font-size: 13px;
          font-weight: 900;
          color: rgba(243, 235, 221, 0.92);
        }

        .eh-team--muted {
          color: rgba(216, 207, 192, 0.7);
        }

        .eh-oddsBtns {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
          justify-content: flex-start;
        }

        .eh-oddBtn {
          width: 86px;
          padding: 10px 10px;
          border-radius: 14px;
          border: 1px solid rgba(194, 161, 77, 0.28);
          background: rgba(10, 14, 12, 0.12);
          cursor: pointer;
          transition: transform 120ms ease, border-color 120ms ease, background 120ms ease;
        }

        .eh-oddBtn:hover {
          transform: translateY(-1px);
          border-color: rgba(194, 161, 77, 0.55);
          background: rgba(194, 161, 77, 0.06);
        }

        .eh-oddBtn__k {
          font-size: 10px;
          font-weight: 900;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: rgba(216, 207, 192, 0.55);
        }

        .eh-oddBtn__v {
          margin-top: 6px;
          font-size: 14px;
          font-weight: 900;
          color: rgba(243, 235, 221, 0.95);
        }

        .eh-status {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 10px 12px;
          border-radius: 999px;
          border: 1px solid rgba(176, 141, 87, 0.18);
          background: rgba(10, 14, 12, 0.12);
          font-size: 11px;
          font-weight: 900;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: rgba(216, 207, 192, 0.65);
          min-width: 118px;
          white-space: nowrap;
        }

        .eh-status--live {
          border-color: rgba(194, 161, 77, 0.45);
          color: rgba(243, 235, 221, 0.92);
          background: rgba(194, 161, 77, 0.08);
        }

        .eh-balls {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
        }

        .eh-ball {
          width: 38px;
          height: 38px;
          border-radius: 999px;
          border: 1px solid rgba(176, 141, 87, 0.22);
          background: rgba(10, 14, 12, 0.12);
          display: inline-flex;
          align-items: center;
          justify-content: center;
          font-weight: 900;
          color: rgba(243, 235, 221, 0.9);
        }

        .eh-mutedBlock {
          border-radius: 16px;
          border: 1px solid rgba(176, 141, 87, 0.18);
          background: rgba(10, 14, 12, 0.12);
          padding: 12px;
          color: rgba(216, 207, 192, 0.6);
          font-size: 12px;
          line-height: 1.5;
        }

        .eh-crashInline {
          margin-top: 12px;
          border-radius: 16px;
          border: 1px solid rgba(176, 141, 87, 0.18);
          background: rgba(10, 14, 12, 0.12);
          padding: 12px;
        }

        .eh-crashInline__k {
          font-size: 10px;
          font-weight: 900;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: rgba(216, 207, 192, 0.55);
        }

        .eh-crashInline__v {
          margin-top: 6px;
          font-size: 20px;
          font-weight: 900;
          color: rgba(243, 235, 221, 0.95);
        }

        .eh-crashInline__sub {
          margin-top: 6px;
          font-size: 12px;
          color: rgba(216, 207, 192, 0.6);
        }

        /* KPIs */
        .eh-statsGrid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 12px;
          margin-top: 14px;
        }

        @media (min-width: 768px) {
          .eh-statsGrid {
            grid-template-columns: repeat(4, 1fr);
          }
        }

        .eh-stat__k {
          font-size: 11px;
          font-weight: 900;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: rgba(216, 207, 192, 0.55);
        }

        .eh-stat__v {
          margin-top: 10px;
          font-size: 26px;
          font-weight: 900;
          color: rgba(243, 235, 221, 0.95);
        }

        .eh-stat__sub {
          margin-top: 8px;
          font-size: 12px;
          color: rgba(194, 161, 77, 0.75);
          letter-spacing: 0.08em;
          text-transform: uppercase;
          font-weight: 900;
        }

        /* Bet slip */
        .eh-sticky {
          position: sticky;
          top: 86px;
        }

        .eh-empty {
          border-radius: 16px;
          border: 1px solid rgba(176, 141, 87, 0.18);
          background: rgba(10, 14, 12, 0.12);
          padding: 16px;
          text-align: center;
        }

        .eh-empty__k {
          font-weight: 900;
          color: rgba(243, 235, 221, 0.9);
          letter-spacing: 0.06em;
        }

        .eh-empty__sub {
          margin-top: 6px;
          font-size: 12px;
          color: rgba(216, 207, 192, 0.6);
        }

        .eh-slipList {
          display: grid;
          gap: 10px;
          max-height: 330px;
          overflow: auto;
          padding-right: 4px;
        }

        .eh-slipItem {
          border-radius: 16px;
          border: 1px solid rgba(176, 141, 87, 0.18);
          background: rgba(10, 14, 12, 0.12);
          padding: 12px;
        }

        .eh-slipItem__top {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 10px;
        }

        .eh-slipItem__match {
          font-size: 11px;
          color: rgba(216, 207, 192, 0.6);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .eh-slipItem__sel {
          margin-top: 6px;
          font-weight: 900;
          color: rgba(243, 235, 221, 0.9);
        }

        .eh-x {
          border: 1px solid rgba(176, 141, 87, 0.18);
          background: rgba(10, 14, 12, 0.12);
          color: rgba(216, 207, 192, 0.65);
          width: 30px;
          height: 30px;
          border-radius: 12px;
          cursor: pointer;
        }

        .eh-x:hover {
          border-color: rgba(194, 161, 77, 0.45);
          color: rgba(243, 235, 221, 0.85);
        }

        .eh-slipItem__odds {
          margin-top: 10px;
          font-size: 18px;
          font-weight: 900;
          color: rgba(243, 235, 221, 0.95);
        }

        .eh-slipTotals {
          margin-top: 14px;
          padding-top: 14px;
          border-top: 1px solid rgba(176, 141, 87, 0.16);
          display: grid;
          gap: 10px;
        }

        .eh-slipTotals__row {
          display: flex;
          justify-content: space-between;
          gap: 10px;
          color: rgba(216, 207, 192, 0.6);
          font-size: 13px;
        }

        .eh-gold {
          color: rgba(194, 161, 77, 0.95) !important;
          font-weight: 900;
        }

        .eh-input {
          width: 100%;
          padding: 12px 12px;
          font-size: 14px;
          font-weight: 900;
          border-radius: 14px;
          border: 1px solid rgba(176, 141, 87, 0.22);
          background: rgba(10, 14, 12, 0.18);
          color: rgba(243, 235, 221, 0.95);
          outline: none;
        }

        .eh-input::placeholder {
          color: rgba(216, 207, 192, 0.25);
        }

        .eh-input:focus {
          border-color: rgba(194, 161, 77, 0.45);
          box-shadow: 0 0 0 4px rgba(194, 161, 77, 0.12);
        }

        .eh-action {
          width: 100%;
          border: 1px solid rgba(176, 141, 87, 0.6);
          background: linear-gradient(180deg, rgba(194, 161, 77, 0.14), rgba(176, 141, 87, 0.04));
          color: rgba(243, 235, 221, 0.95);
          border-radius: 16px;
          padding: 14px;
          font-size: 12px;
          font-weight: 900;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          cursor: pointer;
          box-shadow: 0 18px 55px rgba(0, 0, 0, 0.55);
        }

        .eh-action:hover {
          border-color: rgba(194, 161, 77, 0.8);
          box-shadow: 0 18px 75px rgba(0, 0, 0, 0.7);
        }

        .eh-fineprint {
          font-size: 12px;
          color: rgba(216, 207, 192, 0.45);
          text-align: center;
          font-style: italic;
          margin-top: 6px;
        }

        /* Background layers */
        .eh-wallpaper {
          background-image: radial-gradient(circle at 25% 20%, rgba(194, 161, 77, 0.06), transparent 55%),
            radial-gradient(circle at 70% 60%, rgba(15, 92, 74, 0.07), transparent 60%),
            radial-gradient(circle at 40% 85%, rgba(90, 31, 43, 0.05), transparent 60%);
          filter: blur(0.2px);
        }

        .eh-decoLines {
          background-image: linear-gradient(to right, rgba(176, 141, 87, 0.2) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(176, 141, 87, 0.2) 1px, transparent 1px);
          background-size: 60px 60px;
          opacity: 0.4;
          mix-blend-mode: overlay;
        }
      `}</style>
        </div>
    );
}
