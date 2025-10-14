import { Toaster as Sonner } from "@/components/ui/sonner";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { ConsentBanner } from "@/components/ConsentBanner";
import MetaTagManager from "@/components/MetaTagManager";
import StructuredData from "@/components/StructuredData";
import LanguageRedirect from "@/components/LanguageRedirect";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

const App = () => (
  <HelmetProvider>
    <MetaTagManager />
    <StructuredData />
    <Sonner />
    <ConsentBanner />
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LanguageRedirect />} />
        <Route path="/:lang" element={<Index />} />
        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </HelmetProvider>
);

export default App;
