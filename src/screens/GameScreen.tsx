import { OverlayScrollbarsComponent } from "overlayscrollbars-react";
import { useReducer } from "react";

import GameBoard from "~/components/GameBoard.tsx";
import { calculateSumsOfMoves, removeBadOptions } from "~/core/logic.ts";

const MAX_NUMBER_AVAILABLE = 100;

interface State {
    moves: number[];
    sumsOfMoves: Set<number>;
    possibleNumbers: boolean[];
    gameOver: boolean;
    winner: "player" | "opponent" | null;
    currentPlayer: "player" | "opponent";
    history: Array<{
        player: "player" | "opponent";
        move: number;
    }>;
}

function handleMoves(state: State, move: number): State {
    let { moves, sumsOfMoves, possibleNumbers, gameOver, winner, currentPlayer, history } = state;

    moves.push(move);
    sumsOfMoves = calculateSumsOfMoves(moves, sumsOfMoves);
    possibleNumbers = removeBadOptions(moves, sumsOfMoves, possibleNumbers);

    history = [{ player: currentPlayer, move }, ...history];

    if (move === 1) {
        gameOver = true;
        winner = currentPlayer === "player" ? "opponent" : "player";
    }

    currentPlayer = currentPlayer === "player" ? "opponent" : "player";

    return { moves, sumsOfMoves, possibleNumbers, gameOver, winner, currentPlayer, history };
}

export default function GameScreen() {
    const [{ history, possibleNumbers, currentPlayer, gameOver, winner }, makeMove] = useReducer(handleMoves, {
        moves: [],
        sumsOfMoves: new Set<number>(),
        possibleNumbers: Array.from<boolean>({ length: MAX_NUMBER_AVAILABLE + 1 }).fill(true),
        gameOver: false,
        winner: null,
        currentPlayer: "player",
        history: [],
    });

    return (
        <div className="flex overflow-hidden h-dvh divide-x divide-dark-400">
            <OverlayScrollbarsComponent defer className="grow" options={{ overflow: { y: "scroll", x: "scroll" } }}>
                <div className="min-h-full flex flex-col justify-center">
                    <div className="m-a my-a h-fit w-fit p-20">
                        <GameBoard possibleNumbers={possibleNumbers} makeMove={makeMove} winner={winner} history={history} />
                    </div>
                </div>
            </OverlayScrollbarsComponent>

            <div className="min-w-sm flex shrink-0 flex-col bg-amber bg-dark-600 divide-y divide-dark-300">
                <div className="flex flex-col gap-4 bg-dark-500 p-6 shadow-2xl shadow-dark-900/10">
                    <div
                        data-is-current={currentPlayer === "player" && !gameOver}
                        className="group flex items-center gap-4 border border-dark-300 rounded-xl bg-dark-400 px-4 py-3 leading-none transition data-[is-current=true]:(border-blue-500 bg-blue-500/10)"
                    >
                        <div className="flex shrink-0 items-center justify-center">
                            <img src="https://api.dicebear.com/8.x/avataaars-neutral/svg?seed=denish+sharma" alt="player" className="h-6 w-6 border border-dark-100 rounded-full" />
                        </div>
                        <div className="flex-grow text-sm font-medium">
                            Denish Sharma
                        </div>

                        <div className="flex shrink-0 items-center gap-2">
                            <div className="rounded-md bg-dark-100 px-2 py-1.2 text-xs font-semibold leading-none tracking-wide uppercase transition group-data-[is-current=true]:(bg-blue-600)">
                                Moves:
                                {" "}
                                {history.filter(({ player }) => player === "player").length}
                            </div>
                        </div>
                    </div>

                    <div
                        data-is-current={currentPlayer === "opponent" && !gameOver}
                        className="group flex items-center gap-4 border border-dark-300 rounded-xl bg-dark-400 px-4 py-3 leading-none transition data-[is-current=true]:(border-red-500 bg-red-500/10)"
                    >
                        <div className="flex shrink-0 items-center justify-center">
                            <img src="https://api.dicebear.com/8.x/avataaars-neutral/svg?seed=rugved+patil" alt="opponent" className="h-6 w-6 border border-dark-100 rounded-full" />
                        </div>
                        <div className="flex-grow text-sm font-medium">
                            Rugved Patil
                        </div>

                        <div className="flex shrink-0 items-center gap-2">
                            <div className="rounded-md bg-dark-100 px-2 py-1.2 text-xs font-semibold leading-none tracking-wide uppercase transition group-data-[is-current=true]:(bg-red-600)">
                                Moves:
                                {" "}
                                {history.filter(({ player }) => player === "opponent").length}
                            </div>
                        </div>
                    </div>
                </div>

                <OverlayScrollbarsComponent defer className="min-w-sm grow">
                    <div className="flex flex-col gap-y-4 p-6">
                        {gameOver && (
                            <>

                                <div className="flex items-center gap-4">
                                    <div className="flex shrink-0 items-center justify-center">
                                        <img
                                            src={`https://api.dicebear.com/8.x/avataaars-neutral/svg?seed=${winner === "player" ? "denish+sharma" : "rugved+patil"}`}
                                            alt={winner ?? "player"}
                                            className="h-6 w-6 border border-dark-100 rounded-full"
                                        />
                                    </div>

                                    <div className="flex-grow text-sm font-medium">
                                        {winner === "player" ? "Denish Sharma" : "Rugved Patil"}
                                        {" "}
                                        <span className="ml-2 op-40">won the game!</span>
                                    </div>
                                </div>

                                <div className="mb-3 h-px w-full bg-dark-300" />
                            </>
                        )}

                        {history.map(({ player, move }, index) => (
                            <div key={index} className="flex items-center gap-4">
                                <div className="flex shrink-0 items-center justify-center">
                                    <img
                                        src={`https://api.dicebear.com/8.x/avataaars-neutral/svg?seed=${player === "player" ? "denish+sharma" : "rugved+patil"}`}
                                        alt={player}
                                        className="h-6 w-6 border border-dark-100 rounded-full"
                                    />
                                </div>

                                <div className="flex-grow text-sm font-medium">
                                    {player === "player" ? "Denish Sharma" : "Rugved Patil"}
                                    {" "}
                                    <span className="ml-2 op-40">selected</span>
                                    {" "}
                                    <span className="ml-2 rounded-md bg-dark-100 px-2 py-1.2 text-xs font-semibold leading-none tracking-wide uppercase transition">{move}</span>
                                </div>
                            </div>
                        ))}

                        <div className="mt-2 w-full gap-4 text-center text-sm op-50">
                            Game has started!
                        </div>
                    </div>
                </OverlayScrollbarsComponent>
            </div>
        </div>
    );
}
