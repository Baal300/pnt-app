type DataCardProps = {
    title: string;
};

export const DataCard = ({ title }: DataCardProps) => {
    return (
        <div className="card bg-info-box-background w-full">
            <div className="card-body p-0">
                <h2 className="card-title rounded-t-box w-full bg-green-300 p-2 text-lg md:text-2xl">
                    {title}
                </h2>
                <p className="pt-1 pr-2 pb-1 pl-2">PLACEHOLDER</p>
            </div>
        </div>
    );
};
