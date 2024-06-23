import type { Metadata } from "next";
import "./globals.css";
import Header from "./components/Header";

export const metadata: Metadata = {
    title: "Scorpio"
};

function Layout({
    children
}: {
    children: React.ReactNode
}) {
    return (
        <div className="flex flex-col items-stretch min-h-screen">
            <Header />
            <main className="grow">
                {children}
            </main>
        </div>
    );
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body>
                <Layout>
                    {children}
                </Layout>
            </body>
        </html>
    );
}
