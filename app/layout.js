import "./globals.css";
import localFont from "next/font/local";

const Despairs = localFont({
  src: "./fonts/Despairs.ttf",
  variable: "--font-despairs",
});

export const metadata = {
  title: "Alexis GERMAIN",
  description: "Alexis GERMAIN - Web Developer based in Paris",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body className={`${Despairs.variable}`}>{children}</body>
    </html>
  );
}
