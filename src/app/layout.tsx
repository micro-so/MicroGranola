import type { Metadata } from "next";
import { Inter, Source_Serif_4 } from "next/font/google";
import { missingCredentials } from "@/lib/micro";
import { Providers } from "@/components/providers";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const serif = Source_Serif_4({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Granola",
  description: "People and Companies",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      data-theme="dark"
      className={`${inter.variable} ${serif.variable} h-full antialiased`}
    >
      <body className="h-full overflow-hidden font-sans">
        <Providers
          workspaceName={process.env.MICRO_WORKSPACE_NAME?.trim() || "My workspace"}
          defaultSource={missingCredentials() ? "placeholder" : "micro"}
        >
          {children}
        </Providers>
      </body>
    </html>
  );
}
