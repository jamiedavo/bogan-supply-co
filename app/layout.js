import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import Nav from "@/components/Nav";
import CartDrawer from "@/components/CartDrawer";

export const metadata = {
  title: "Bogan Supply Co.",
  description: "Heavyweight cotton apparel for ute life, garage culture and self-aware Kiwi pride.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en-NZ">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Anton&family=Archivo:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-sans bg-singlet text-ink antialiased">
        <CartProvider>
          <Nav />
          {children}
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}
