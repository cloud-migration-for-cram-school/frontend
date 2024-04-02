import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();

  /*useEffect(() => {
    const fetchSheets = async () => {
      try {
        const response = await axios.get<Spreadsheet[]>(
          "バックエンドAPIのエンドポイント"
        );
        setSheets(response.data);
        setFilteredSheets(response.data);
      } catch (error) {
        console.error("エラーが発生しました:", error);
      }
    };
    fetchSheets();
  }, []);*/

  useEffect(() => {
    const result = sheets.filter((sheet) =>
      sheet.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredSheets(result);
  }, [searchTerm, sheets]);

  const fetchSpreadsheetById = async (sheetId: string) => {
    try {
      const response = await axios.get(
        `バックエンドAPIのエンドポイント/${sheetId}`
      );
      console.log("取得成功:", response.data);
      navigate(`/spreadsheetPage/${sheetId}`);
    } catch (error) {
      console.error("エラーが発生しました:", error);
    }
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedSheetId = e.target.value;
    fetchSpreadsheetById(selectedSheetId);
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
