import { useState } from "react";
import { Button } from "./ui/button";
import { Waves, Menu, X } from "lucide-react";

interface HeaderProps {
  onOpenLoginModal: () => void;
  isLoggedIn: boolean;
  userRole: 'guest' | 'researcher' | 'admin' | null;
  userName?: string;
  onLogout: () => void;
  onNavigateToDataUpload: () => void;
  onNavigateToHome: () => void;
  onNavigateToSearchVisualization: () => void;
  currentPage: 'home' | 'data-upload' | 'search-visualization';
}

export function Header({ onOpenLoginModal, isLoggedIn, userRole, userName, onLogout, onNavigateToDataUpload, onNavigateToHome, onNavigateToSearchVisualization, currentPage }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const canAccessDataUpload = isLoggedIn && (userRole === 'researcher' || userRole === 'admin');

  return (
    <header className="fixed top-0 w-full z-50 bg-[#1e3a8a] text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="relative">
              <Waves className="h-8 w-8 text-[#06b6d4]" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#06b6d4] to-[#0891b2] rounded-full opacity-20"></div>
            </div>
            <span className="text-xl tracking-wide">AquaCore</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <button 
              onClick={onNavigateToHome} 
              className={`hover:text-[#06b6d4] transition-colors ${currentPage === 'home' ? 'text-[#06b6d4]' : ''}`}
            >
              Home
            </button>
            <button 
              onClick={onNavigateToSearchVisualization} 
              className={`hover:text-[#06b6d4] transition-colors ${currentPage === 'search-visualization' ? 'text-[#06b6d4]' : ''}`}
            >
              Search & Visualization
            </button>
            <a href="#analysis" className="hover:text-[#06b6d4] transition-colors">Analysis</a>
            {canAccessDataUpload && (
              <button 
                onClick={onNavigateToDataUpload} 
                className={`hover:text-[#06b6d4] transition-colors ${currentPage === 'data-upload' ? 'text-[#06b6d4]' : ''}`}
              >
                Data Upload
              </button>
            )}
            
            {isLoggedIn ? (
              <div className="flex items-center space-x-4">
                <span className="text-sm">Welcome, {userName}</span>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={onLogout}
                  className="text-[#1e3a8a] border-white hover:bg-white hover:text-[#1e3a8a]"
                >
                  Logout
                </Button>
              </div>
            ) : (
              <Button 
                onClick={onOpenLoginModal}
                className="bg-[#06b6d4] hover:bg-[#0891b2] text-white"
              >
                Login
              </Button>
            )}
          </nav>

          {/* Mobile menu button */}
          <button
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden pb-4">
            <nav className="flex flex-col space-y-4">
              <button 
                onClick={() => { onNavigateToHome(); setIsMobileMenuOpen(false); }} 
                className={`hover:text-[#06b6d4] transition-colors text-left ${currentPage === 'home' ? 'text-[#06b6d4]' : ''}`}
              >
                Home
              </button>
              <button 
                onClick={() => { onNavigateToSearchVisualization(); setIsMobileMenuOpen(false); }} 
                className={`hover:text-[#06b6d4] transition-colors text-left ${currentPage === 'search-visualization' ? 'text-[#06b6d4]' : ''}`}
              >
                Search & Visualization
              </button>
              <a href="#analysis" className="hover:text-[#06b6d4] transition-colors">Analysis</a>
              {canAccessDataUpload && (
                <button 
                  onClick={() => { onNavigateToDataUpload(); setIsMobileMenuOpen(false); }} 
                  className={`hover:text-[#06b6d4] transition-colors text-left ${currentPage === 'data-upload' ? 'text-[#06b6d4]' : ''}`}
                >
                  Data Upload
                </button>
              )}
              
              {isLoggedIn ? (
                <div className="flex flex-col space-y-2">
                  <span className="text-sm">Welcome, {userName}</span>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={onLogout}
                    className="text-[#1e3a8a] border-white hover:bg-white hover:text-[#1e3a8a] w-fit"
                  >
                    Logout
                  </Button>
                </div>
              ) : (
                <Button 
                  onClick={onOpenLoginModal}
                  className="bg-[#06b6d4] hover:bg-[#0891b2] text-white w-fit"
                >
                  Login
                </Button>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}