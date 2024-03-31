import { useState, useEffect } from "react";
import axios from "axios";

interface Spreadsheet {
  name: string;
  id: string;
}

const SpreadsheetSearch = () => {
  const dummySheets: Spreadsheet[] = [
    { name: "スプレッドシート1", id: "1" },
    { name: "プロジェクト計画", id: "2" },
    { name: "予算管理表", id: "3" },
    { name: "会議の議事録", id: "4" },
    { name: "顧客リスト", id: "5" },
  ];

  const [sheets, setSheets] = useState<Spreadsheet[]>(dummySheets);
  const [filteredSheets, setFilteredSheets] =
    useState<Spreadsheet[]>(dummySheets);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const result = sheets.filter((sheet) =>
      sheet.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredSheets(result);
  }, [searchTerm, sheets]);

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedSheetId = e.target.value;
    postSelectedSheetId(selectedSheetId);
  };

  const postSelectedSheetId = async (sheetId: string) => {
    try {
      await axios.post("バックエンドAPIのエンドポイント", { id: sheetId });
      console.log("送信成功:", sheetId);
    } catch (error) {
      console.error("エラーが発生しました:", error);
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="スプレッドシートを検索"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <select onChange={handleSelectChange}>
        {filteredSheets.map((sheet) => (
          <option key={sheet.id} value={sheet.id}>
            {sheet.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SpreadsheetSearch;
