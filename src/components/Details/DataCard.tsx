type DataCardProps = {
    title: string;
    children?: React.ReactNode;
};

export const DataCard = ({ title, children }: DataCardProps) => {
    return (
        <div className="card bg-info-box-background w-full">
            <div className="card-body p-0">
                <h2 className="card-title rounded-t-box w-full bg-green-300 p-2 text-lg md:text-2xl">
                    {title}
                </h2>
                {children}
            </div>
        </div>
    );
};
