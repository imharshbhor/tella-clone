export function EmptyClips({ n }: { n: number }) {
    return (
        <>
            {Array.from({ length: n }, (_, index) => (
                <div key={index} className="flex relative items-center mb-3 mr-2 h-10 bg-white rounded-lg w-36.5 border-dashed border-2"></div>
            ))}
        </>
    );
}
