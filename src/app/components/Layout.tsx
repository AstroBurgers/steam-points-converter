import { ReactNode } from "react";
import Image from "next/image";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-base-100 to-base-200 text-base-content">
      {/* Header */}
      <header className="glass-gradient">
        <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col items-center text-center">
          <h1 className="text-2xl md:text-3xl font-bold tracking-wide">
            Steam Points Converter
          </h1>
          <h2 className="text-sm md:text-base text-base-content/70 font-normal mt-1">
            Be ashamed of your life choices… but know their value.
          </h2>
        </div>
      </header>


      {/* Content */}
      <main className="flex-grow flex items-center justify-center px-4 sm:px-6">
        <div className="w-full max-w-2xl">{children}</div>
      </main>

      {/* Footer */}
      <footer className="glass-gradient">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <p className="text-sm">
            © {new Date().getFullYear()} — All rights reserved by <span className="font-semibold">Astro</span>
          </p>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://ko-fi.com/astrotriesmodding"
            className="transition transform hover:scale-105"
          >
            <Image
              alt="Kofi Support Button"
              width={240}
              height={240}
              src="/support_me_on_kofi_dark.png"
            />
          </a>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
