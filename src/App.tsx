import { useState } from "react";
import { Header } from "./components/Header";
import { HeroSection } from "./components/HeroSection";
import { FeaturesSection } from "./components/FeaturesSection";
import { StatsSection } from "./components/StatsSection";
import { DataSourcesSection } from "./components/DataSourcesSection";
import { Footer } from "./components/Footer";
import { LoginModal } from "./components/LoginModal";
import { DataUploadPage } from "./components/DataUploadPage";
import { SearchVisualizationPage } from "./components/SearchVisualizationPage";

type UserRole = "guest" | "researcher" | "admin" | null;
type CurrentPage =
  | "home"
  | "data-upload"
  | "search-visualization";

interface User {
  email: string;
  role: UserRole;
  name: string;
}

export default function App() {
  const [isLoginModalOpen, setIsLoginModalOpen] =
    useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [currentPage, setCurrentPage] =
    useState<CurrentPage>("home");

  const handleLogin = (
    email: string,
    role: "researcher" | "admin",
  ) => {
    const name = email.split("@")[0];
    setUser({
      email,
      role,
      name: name.charAt(0).toUpperCase() + name.slice(1),
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

  const navigateToDataUpload = () => {
    setCurrentPage("data-upload");
  };

  const navigateToHome = () => {
    setCurrentPage("home");
  };

  const navigateToSearchVisualization = () => {
    setCurrentPage("search-visualization");
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case "data-upload":
        return (
          <DataUploadPage
            user={user}
            onNavigateHome={navigateToHome}
          />
        );
      case "search-visualization":
        return <SearchVisualizationPage user={user} />;
      case "home":
      default:
        return (
          <main className="pt-8">
            <HeroSection />
            <FeaturesSection />
            <StatsSection />
            <DataSourcesSection />
          </main>
        );
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Header
        onOpenLoginModal={openLoginModal}
        isLoggedIn={!!user}
        userRole={user?.role || null}
        userName={user?.name}
        onLogout={handleLogout}
        onNavigateToDataUpload={navigateToDataUpload}
        onNavigateToHome={navigateToHome}
        onNavigateToSearchVisualization={
          navigateToSearchVisualization
        }
        currentPage={currentPage}
      />

      {renderCurrentPage()}

      <Footer />

      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={closeLoginModal}
        onLogin={handleLogin}
      />
    </div>
  );
}