import { useState } from "react";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Waves, User, Menu, X } from "lucide-react";

interface HeaderProps {
  onOpenLoginModal: () => void;
  isLoggedIn: boolean;
  userRole: 'guest' | 'researcher' | 'admin' | null;
  userName?: string;
  onLogout: () => void;
}

export function Header({ onOpenLoginModal, isLoggedIn, userRole, userName, onLogout }: HeaderProps) {
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
            <a href="#home" className="hover:text-[#06b6d4] transition-colors">Home</a>
            <a href="#search" className="hover:text-[#06b6d4] transition-colors">Search & Visualization</a>
            <a href="#analysis" className="hover:text-[#06b6d4] transition-colors">Analysis</a>
            {canAccessDataUpload && (
              <a href="#upload" className="hover:text-[#06b6d4] transition-colors">Data Upload</a>
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
              <a href="#home" className="hover:text-[#06b6d4] transition-colors">Home</a>
              <a href="#search" className="hover:text-[#06b6d4] transition-colors">Search & Visualization</a>
              <a href="#analysis" className="hover:text-[#06b6d4] transition-colors">Analysis</a>
              {canAccessDataUpload && (
                <a href="#upload" className="hover:text-[#06b6d4] transition-colors">Data Upload</a>
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