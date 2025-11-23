import { useEffect, useState } from "react";
import { PokemonCardSkeleton } from "./PokemonCardSkeleton";

type PokemonGallerySkeletonProps = {
    cardCount?: number;
    rows?: number;
};

const getResponsiveCardCount = (rows: number) => {
    const width = window.innerWidth;
    let columns;

    if (width < 576) {
        columns = 2;
    } else if (width < 640) {
        columns = 3;
    } else if (width < 1024) {
        columns = 4;
    } else {
        columns = 6;
    }

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
        const handleResize = () => {
            setResponsiveCardCount(getResponsiveCardCount(rows));
        };

        window.addEventListener("resize", handleResize);

        // Cleanup listener on unmount
        return () => window.removeEventListener("resize", handleResize);
    }, [rows]); // Re-run if rows prop changes

    const finalCardCount = cardCount ?? responsiveCardCount;

    return (
        <div className="xs:p-3 lg grid w-full grid-cols-[repeat(auto-fill,_minmax(9.25rem,_1fr))] justify-center gap-x-2 gap-y-2 md:grid-cols-[repeat(4,_minmax(9rem,_11rem))] lg:grid-cols-[repeat(6,_minmax(9rem,_11rem))]">
            {Array.from({ length: finalCardCount }).map((_, i) => (
                <PokemonCardSkeleton key={i} />
            ))}
        </div>
    );
};
