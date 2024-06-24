import type { Metadata } from "next";
import Header from "./components/Header";
import "./globals.css";

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

            <div id="toasts" className="fixed bottom-8 right-8 max-w-lg"></div>
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
