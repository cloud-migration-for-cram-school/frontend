import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { HStack, Autocomplete, FormControl, Button } from "@yamada-ui/react";
import dummySheetData from "../assets/dummySheetData";
import dummySheets from "../assets/dummySheets";

interface Spreadsheet {
  label: string;
  value: string;
}

type FormData = {
  selectedSheetId: string;
};

const SpreadsheetSearch = () => {
  const [sheets, setSheets] = useState<Spreadsheet[]>(dummySheets);
  const [filteredSheets, setFilteredSheets] =
    useState<Spreadsheet[]>(dummySheets);
  const [searchTerm, setSearchTerm] = useState("");
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
      sheet.label.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredSheets(result);
  }, [searchTerm, sheets]);

  const fetchSpreadsheetById = async (sheetId: string) => {
    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
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
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmit: SubmitHandler<FormData> = (data) => {
    fetchSpreadsheetById(data.selectedSheetId);
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
            name="selectedSheetId"
            control={control}
            rules={{ required: { value: true, message: "選択してください" } }}
            render={({ field }) => (
              <Autocomplete
                placeholder="ここに生徒名を入力"
                {...field}
                items={dummySheets}
                closeOnSelect={false}
                allowFree
                emptyMessage="スプレッドシートが存在しません"
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
