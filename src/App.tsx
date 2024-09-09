import { Routes, Route } from "react-router-dom";
import SpreadsheetSearch from "./components/SpreadsheetSearch";
import SpreadsheetPageForm from "./components/SpreadsheetPageForm";
import { UIProvider } from "@yamada-ui/react";
import { useState } from "react";

function App() {
  
  const [selectedSheetName, setSelectedSheetName] = useState<string>("");
  const [selectedSubjectName, setSelectedSubjectName] = useState<string>("");

  return (
    <UIProvider>
      <Routes>
        <Route path="/" element={<SpreadsheetSearch setSelectedSheetName={setSelectedSheetName} setSelectedSubjectName={setSelectedSubjectName} />} />
        <Route path="/:sheetId/:subjectsId" element={<SpreadsheetPageForm selectedSheetName={selectedSheetName} selectedSubjectName={selectedSubjectName} />} />
      </Routes>
    </UIProvider>
  );
}

export default App;
