import Link from "next/link";

export default function Error({
    message,
    statusCode
}: {
    message: string,
    statusCode: 404|500
}) {
    let title: string;
    
    switch (statusCode) {
        case 404: {
            title = "You seem lost.";
            break;
        }
        case 500: {
            title = "Something went wrong.";
            break;
        }
    };

    return (
        <div className="p-2">
            <h2 className="text-2xl"> {title} </h2>

            <p className="text-red-500"> {message} </p>

            {statusCode === 404 && (
                <Link href="/" className="underline">
                    Go home
                </Link>
            )}
            
            {statusCode === 500 && (
                <p>
                    Please try again later
                </p>
            )}
        </div>
    );
}