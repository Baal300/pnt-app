export const PokemonCardSkeleton = () => {
    return (
        <div className="card m-0.5 h-64 w-42 flex-col items-center bg-gray-300 p-2 text-center">
            <div className="skeleton mx-2 mt-3 flex h-28 w-28 flex-row items-center justify-center"></div>

            <div className="card-body join join-vertical flex w-full flex-col gap-4">
                <div className="skeleton join-item flex h-4 w-3/4 flex-row items-center justify-between"></div>
                <div className="skeleton join-item flex h-4 w-full flex-row items-center justify-between"></div>
                <div className="skeleton join-item flex h-4 w-full flex-row items-center justify-between"></div>
            </div>
        </div>
    );
};
