import { Routes, Route } from "react-router-dom";
import SpreadsheetSearch from "./components/SpreadsheetSearch";
import SpreadsheetPageForm from "./components/SpreadsheetPageForm";
import { UIProvider } from "@yamada-ui/react";

function App() {
  return (
    <UIProvider>
      <Routes>
        <Route path="/" element={<SpreadsheetSearch />} />
        <Route path="/:sheetId/:subjectsId" element={<SpreadsheetPageForm />} />
      </Routes>
    </UIProvider>
  );
}

export default App;
