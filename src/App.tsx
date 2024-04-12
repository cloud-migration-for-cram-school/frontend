import { Routes, Route } from "react-router-dom";
import SpreadsheetSearch from "./components/SpreadsheetSearch";
import SpreadsheetPage from "./components/SpreadsheetPage";
import { UIProvider } from "@yamada-ui/react";

function App() {
  return (
    <UIProvider>
      <Routes>
        <Route path="/" element={<SpreadsheetSearch />} />
        <Route path="/:sheetId" element={<SpreadsheetPage />} />
      </Routes>
    </UIProvider>
  );
}

export default App;
