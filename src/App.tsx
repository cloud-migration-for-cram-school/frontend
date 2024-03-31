import SpreadsheetSearch from "./components/SpreadsheetSearch";
import "./App.css";

function App() {
  return (
    <>
      <h1>報告書を作成</h1>
      <div>
        <p>生徒名を入力し、スプレッドシートを検索します。</p>
      </div>
      <SpreadsheetSearch />
    </>
  );
}

export default App;
