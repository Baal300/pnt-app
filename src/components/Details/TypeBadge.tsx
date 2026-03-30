type TypeBadgeProps = {
    src: string;
    alt: string;
};

export const TypeBadge = ({ src, alt }: TypeBadgeProps) => {
    return (
        <div className="mt-2 mb-2">
            <img src={src} alt={alt} />
        </div>
    );
};
