export default function List<T> ({
    data,
    Component
}: {
    data: T[],
    Component: React.ComponentType<{
        expand: boolean,
        record: T
    }>
}) {
    return (
        <div className="p-2 max-w-2xl mx-auto flex flex-col gap-4">
            {data.length === 0 && (
                <p>
                    No records Found
                </p>
            )}
            
            {data.map((record, idx) => (
                <Component key={idx} expand={false} record={record} />
            ))}
        </div>
    );
}