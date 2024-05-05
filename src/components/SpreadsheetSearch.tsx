import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { HStack, Autocomplete, FormControl, Button } from "@yamada-ui/react";
import dummySheetData from "../assets/dummySheetData";
import dummySheets from "../assets/dummySheets";
import dummySubjectsA from "../assets/dummySubjectsA";
import dummySubjectsB from "../assets/dummySubjectB";

interface Spreadsheet {
  label: string;
  value: string;
}

interface Subject {
  label: string;
  value: string;
}

interface FormData {
  selectedSheetId: string;
  selectedSubjectId: string;
}

const SpreadsheetSearch = () => {
  const [sheets, setSheets] = useState<Spreadsheet[]>(dummySheets);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  /*useEffect(() => {
    const fetchSheets = async () => {
      try {
        const response = await axios.get<Spreadsheet[]>(
          "バックエンドAPIのエンドポイント/search"
        );
        setSheets(response.data);
      } catch (error) {
        console.error("エラーが発生しました:", error);
      }
    };
  }, []);*/

  const fetchSubjectById = async (selectedSheetId: string) => {
    try {
      const response = await axios.get(
        `バックエンドAPIのエンドポイント/search/subject/${selectedSheetId}`
      );
      console.log("取得成功:", response.data);
      setSubjects([]);
      setSubjects(response.data);
      setSubjects(dummySubjectsA); //開発用に仮置き
      console.log(subjects);
    } catch (error) {
      console.error("エラーが発生しました:", error);
    } finally {
      setSubjects(dummySubjectsA);
    }
  };

  const fetchReportBySubject = async (selectedSubjectId: string) => {
    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      const response = await axios.get(
        `バックエンドAPIのエンドポイント/${selectedSubjectId}`
      );
      console.log("取得成功:", response.data);
      response.data = dummySheetData;
      navigate(`/${selectedSubjectId}`, {
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
    fetchReportBySubject(data.selectedSubjectId);
  };

  useEffect(() => {
    console.log("Subjects updated:", subjects);
  }, [subjects]);

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
                emptyMessage="スプレッドシートが存在しません"
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
            name="selectedSubjectId"
            control={control}
            rules={{ required: { value: true, message: "選択してください" } }}
            render={({ field }) => (
              <Autocomplete
                key={subjects?.length || "initial"}
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
