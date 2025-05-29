import { ReactNode } from "react";
import Image from "next/image";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      {/* Full page background */}
      <div className="min-h-screen bg-base-100 text-base-content">
        {/* Fixed top header */}
        <header className="fixed top-0 z-50 w-full bg-base-200 shadow-lg font-bold">
          <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col items-center">
            <h1 className="text-lg md:text-xl">Steam Points Converter</h1>
            <h2 className="text-sm md:text-base text-base-content/70 font-normal">
              Be ashamed with your life choices!
            </h2>
          </div>
        </header>

        {/* Push content down so it’s not under fixed header */}
        <main>
          {children}
        </main>
      </div>
      <footer className="footer bg-base-200 sm:footer-horizontal footer-center text-base-content">
        <aside>
          <p className="pt-4">Copyright © {new Date().getFullYear()} - All right reserved by Astro</p>
          <a target="_blank"
            rel="noopener noreferrer" href="https://ko-fi.com/astrotriesmodding"><Image className="pb-4 hover:scale-110 transition duration-300 hover:shadow-md" alt="Kofi Support Button" width={240} height={240} src="/support_me_on_kofi_dark.png"></Image></a>
        </aside>
      </footer>
    </>
  );
};

export default Layout;