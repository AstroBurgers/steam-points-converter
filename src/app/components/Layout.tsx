import { ReactNode } from "react";

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
          <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col items-center space-y-1">
            <h1 className="text-lg md:text-xl">Steam Points Converter</h1>
            <h2 className="text-sm md:text-base text-base-content/70 font-normal">
              Be ashamed with your life choices!
            </h2>
          </div>
        </header>

        {/* Push content down so it’s not under fixed header */}
        <main className="pt-[72px] max-w-7xl mx-auto px-6">
          {children}
        </main>
      </div>
    </>
  );
};

export default Layout;