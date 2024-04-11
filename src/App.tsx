import { Routes, Route } from "react-router-dom";
import SpreadsheetSearch from "./components/SpreadsheetSearch";
import SpreadsheetPage from "./components/SpreadsheetPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<SpreadsheetSearch />} />
      <Route path="/:sheetId" element={<SpreadsheetPage />} />
    </Routes>
  );
}

export default App;
