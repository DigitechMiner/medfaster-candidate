import type { Metadata } from "next";
import "./globals.css";
import { fonts } from "@/lib/font";
import 'leaflet/dist/leaflet.css';


export const metadata: Metadata = {
  title: "MedFaster Candidate Portal",
  description: "MedFaster is a platform for finding healthcare jobs",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={fonts}>
      <body className="font-sans">
        {children}
      </body>
    </html>
  );
}