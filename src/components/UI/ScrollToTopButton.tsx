import { useState } from "react";

type ScrollToTopButtonProps = {
    className?: string;
};

export const ScrollToTopButton = ({ className }: ScrollToTopButtonProps) => {
    const [showButton, setShowButton] = useState(false);

    window.onscroll = () => {
        showScrollButton();
    };

    const showScrollButton = () => {
        if (
            document.body.scrollTop > 300 ||
            document.documentElement.scrollTop > 300
        ) {
            setShowButton(true);
        } else {
            setShowButton(false);
        }
    };

    const handleScrollToTop = () => {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    };

    return (
        <>
            {showButton && (
                <button
                    className={`btn btn-circle btn-xl btn-primary opacity-85 ${className}`}
                    onClick={handleScrollToTop}
                    aria-label="Scroll to top"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        className="size-6"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M8.25 6.75 12 3m0 0 3.75 3.75M12 3v18"
                        />
                    </svg>
                </button>
            )}
        </>
    );
};
