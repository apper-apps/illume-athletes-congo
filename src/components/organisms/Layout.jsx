import Header from "@/components/organisms/Header";
import BottomNavigation from "@/components/organisms/BottomNavigation";

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 pb-20 px-4 py-6 max-w-7xl mx-auto w-full">
        {children}
      </main>
      
      <BottomNavigation />
    </div>
  );
};

export default Layout;