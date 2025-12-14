import type { Metadata } from "next";
import "./globals.css";
import { fonts } from "@/lib/font";
import "leaflet/dist/leaflet.css";

import GoogleOAuthProviderWrapper from "@/components/providers/GoogleOAuthProvider";

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
        <GoogleOAuthProviderWrapper>
          {children}
        </GoogleOAuthProviderWrapper>
      </body>
    </html>
  );
}
