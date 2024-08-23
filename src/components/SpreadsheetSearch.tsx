import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { HStack, Autocomplete, FormControl, Button } from "@yamada-ui/react";
import { Spreadsheet, Subject, FormData } from "../types/SpreadsheetSearch";
import dummySheetData from "../assets/dummySheetData";
import dummySheets from "../assets/dummySheets";
import dummySubjectsA from "../assets/dummySubjectsA";
import dummySubjectsB from "../assets/dummySubjectB";

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
          "http://localhost:8000/search"
        );
        setSheets(response.data);
      } catch (error) {
        console.error("エラーが発生しました:", error);
      } finally {
        setSheets(dummySheets);
      }
    };
    fetchSheets();
  }, []);

  const fetchSubjectById = async (selectedSheetId: string) => {
    try {
      const response = await axios.get<Subject[]>(
        `http://localhost:8000/search/subjects/${selectedSheetId}`
      );
      setSubjects(response.data);
    } catch (error) {
      console.error("エラーが発生しました:", error);
    } finally {
      setSubjects(dummySubjectsA);
    }
  };

  const fetchReportBySubject = async (selectedSheetId: string, selectedSubjectId: string) => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:8000/search/subjects/reports/${selectedSubjectId}`
      );
      navigate(`/${selectedSheetId}/${selectedSubjectId}`, {
        state: { sheetData: response.data },
      });
    } catch (error) {
      console.error("エラーが発生しました:", error);
    } finally {
      setIsLoading(false);
      navigate(`/${selectedSheetId}/${selectedSubjectId}`, {
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
