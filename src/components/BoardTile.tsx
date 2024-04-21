import type { ComponentPropsWithoutRef } from "react";

import treasureVideo from "~/assets/videos/intro.mp4";
import lavaVideo from "~/assets/videos/lava.mp4";
import { cn } from "~/utils/cn.ts";

type BoardTileProps = ComponentPropsWithoutRef<"button"> & Readonly<{
    index: number;
    isLava?: boolean;
    disabled?: boolean;
    isFlaggedBy?: "player" | "opponent";
}>;

export default function BoardTile({ index, isLava, disabled, isFlaggedBy, ...props }: BoardTileProps) {
    return (
        <button
            type="button"
            disabled={disabled}
            tabIndex={-1}
            className={cn(
                "relative h-26 w-26 select-none overflow-clip border border-dark-200 rounded-xl flex bg-dark-400 transition",
                disabled ? "cursor-not-allowed op-20" : "group cursor-pointer hover:(z-10 scale-130 shadow-xl) active:(scale-120 shadow-2xl)",
            )}
            {...props}
        >
            {isLava && (
                <div className="absolute inset-0 bg-red-500/70">
                    <video autoPlay loop muted tabIndex={-1} className="relative h-full w-full object-cover">
                        <source src={lavaVideo} />
                    </video>

                    <div className="absolute inset-0 op-0 transition group-hover:(op-100 backdrop-blur-sm)" />
                </div>
            )}

            {!isLava && isFlaggedBy && (
                <div className="absolute inset-0">
                    <video autoPlay loop muted tabIndex={-1} className="relative h-full w-full object-cover">
                        <source src={treasureVideo} />
                    </video>

                    <div className="absolute inset-0 op-0 transition group-hover:(op-100 backdrop-blur-sm)" />
                </div>
            )}

            <div className="relative h-full w-full flex items-center justify-center">
                {!isLava && (
                    <div className="i-flowbite-flag-outline size-8 text-light-50/10" />
                )}
            </div>

            <div className="absolute right-3 top-3 z-1 min-w-6 rounded bg-white px-1 py-0.8 text-center text-xs text-dark-800 font-black leading-none font-mono shadow-xl">
                {index}
            </div>

            {isFlaggedBy && (
                <div className={cn(
                    "absolute bottom-1 left-1 z-1 size-6 flex items-center justify-center rounded-lg shadow-xl",
                    isFlaggedBy === "player" ? "bg-blue-500" : "bg-red-500",
                )}
                >
                    <div className="i-flowbite-flag-outline size-4 text-white" />
                </div>
            )}
        </button>
    );
}
