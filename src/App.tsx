// App.tsx
import { Routes, Route } from "react-router-dom";
import SpreadsheetSearch from "./components/SpreadsheetSearch";
import SpreadsheetPage from "./components/SpreadsheetPage";
import "./App.css";

function App() {
  return (
    <>
      <h1>報告書を作成</h1>
      <div>
        <p>生徒名を入力し、スプレッドシートを検索します。</p>
      </div>
      <Routes>
        <Route path="/" element={<SpreadsheetSearch />} />
        <Route path="/spreadsheetPage/:sheetId" element={<SpreadsheetPage />} />
      </Routes>
    </>
  );
}

export default App;
