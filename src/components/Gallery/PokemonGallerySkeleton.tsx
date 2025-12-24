import { useEffect, useState } from "react";
import { PokemonCardSkeleton } from "./PokemonCardSkeleton";

type PokemonGallerySkeletonProps = {
    cardCount?: number;
    rows?: number;
};

const getResponsiveCardCount = (rows: number) => {
    if (typeof window === "undefined") {
        // SSR fallback
        return rows * 4;
    }

    const width = window.innerWidth;
    let columns;

    // Change column numbers based on breakpoints
    if (width < 576) {
        columns = 2;
    } else if (width < 640) {
        columns = 3;
    } else if (width < 1024) {
        columns = 4;
    } else if (width < 1280) {
        columns = 5;
    } else {
        columns = 6;
    }

    // Card count is columns * rows
    return columns * rows;
};

export const PokemonGallerySkeleton = ({
    cardCount,
    rows = 3,
}: PokemonGallerySkeletonProps) => {
    const [responsiveCardCount, setResponsiveCardCount] = useState(() =>
        getResponsiveCardCount(rows),
    );

    // Listen for window resize
    useEffect(() => {
        //
        const handleResize = () => {
            setResponsiveCardCount(getResponsiveCardCount(rows));
        };

        window.addEventListener("resize", handleResize);

        // Cleanup listener on unmount
        return () => window.removeEventListener("resize", handleResize);
    }, [rows]); // Re-run if rows prop changes

    const finalCardCount = cardCount ?? responsiveCardCount;

    return (
        <div
            aria-busy="true"
            aria-live="polite"
            className="xs:p-3 grid w-full grid-cols-[repeat(auto-fill,_minmax(10.5rem,_1fr))] justify-center justify-items-center gap-x-3 gap-y-1 md:grid-cols-[repeat(4,_10.5rem)] lg:grid-cols-[repeat(5,_10.5rem)] xl:grid-cols-[repeat(6,_10.5rem)]"
        >
            {Array.from({ length: finalCardCount }).map((_, i) => (
                <PokemonCardSkeleton key={i} />
            ))}
        </div>
    );
};
