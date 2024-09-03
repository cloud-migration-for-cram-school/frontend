import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import "../styles/SpreadsheetPage.css";
import { SheetData } from "../types/SheetData";
import RenderSheetData from "./RenderSheetData";
import RenderSheetDataForm from "./RenderSheetDataForm";
import { Kbd, Alert, AlertDescription } from "@yamada-ui/react";

const SpreadsheetPageForm = () => {
  const [sheetData1, setSheetData1] = useState<SheetData | undefined>(undefined);
  const [originalFormData, setOriginalFormData] = useState<SheetData | undefined>(undefined);
  const [currentFormData, setCurrentFormData] = useState<SheetData | undefined>(undefined);
  const [isEditing, setIsEditing] = useState(false);
  const [isInvalid, setIsInvalid] = useState(false);
  const location = useLocation();
  const sheetData: SheetData | undefined = location.state?.sheetData;

  useEffect(() => {
    if (sheetData) {
      setSheetData1(sheetData);
    }
  }, [location, sheetData]);

  const handleEdit = (currentFormData: SheetData | undefined) => {
    if (!isEditing && currentFormData) {
      setOriginalFormData(currentFormData);
      setCurrentFormData(sheetData1);
    }
    setIsInvalid(false);
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    if (originalFormData) {
      setCurrentFormData(originalFormData);
    }
    setIsInvalid(false);
    setIsEditing(false);
  };

  return (
    <div className="spreadsheet-page">
      <div className="spreadsheet-header">
        <Alert variant="island-accent" mt={0} mb={0} mr={720} ml={0}>
          <AlertDescription>
            <Kbd>Tab</Kbd>または<Kbd>Shift + Tab</Kbd>で入力セルを移動
          </AlertDescription>
        </Alert>
      </div>
      <div className="spreadsheet-content">
        <div className="spreadsheet-column">
          <RenderSheetDataForm
            currentFormData={isEditing ? sheetData1 : originalFormData}
            setCurrentFormData={setCurrentFormData}
            isEditing={isEditing}
            onCancelEdit={handleCancelEdit}
            isInvalid={isInvalid}
            setIsInvalid={setIsInvalid}
          />
        </div>
        <div className="spreadsheet-column">
          {!isEditing && sheetData1 && (
            <RenderSheetData
              sheetData={sheetData1}
              onEdit={() => handleEdit(originalFormData)}
              setIsInvalid={setIsInvalid}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default SpreadsheetPageForm;
