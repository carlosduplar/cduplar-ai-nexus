import { Toaster as Sonner } from "@/components/ui/sonner";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ConsentBanner } from "@/components/ConsentBanner";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

const App = () => (
  <>
    <Sonner />
    <ConsentBanner />
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </>
);

export default App;
