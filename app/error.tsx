"use client";
import { useEffect } from "react";

export default function ErrorPage({
    error
}: {
    error: Error & { message: string, digest?: string }
}) {
    useEffect(() => {
      console.error("Unhandled error", error);
    }, [error]);

    return (
        <div>
            <h2> Something went wrong </h2>
            <p> Try again later </p>
        </div>
    );
}