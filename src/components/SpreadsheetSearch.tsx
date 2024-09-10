import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { HStack, Autocomplete, FormControl, Button, ErrorMessage, Alert, AlertDescription } from "@yamada-ui/react";
import { FormData } from "../types/SpreadsheetSearch";
import { Spreadsheet, Subject } from "../types/SpreadsheetSearch";
import dummySheetData from "../assets/dummySheetData";
import dummySheets from "../assets/dummySheets";
import dummySubjectsA from "../assets/dummySubjectsA";
import { SheetData } from "../types/SheetData";

interface SpreadsheetSearchProps {
  setSelectedSheetName: (selectedSheetName: string) => void;
  setSelectedSubjectName: (selectedSubjectName: string) => void;
}

const SpreadsheetSearch = ({ setSelectedSheetName, setSelectedSubjectName }: SpreadsheetSearchProps) => {
  const [sheets, setSheets] = useState<Spreadsheet[]>([]);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isInvalid, setIsInvalid] = useState(false);
  const navigate = useNavigate();
  const { control, handleSubmit, formState: { errors } } = useForm<FormData>();

  useEffect(() => {
    const fetchSheets = async () => {
      try {
        const response = await axios.get<Spreadsheet[]>("http://localhost:8000/search");
        setSheets(response.data);
      } catch (error) {
        console.error("エラーが発生しました:", error);
      }
    };
    fetchSheets();
    setSheets(dummySheets);
  }, []);

  const fetchSubjectById = async (selectedSheetId: string) => {
    try {
      const response = await axios.get<Subject[]>(`http://localhost:8000/search/subjects/${selectedSheetId}`);
      setSubjects(response.data);
    } catch (error) {
      console.error("エラーが発生しました:", error);
    }
    setSubjects(dummySubjectsA);
  };

  const fetchReportBySubject = async (sheetId: string, subjectId: string) => {
    setIsLoading(true);
    setIsInvalid(false);
    try {
      const response = await axios.get<SheetData>(`http://localhost:8000/search/subjects/reports/${sheetId}/${subjectId}`);
      navigate(`/${sheetId}/${subjectId}`, {
        state: { sheetData: response.data },
      });
    } catch (error) {
      console.error("エラーが発生しました:", error);
      setIsInvalid(true);
    } finally {
      setIsLoading(false);
      navigate(`/${sheetId}/${subjectId}`, {
        state: { sheetData: dummySheetData },
      });
    }
  };

  const onSelectSpreadsheet = (selectedSheetId: string) => {
    fetchSubjectById(selectedSheetId);
  };

  const onSubmit: SubmitHandler<FormData> = (data) => {
    fetchReportBySubject(data.selectedSheetId, data.selectedSubjectId);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <HStack>
          <FormControl isInvalid={!!errors.selectedSheetId}>
            <Controller
              key={sheets?.length || "initial"}
              name="selectedSheetId"
              control={control}
              rules={{ required: { value: true, message: "選択してください" } }}
              render={({ field }) => (
                <Autocomplete
                  placeholder="スプレッドシートを選択"
                  {...field}
                  items={sheets}
                  closeOnSelect={false}
                  allowFree
                  emptyMessage="存在しません"
                  variant="flushed"
                  iconProps={{ color: "primary" }}
                  size={"lg"}
                  onChange={(value: string) => {
                    const selectedSheet: Spreadsheet|undefined = sheets.find(sheet => sheet.value === value);
                    if (selectedSheet) {
                      field.onChange(selectedSheet.value);
                      onSelectSpreadsheet(selectedSheet.value);
                      setSelectedSheetName(selectedSheet.label);
                    } else {
                      console.error("スプレッドシートが見つかりませんでした");
                    }
                  }}
                />
              )}
            />
            <ErrorMessage p="0px" m="0px">
              <Alert status="error" variant="island-accent" size="xs" border="none" position="absolute" top="50px">
                <AlertDescription>
                  {errors.selectedSheetId ? errors.selectedSheetId.message : undefined}
                </AlertDescription>
              </Alert>
            </ErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!errors.selectedSubjectId}>
            <Controller
              key={subjects?.length || "initial"}
              name="selectedSubjectId"
              control={control}
              rules={{ required: { value: true, message: "選択してください" } }}
              render={({ field }) => (
                <Autocomplete
                  placeholder="科目を選択"
                  {...field}
                  items={subjects}
                  closeOnSelect={false}
                  allowFree
                  emptyMessage="先にスプレッドシートを選択してください"
                  variant="flushed"
                  iconProps={{ color: "primary" }}
                  size={"lg"}
                  onChange={(value: string) => {
                    const selectedSubject: Subject|undefined = subjects.find(subject => subject.value === value);
                    if (selectedSubject) {
                      field.onChange(selectedSubject.value);
                      setSelectedSubjectName(selectedSubject.label)
                    } else {
                      console.error("科目が見つかりませんでした");
                    }
                  }}
                />
              )}
            />
            <ErrorMessage p="0px" m="0px">
              <Alert status="error" variant="island-accent" size="xs" border="none" position="absolute" top="50px">
                <AlertDescription>
                  {errors.selectedSubjectId ? errors.selectedSubjectId.message : undefined}
                </AlertDescription>
              </Alert>
            </ErrorMessage>
          </FormControl>
          <FormControl isInvalid={isInvalid}>
            <Button
              type="submit"
              loadingIcon="grid"
              colorScheme="primary"
              isLoading={isLoading}
              variant="ghost"
              size="lg"
            >
              検索
            </Button>
            <ErrorMessage p="0px" m="0px">
              <Alert status="error" variant="island-accent" size="xs" border="none" position="absolute" top="50px">
                <AlertDescription>
                  検索に失敗しました
                </AlertDescription>
              </Alert>
            </ErrorMessage>
          </FormControl>
        </HStack>
      </form>
    </div>
  );
};

export default SpreadsheetSearch;
