import "@fontsource/anton/latin-400.css";
import "@fontsource/archivo/latin-400.css";
import "@fontsource/archivo/latin-500.css";
import "@fontsource/archivo/latin-600.css";
import "@fontsource/archivo/latin-700.css";
import "@fontsource/jetbrains-mono/latin-400.css";
import "@fontsource/jetbrains-mono/latin-500.css";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import Nav from "@/components/Nav";
import CartDrawer from "@/components/CartDrawer";

export const metadata = {
  title: "Bogan Supply Co.",
  description:
    "Heavyweight cotton apparel for ute life, garage culture and self-aware Kiwi pride.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en-NZ">
      <body className="font-sans bg-singlet text-ink antialiased">
        <CartProvider>
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] bg-singlet text-ink p-3"
          >
            Skip to content
          </a>
          <Nav />
          <div className="fixed bottom-0 left-0 z-40 bg-ink text-bone px-3 py-1.5 text-[10px] font-mono tracking-wider">
            STORE PREVIEW / CONCEPT RANGE
          </div>
          <div id="main-content">{children}</div>
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}
