import type { Metadata } from "next";
import { Inter, Tomorrow, Unbounded, Indie_Flower, Space_Grotesk, Manrope } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import SmoothScrollProvider from "@/providers/SmoothScrollProvider";
import { ThemeProvider } from "@/providers/ThemeProvider";

const barlowCondensed = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-heading",
});

const inter = Manrope({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-sans",
});

const dancingScript = Indie_Flower({
  subsets: ["latin"],
  variable: "--font-cursive",
  weight: ["400"],
})

const tomorrow = Tomorrow({
  subsets: ["latin"],
  variable: "--font-tomorrow",
  weight: ["400", "500", "600", "700"],
})



export const metadata: Metadata = {
  title: "UPFRAME -- Get your thougths closer to you.",
  description: "We build digital products that convert visitors into clients. Clean code, considered craft.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        "h-full",
        "antialiased",
        barlowCondensed.variable,
        inter.variable,
        dancingScript.variable,
        tomorrow.variable,
      )}
    >
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          storageKey="theme"
        >
          <SmoothScrollProvider>
            {children}
          </SmoothScrollProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}