import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import dummySheetData from "../assets/dummySheetData";
import dummySheets from "../assets/dummySheets";

interface Spreadsheet {
  name: string;
  id: string;
}

const SpreadsheetSearch = () => {
  const [sheets, setSheets] = useState<Spreadsheet[]>(dummySheets);
  const [filteredSheets, setFilteredSheets] =
    useState<Spreadsheet[]>(dummySheets);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  /*useEffect(() => {
    const fetchSheets = async () => {
      try {
        const response = await axios.get<Spreadsheet[]>(
          "/search"
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
      response.data = dummySheetData;
      navigate(`/${sheetId}`, {
        state: { sheetData: response.data },
      });
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
      <h1>報告書を作成</h1>
      <p>生徒名を入力し、スプレッドシートを検索します。</p>
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
