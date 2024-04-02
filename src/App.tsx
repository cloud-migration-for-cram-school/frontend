// App.tsx
import { Routes, Route } from "react-router-dom";
import SpreadsheetSearch from "./components/SpreadsheetSearch";
import SpreadsheetPage from "./components/SpreadsheetPage";
import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<SpreadsheetSearch />} />
      <Route path="/spreadsheetPage/:sheetId" element={<SpreadsheetPage />} />
    </Routes>
  );
}

export default App;
