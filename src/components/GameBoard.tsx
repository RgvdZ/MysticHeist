import ConfettiExplosion from "react-confetti-explosion";

import BoardTile from "~/components/BoardTile.tsx";
import { cn } from "~/utils/cn.ts";

type GameBoardProps = Readonly<{
    possibleNumbers: boolean[];
    history: Array<{ move: number; player: "player" | "opponent" }>;
    makeMove: (index: number) => void;
    winner: "player" | "opponent" | null;
}>;

export default function GameBoard({ possibleNumbers, makeMove, winner, history }: GameBoardProps) {
    return (
        <div className="relative">
            <div className="relative grid grid-cols-[repeat(10,1fr)] h-fit w-fit gap-2 border-2 border-dark-300 rounded-3xl bg-dark-500 p-4 shadow-black/5 shadow-xl">
                {possibleNumbers && possibleNumbers.map((available, number) => (
                    number > 0
                    && <BoardTile key={number} index={number} isLava={number === 1} disabled={!available} onClick={() => makeMove(number)} isFlaggedBy={history.find(({ move }) => move === number)?.player} />
                ))}
            </div>

            <div
                className={cn(
                    "absolute transition pointer-events-none op-0 inset-0 flex flex-col items-center justify-center rounded-3xl backdrop-blur-sm",
                    winner && "op-100 pointer-events-auto",
                )}
            >
                {winner && (
                    <div className="flex flex-col items-center justify-center">
                        <div className="flex shrink-0 items-center justify-center">
                            <img
                                src={`https://api.dicebear.com/8.x/avataaars-neutral/svg?seed=${winner === "player" ? "denish+sharma" : "rugved+patil"}`}
                                alt={winner}
                                className="h-40 w-40 border border-dark-100 rounded-full"
                            />
                        </div>

                        <div className="mt-8 flex-grow text-4xl font-medium">
                            {winner === "player" ? "Denish Sharma" : "Rugved Patil"}
                            {" "}
                            wins!
                        </div>

                        <button
                            type="button"
                            className="mt-8 border border-emerald rounded-lg bg-emerald-8 px-6 py-2 text-lg font-semibold shadow-xl"
                            onClick={() => window.location.reload()}
                        >
                            Play Again
                        </button>
                    </div>
                )}

                {winner && (
                    <ConfettiExplosion
                        force={0.8}
                        particleCount={300}
                        duration={3000}
                        width={window.innerWidth}
                        height={window.innerHeight}
                    />
                )}
            </div>
        </div>
    );
}
