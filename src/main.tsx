import { createRoot, hydrateRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import "./i18n";
import "./utils/metaUpdater";
import { performanceMonitor } from "./utils/performanceMonitor";

performanceMonitor.markEvent('app-init-start');

const rootElement = document.getElementById("root")!;

// Use hydration if the page was pre-rendered by react-snap
if (rootElement.hasChildNodes()) {
  hydrateRoot(rootElement, <App />);
} else {
  createRoot(rootElement).render(<App />);
}

performanceMonitor.markEvent('app-init-complete');
performanceMonitor.measureBetween('app-init-start', 'app-init-complete', 'app-initialization');
performanceMonitor.reportToAnalytics();
