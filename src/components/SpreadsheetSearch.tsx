import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { HStack, Autocomplete, FormControl, Button } from "@yamada-ui/react";
import { Spreadsheet, Subject, FormData } from "../types/SpreadsheetSearch";
import dummySheetData from "../assets/dummySheetData";
import dummySheets from "../assets/dummySheets";
import dummySubjectsA from "../assets/dummySubjectsA";
import { SheetData } from "../types/SheetData";

const SpreadsheetSearch = () => {
  const [sheets, setSheets] = useState<Spreadsheet[]>([]);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  useEffect(() => {
    const fetchSheets = async () => {
      try {
        const response = await axios.get<Spreadsheet[]>(
          "http://~:8080/search"
        );
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
      const response = await axios.get<Subject[]>(
        `http://~:8080/search/subjects/${selectedSheetId}`
      );
      setSubjects(response.data);
    } catch (error) {
      console.error("エラーが発生しました:", error);
    }
    setSubjects(dummySubjectsA);
  };

  const fetchReportBySubject = async (sheet_id: string, subjects_id: string) => {
    setIsLoading(true);
    try {
      const response = await axios.get<SheetData>(
        `http://~:8080/search/subjects/reports/${sheet_id}/${subjects_id}`
      );
      navigate(`/${sheet_id}/${subjects_id}`, {
        state: { sheetData: response.data },
      });
    } catch (error) {
      console.error("エラーが発生しました:", error);
    } finally {
      setIsLoading(false);
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
      <HStack as="form" onSubmit={handleSubmit(onSubmit)}>
        <FormControl
          isInvalid={!!errors.selectedSheetId}
          errorMessage={
            errors.selectedSheetId ? errors.selectedSheetId.message : undefined
          }
        >
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
                onChange={(value) => {
                  console.log(value);
                  field.onChange(value);
                  onSelectSpreadsheet(value);
                }}
              />
            )}
          />
        </FormControl>
        <FormControl
          isInvalid={!!errors.selectedSubjectId}
          errorMessage={
            errors.selectedSubjectId
              ? errors.selectedSubjectId.message
              : undefined
          }
        >
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
              />
            )}
          />
        </FormControl>
        <Button
          type="submit"
          loadingIcon="grid"
          colorScheme="primary"
          isLoading={isLoading}
          variant="ghost"
          size={"lg"}
        >
          検索
        </Button>
      </HStack>
    </div>
  );
};

export default SpreadsheetSearch;
