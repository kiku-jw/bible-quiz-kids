import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "@/styles/globals.css";

const nunito = Nunito({
    subsets: ["latin", "cyrillic"],
    variable: "--font-nunito",
});

export const metadata: Metadata = {
    title: "Біблійна Вікторина: Подорож у часи царя Йосії та пророка Єремії",
    description: "Захоплююча подорож для дітей! Дізнайся більше про вірних слуг Єгови через цікаві питання та яскраві акварельні ілюстрації.",
    alternates: {
        canonical: "https://kiku-jw.github.io/bible-quiz-kids/",
    },
    openGraph: {
        title: "Біблійна Вікторина для дітей 📖✨",
        description: "Вирушай у подорож біблійними часами разом із Йосією та Єремією!",
        url: "https://kiku-jw.github.io/bible-quiz-kids/",
        siteName: "Bible Quiz for Kids",
        images: [
            {
                url: "https://kiku-jw.github.io/bible-quiz-kids/images/og-preview.png",
                width: 1200,
                height: 630,
                alt: "Біблійна Вікторина: Йосія та Єремія",
            },
        ],
        locale: "uk_UA",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Біблійна Вікторина для дітей 📖✨",
        description: "Захоплююча подорож біблійними часами!",
        images: ["https://kiku-jw.github.io/bible-quiz-kids/images/og-preview.png"],
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="uk" className={`${nunito.variable} font-sans`}>
            <body>{children}</body>
        </html>
    );
}
