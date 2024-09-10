import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import "../styles/SpreadsheetPage.css";
import { SheetData } from "../types/SheetData";
import RenderSheetData from "./RenderSheetData";
import RenderSheetDataForm from "./RenderSheetDataForm";
import { Kbd, Alert, AlertDescription, VStack } from "@yamada-ui/react";

interface SpreadsheetPageFormProps {
  selectedSheetName: string;
  selectedSubjectName: string;
}

const SpreadsheetPageForm = ({ selectedSheetName, selectedSubjectName }: SpreadsheetPageFormProps) => {
  const [previousSheetData, setPreviousSheetData] = useState<SheetData | undefined>(undefined);
  const [temporaryFormData, setTemporaryFormData] = useState<SheetData | undefined>(undefined);
  const [isEditing, setIsEditing] = useState(false);
  const [isInvalid, setIsInvalid] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);
  const location = useLocation();
  const sheetData: SheetData | undefined = location.state?.sheetData;

  useEffect(() => {
    if (sheetData) {
      setPreviousSheetData(sheetData);
    }
  }, [location, sheetData]);

  const handleEdit = () => {
    setIsInvalid(false);
    setIsEmpty(false);
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsInvalid(false);
    setIsEmpty(false);
    setIsEditing(false);
  };

  return (
    <div className="spreadsheet-page">
      <div className="spreadsheet-header">
        <VStack>
          <Alert variant="island-accent" mt={0} mb={0} mr={0} ml={0}>
            <AlertDescription>
              <Kbd>Tab</Kbd>または<Kbd>Shift + Tab</Kbd>で入力セルを移動
            </AlertDescription>
          </Alert>
          <Alert variant="island-accent" mt={0} mb={0} mr={0} ml={0}>
            <AlertDescription>
              {selectedSheetName}/{selectedSubjectName}
            </AlertDescription>
          </Alert>
        </VStack>
      </div>
      <div className="spreadsheet-content">
        <div className="spreadsheet-column">
          <RenderSheetDataForm
            //isEditingが変わるとinitialFormDataは随時変更される. initialが変わるたびにフォームにresetする必要がある.
            initialFormData={isEditing ? previousSheetData : temporaryFormData}
            setTemporaryFormData={setTemporaryFormData}
            setPreviousSheetData={setPreviousSheetData}
            isEditing={isEditing}
            onCancelEdit={handleCancelEdit}
            isInvalid={isInvalid}
            setIsInvalid={setIsInvalid}
            isEmpty={isEmpty}
            setIsEmpty={setIsEmpty}
            setIsEditing={setIsEditing}
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
