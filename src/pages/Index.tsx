import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-secondary">
      <Header />
      <main className="flex-1">
        {/* Empty main content area */}
      </main>
      <Footer />
    </div>
  );
};

export default Index;
