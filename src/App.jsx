import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Layout from "@/components/organisms/Layout";
import AccueilPage from "@/components/pages/AccueilPage";
import EnregistrerPage from "@/components/pages/EnregistrerPage";
import AthletesPage from "@/components/pages/AthletesPage";
import ProfilAthletePage from "@/components/pages/ProfilAthletePage";
import StatistiquesPage from "@/components/pages/StatistiquesPage";

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-background">
        <Layout>
          <Routes>
            <Route path="/" element={<AccueilPage />} />
            <Route path="/enregistrer" element={<EnregistrerPage />} />
            <Route path="/athletes" element={<AthletesPage />} />
            <Route path="/athletes/:id" element={<ProfilAthletePage />} />
            <Route path="/statistiques" element={<StatistiquesPage />} />
          </Routes>
        </Layout>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          className="mt-16"
        />
      </div>
    </BrowserRouter>
  );
}

export default App;