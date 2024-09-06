import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import "../styles/SpreadsheetPage.css";
import { SheetData } from "../types/SheetData";
import RenderSheetData from "./RenderSheetData";
import RenderSheetDataForm from "./RenderSheetDataForm";
import { Kbd, Alert, AlertDescription } from "@yamada-ui/react";

const SpreadsheetPageForm = () => {
  const [previousSheetData, setPreviousSheetData] = useState<SheetData | undefined>(undefined);
  const [temporaryFormData, setTemporaryFormData] = useState<SheetData | undefined>(undefined);
  const [currentFormData, setCurrentFormData] = useState<SheetData | undefined>(undefined);
  const [isEditing, setIsEditing] = useState(false);
  const [isInvalid, setIsInvalid] = useState(false);
  const location = useLocation();
  const sheetData: SheetData | undefined = location.state?.sheetData;

  useEffect(() => {
    if (sheetData) {
      setPreviousSheetData(sheetData);
    }
    console.log("初期previousSheetData:", previousSheetData);
    console.log("初期temporaryFormData:", temporaryFormData);
    console.log("初期currentFormData:", currentFormData);
  }, [location, sheetData]);

  const handleEdit = () => {
    setTemporaryFormData(currentFormData);//ここをgetValueにする。setTemporaryFormDataを渡してラムダ式でgetValueでセット。
    setIsInvalid(false);
    setIsEditing(true);
    console.log("edit直前previousSheetData:", previousSheetData);
    console.log("edit直前temporaryFormData:", temporaryFormData);
    console.log("edit直前currentFormData:", currentFormData);
  };

  const handleCancelEdit = () => {
    if (temporaryFormData) {
      console.log("handlecancel", temporaryFormData);
      setCurrentFormData(temporaryFormData);
    }
    setIsInvalid(false);
    setIsEditing(false);
    console.log("edit直後previousSheetData:", previousSheetData);
    console.log("edit直後temporaryFormData:", temporaryFormData);
    console.log("edit直後currentFormData:", currentFormData);
  };

  useEffect(() => {
    console.log("previousSheetData has changed:", previousSheetData);
  }, [previousSheetData]);

  useEffect(() => {
    console.log("temporaryFormData has changed:", temporaryFormData);
  }, [temporaryFormData]);

  useEffect(() => {
    console.log("currentFormData has changed:", currentFormData);
  }, [currentFormData]);

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
            //isEditingが変わるとinitialFormDataは随時変更される. initialが変わるたびにフォームにsetvalueする必要がある
            initialFormData={isEditing ? previousSheetData : temporaryFormData}
            setCurrentFormData={setCurrentFormData}
            isEditing={isEditing}
            onCancelEdit={handleCancelEdit}
            isInvalid={isInvalid}
            setIsInvalid={setIsInvalid}
          />
        </div>
        <div className="spreadsheet-column">
          {!isEditing && previousSheetData && (
            <RenderSheetData
              sheetData={previousSheetData}
              onEdit={handleEdit}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default SpreadsheetPageForm;
