import { useEffect, useState } from "react";
import { PokemonCardSkeleton } from "./PokemonCardSkeleton";

type PokemonGallerySkeletonProps = {
    cardCount?: number;
    rows?: number;
};

const BREAKPOINT_GALLERY_3_COLS = 576;
const BREAKPOINT_GALLERY_4_COLS = 640;
const BREAKPOINT_GALLERY_5_COLS = 1024;
const BREAKPOINT_GALLERY_6_COLS = 1280;
const BREAKPOINT_GALLERY_7_COLS = 1488;
const BREAKPOINT_GALLERY_8_COLS = 1648;

const getResponsiveCardCount = (rows: number) => {
    if (typeof window === "undefined") {
        // SSR fallback
        return rows * 4;
    }

    const width = window.innerWidth;
    let columns;

    // Change column numbers based on breakpoints
    if (width < BREAKPOINT_GALLERY_3_COLS) {
        columns = 2;
    } else if (width < BREAKPOINT_GALLERY_4_COLS) {
        columns = 3;
    } else if (width < BREAKPOINT_GALLERY_5_COLS) {
        columns = 4;
    } else if (width < BREAKPOINT_GALLERY_6_COLS) {
        columns = 5;
    } else if (width < BREAKPOINT_GALLERY_7_COLS) {
        columns = 6;
    } else if (width < BREAKPOINT_GALLERY_8_COLS) {
        columns = 7;
    } else {
        columns = 8;
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
        <div aria-busy="true" aria-live="polite" className="gallery">
            {Array.from({ length: finalCardCount }).map((_, i) => (
                <PokemonCardSkeleton key={i} />
            ))}
        </div>
    );
};
