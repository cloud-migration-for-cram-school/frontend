import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import "../styles/SpreadsheetPage.css";
import dummySheetData from "../assets/dummySheetData";
import { SheetData } from "../types/SheetData";
import { RenderSheetData } from "./RenderSheetData";
import RenderSheetDataForm from "./RenderSheetDataForm";
import { Kbd } from "@yamada-ui/react"

const SpreadsheetPageForm = () => {
  const [sheetData1, setSheetData1] = useState<SheetData | null>(null);
  const [sheetData2, setSheetData2] = useState<SheetData | null>(null);
  const location = useLocation();
  const sheetData: SheetData[] = location.state?.sheetData || dummySheetData;

  useEffect(() => {
    if (sheetData.length >= 2) {
      setSheetData1(sheetData[0]);
      setSheetData2(sheetData[1]);
    } else if (sheetData.length === 1) {
      setSheetData1(sheetData[0]);
    }
  }, [location, sheetData]);

  const handleFormSubmit = (data: SheetData) => {
    console.log("Form Submitted", data);
  };

  return (
    <div className="spreadsheet-page">
      <div className="spreadsheet-header">
        <p><Kbd>Tab</Kbd>または<Kbd>Shift</Kbd>+<Kbd>Tab</Kbd>で入力セルを移動</p>
      </div>
      <div className="spreadsheet-content">
        <div className="spreadsheet-column">
          <RenderSheetDataForm onSubmit={handleFormSubmit} />
        </div>
        <div className="spreadsheet-column">
          {sheetData1 && <RenderSheetData sheetData={sheetData1} />}
        </div>
      </div>
    </div>
  );
};

export default SpreadsheetPageForm;
