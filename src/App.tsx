import { useState } from "react";
import { Header } from "./components/Header";
import { HeroSection } from "./components/HeroSection";
import { FeaturesSection } from "./components/FeaturesSection";
import { StatsSection } from "./components/StatsSection";
import { DataSourcesSection } from "./components/DataSourcesSection";
import { Footer } from "./components/Footer";
import { LoginModal } from "./components/LoginModal";

type UserRole = 'guest' | 'researcher' | 'admin' | null;

interface User {
  email: string;
  role: UserRole;
  name: string;
}

export default function App() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  const handleLogin = (email: string, role: 'researcher' | 'admin') => {
    const name = email.split('@')[0];
    setUser({
      email,
      role,
      name: name.charAt(0).toUpperCase() + name.slice(1)
    });
  };

  const handleLogout = () => {
    setUser(null);
  };

  const openLoginModal = () => {
    setIsLoginModalOpen(true);
  };

  const closeLoginModal = () => {
    setIsLoginModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-white">
      <Header
        onOpenLoginModal={openLoginModal}
        isLoggedIn={!!user}
        userRole={user?.role || null}
        userName={user?.name}
        onLogout={handleLogout}
      />
      
      <main className="pt-8">
        <HeroSection />
        <FeaturesSection />
        <StatsSection />
        <DataSourcesSection />
      </main>
      
      <Footer />
      
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={closeLoginModal}
        onLogin={handleLogin}
      />
    </div>
  );
}