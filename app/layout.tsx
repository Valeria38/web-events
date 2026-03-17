import type { Metadata } from "next";
import { Geist, Schibsted_Grotesk, Martian_Mono } from "next/font/google";
import "./globals.css";
import LightRays from "@/components/bg/LightRays";

const schibstedGrotesk = Schibsted_Grotesk({
    variable: "--font-schibsted-grotesk",
    subsets: ["latin"],
});

const martianMono = Martian_Mono({
    variable: "--font-martian-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "DevEvent",
    description: "The Hub for Every Dev Event You Should'nt Miss",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html
            lang="en"
            className={`${schibstedGrotesk.variable} ${martianMono.variable} h-full min-h-screen antialiased`}
        >
            <body className="min-h-full flex flex-col">
                <div className="absolute inset-0 z-[-1] min-h-screen">
                    <LightRays
                        raysOrigin="top-center"
                        raysColor="#5dfeca"
                        raysSpeed={0.5}
                        lightSpread={0.9}
                        rayLength={1.4}
                        followMouse={true}
                        mouseInfluence={0.02}
                        noiseAmount={0}
                        distortion={0.01}
                        pulsating={false}
                        fadeDistance={1}
                        saturation={1}
                    />
                </div>
                <main>{children}</main>
            </body>
        </html>
    );
}
