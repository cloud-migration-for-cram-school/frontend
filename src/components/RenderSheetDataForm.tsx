import { useForm, Controller } from "react-hook-form";
import { useState, useEffect } from "react";
import { SheetData } from "../types/SheetData";
import { Subject, Propotion, Test } from "../types/SpreadsheetPageForm";
import { Button, FormControl, Autocomplete, ErrorMessage, Card, CardHeader, CardBody, CardFooter, Alert, AlertDescription } from "@yamada-ui/react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

interface RenderSheetDataFormProps {
  initialFormData?: SheetData;
  setCurrentFormData: (data: SheetData) => void;
  isEditing: boolean;
  onCancelEdit: () => void;
  isInvalid: boolean;
  setIsInvalid: (value: boolean) => void;
}

const RenderSheetDataForm = ({
  initialFormData,
  setCurrentFormData,
  isEditing,
  onCancelEdit,
  isInvalid,
  setIsInvalid,
}: RenderSheetDataFormProps) => {
  const { control, handleSubmit, setValue, getValues } = useForm<SheetData>({
    defaultValues: initialFormData || {
      basicInfo: {
        dateAndTime: "",
        subjectName: "",
        teacherName: "",
        progressInSchool: "",
        homeworkProgress: "",
        homeworkAccuracy: "",
      },
      communication: {
        forNextTeacher: "",
        fromDirector: "",
      },
      testReview: {
        testAccuracy: "",
        classOverallStatus: "",
        rationale: "",
      },
      lessonDetails: {
        lessons: Array(6).fill({ material: "", chapter: "", accuracy: "" }),
        strengthsAndAreasForImprovement: "",
      },
      homework: {
        assignments: Array(6).fill({
          day: "",
          tasks: [
            { material: "", rangeAndPages: "" },
            { material: "", rangeAndPages: "" },
          ],
        }),
        advice: "",
        noteForNextSession: "",
      },
      nextTest: Array(3).fill({ material: "", chapter: "", rangeAndPages: "" }),
      studentStatus: "",
      lessonPlan: {
        ifTestOK: "",
        ifTestNG: "",
      },
    },
  });

  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { sheet_id, subjects_id } = useParams();

  const subjects: Subject[] = [
    { label: "英語", value: "英語" },
    { label: "数学", value: "数学" },
    { label: "算数", value: "算数" },
    { label: "国語", value: "国語" },
    { label: "理科", value: "理科" },
    { label: "社会", value: "社会" },
    { label: "特色", value: "特色" },
    { label: "その他", value: "その他" },
  ];

  const propotion: Propotion[] = [
    { label: "100 %", value: "100 %" },
    { label: "80 %", value: "80 %" },
    { label: "60 %", value: "60 %" },
    { label: "40 %", value: "40 %" },
    { label: "40 %以下", value: "40 %以下" },
    { label: "未完", value: "未完" },
    { label: "連続", value: "連続" },
    { label: "体験", value: "体験" },
    { label: "初回", value: "初回" },
  ];

  const tests: Test[] = [
    { label: "CT", value: "CT" },
    { label: "LCT", value: "LCT" },
    { label: "PT", value: "PT" },
    { label: "英単語", value: "英単語" },
    { label: "i+1部", value: "i+1部" },
    { label: "i+2部", value: "i+2部" },
    { label: "S単確", value: "S単確" },
    { label: "その他", value: "その他" },
  ];

  useEffect(() => {
    if (!isEditing) {
      const today = new Date();
      const dayNames = ["日", "月", "火", "水", "木", "金", "土"];
      const formattedDate = `${today.getMonth() + 1}月${today.getDate()}日(${dayNames[today.getDay()]})`;
      setValue("basicInfo.dateAndTime", formattedDate);

      for (let i = 0; i < 6; i++) {
        const futureDate = new Date(today);
        futureDate.setDate(today.getDate() + i + 1);
        const formattedFutureDate = `${futureDate.getMonth() + 1}月${futureDate.getDate()}日(${dayNames[futureDate.getDay()]})`;
        setValue(`homework.assignments.${i}.day`, formattedFutureDate);
      }
    }
  }, [isEditing, setValue]);

  const onSubmit = async (data: SheetData) => {
    setIsLoading(true);
    setIsInvalid(false);
    try {
      await axios.post(`http://localhost:8000/submit/report/${sheet_id}/${subjects_id}`, data);
      navigate("/");
    } catch (error) {
      console.error("エラーが発生しました:", error);
      setIsInvalid(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      onChange={() => {
        if (!isEditing) {
          setCurrentFormData(getValues());
        }
      }}
      className="spreadsheet-column"
    >
      <Card>
        <FormControl isInvalid={isInvalid}>
          <CardHeader>
            <h1 className="report-header">
              {isEditing ? "報告書を編集" : "新しい報告書"}
            </h1>
          </CardHeader>
          <CardBody>
            <div className="basic-info">
              <table>
                <tbody>
                  <tr>
                    <th>Date and Time</th>
                    <td>
                      <Controller
                        name="basicInfo.dateAndTime"
                        control={control}
                        render={({ field }) => (
                          <textarea {...field} className="table-textarea" />
                        )}
                      />
                    </td>
                    <th>Subject Name</th>
                    <td>
                      <Controller
                        name="basicInfo.subjectName"
                        control={control}
                        render={({ field }) => (
                          <Autocomplete
                            {...field}
                            iconProps={{ color: "primary" }}
                            closeOnSelect={false}
                            allowFree
                            emptyMessage="存在しません"
                            variant="unstyled"
                            text={12}
                            items={subjects}
                          />
                        )}
                      />
                    </td>
                    <th>Teacher Name</th>
                    <td>
                      <Controller
                        name="basicInfo.teacherName"
                        control={control}
                        render={({ field }) => (
                          <textarea {...field} className="table-textarea" />
                        )}
                      />
                    </td>
                  </tr>
                  <tr>
                    <th>Progress in School</th>
                    <td>
                      <Controller
                        name="basicInfo.progressInSchool"
                        control={control}
                        render={({ field }) => (
                          <textarea {...field} className="table-textarea" />
                        )}
                      />
                    </td>
                    <th>Homework Progress</th>
                    <td>
                      <Controller
                        name="basicInfo.homeworkProgress"
                        control={control}
                        render={({ field }) => (
                          <Autocomplete
                            {...field}
                            iconProps={{ color: "primary" }}
                            closeOnSelect={false}
                            allowFree
                            emptyMessage="存在しません"
                            variant="unstyled"
                            text={12}
                            items={propotion}
                          />
                        )}
                      />
                    </td>
                    <th>Homework Accuracy</th>
                    <td>
                      <Controller
                        name="basicInfo.homeworkAccuracy"
                        control={control}
                        render={({ field }) => (
                          <Autocomplete
                            {...field}
                            iconProps={{ color: "primary" }}
                            closeOnSelect={false}
                            allowFree
                            emptyMessage="存在しません"
                            variant="unstyled"
                            text={12}
                            items={propotion}
                          />
                        )}
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="communication">
              <table>
                <tbody>
                  <tr>
                    <th>For Next Teacher</th>
                    <td>
                      <Controller
                        name="communication.forNextTeacher"
                        control={control}
                        render={({ field }) => (
                          <textarea {...field} className="table-textarea" />
                        )}
                      />
                    </td>
                  </tr>
                  <tr>
                    <th>From Director</th>
                    <td>
                      <Controller
                        name="communication.fromDirector"
                        control={control}
                        render={({ field }) => (
                          <textarea {...field} className="table-textarea" />
                        )}
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="test-review">
              <table>
                <tbody>
                  <tr>
                    <th>Test Accuracy</th>
                    <td>
                      <Controller
                        name="testReview.testAccuracy"
                        control={control}
                        render={({ field }) => (
                          <Autocomplete
                            {...field}
                            iconProps={{ color: "primary" }}
                            closeOnSelect={false}
                            allowFree
                            emptyMessage="存在しません"
                            variant="unstyled"
                            text={12}
                            items={propotion}
                          />
                        )}
                      />
                    </td>
                    <th>Class Overall Status</th>
                    <td>
                      <Controller
                        name="testReview.classOverallStatus"
                        control={control}
                        render={({ field }) => (
                          <textarea {...field} className="table-textarea" />
                        )}
                      />
                    </td>
                  </tr>
                  <tr>
                    <th>Rationale</th>
                    <td colSpan={3}>
                      <Controller
                        name="testReview.rationale"
                        control={control}
                        render={({ field }) => (
                          <textarea {...field} className="table-textarea" />
                        )}
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="lesson-details">
              <table>
                <thead>
                  <tr>
                    <th>Material</th>
                    <th>Chapter</th>
                    <th>Accuracy</th>
                  </tr>
                </thead>
                <tbody>
                  {[...Array(6)].map((_, index) => (
                    <tr key={index}>
                      <td>
                        <Controller
                          name={`lessonDetails.lessons.${index}.material`}
                          control={control}
                          render={({ field }) => (
                            <textarea {...field} className="table-textarea" />
                          )}
                        />
                      </td>
                      <td>
                        <Controller
                          name={`lessonDetails.lessons.${index}.chapter`}
                          control={control}
                          render={({ field }) => (
                            <textarea {...field} className="table-textarea" />
                          )}
                        />
                      </td>
                      <td>
                        <Controller
                          name={`lessonDetails.lessons.${index}.accuracy`}
                          control={control}
                          render={({ field }) => (
                            <Autocomplete
                              {...field}
                              iconProps={{ color: "primary" }}
                              closeOnSelect={false}
                              allowFree
                              emptyMessage="存在しません"
                              variant="unstyled"
                              text={12}
                              items={propotion}
                            />
                          )}
                        />
                      </td>
                    </tr>
                  ))}
                  <tr>
                    <th>Strengths and Areas for Improvement</th>
                    <td colSpan={2}>
                      <Controller
                        name="lessonDetails.strengthsAndAreasForImprovement"
                        control={control}
                        render={({ field }) => (
                          <textarea {...field} className="table-textarea" />
                        )}
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="homework-assignments">
              <table>
                <thead>
                  <tr>
                    <th>Day</th>
                    <th>Material①</th>
                    <th>Range and Pages①</th>
                    <th>Material②</th>
                    <th>Range and Pages②</th>
                  </tr>
                </thead>
                <tbody>
                  {[...Array(6)].map((_, index) => (
                    <tr key={index}>
                      <td>
                        <Controller
                          name={`homework.assignments.${index}.day`}
                          control={control}
                          render={({ field }) => (
                            <textarea {...field} className="table-textarea" />
                          )}
                        />
                      </td>
                      <td>
                        <Controller
                          name={`homework.assignments.${index}.tasks.0.material`}
                          control={control}
                          render={({ field }) => (
                            <textarea {...field} className="table-textarea" />
                          )}
                        />
                      </td>
                      <td>
                        <Controller
                          name={`homework.assignments.${index}.tasks.0.rangeAndPages`}
                          control={control}
                          render={({ field }) => (
                            <textarea {...field} className="table-textarea" />
                          )}
                        />
                      </td>
                      <td>
                        <Controller
                          name={`homework.assignments.${index}.tasks.1.material`}
                          control={control}
                          render={({ field }) => (
                            <textarea {...field} className="table-textarea" />
                          )}
                        />
                      </td>
                      <td>
                        <Controller
                          name={`homework.assignments.${index}.tasks.1.rangeAndPages`}
                          control={control}
                          render={({ field }) => (
                            <textarea {...field} className="table-textarea" />
                          )}
                        />
                      </td>
                    </tr>
                  ))}
                  <tr>
                    <th>Advice</th>
                    <td colSpan={4}>
                      <Controller
                        name="homework.advice"
                        control={control}
                        render={({ field }) => (
                          <textarea {...field} className="table-textarea" />
                        )}
                      />
                    </td>
                  </tr>
                  <tr>
                    <th>Note for Next Session</th>
                    <td colSpan={4}>
                      <Controller
                        name="homework.noteForNextSession"
                        control={control}
                        render={({ field }) => (
                          <textarea {...field} className="table-textarea" />
                        )}
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="next-test">
              <table>
                <thead>
                  <tr>
                    <th>Material</th>
                    <th>Chapter</th>
                    <th>Range and Pages</th>
                  </tr>
                </thead>
                <tbody>
                  {[...Array(3)].map((_, index) => (
                    <tr key={index}>
                      <td>
                        <Controller
                          name={`nextTest.${index}.material`}
                          control={control}
                          render={({ field }) => (
                            <Autocomplete
                              {...field}
                              iconProps={{ color: "primary" }}
                              closeOnSelect={false}
                              allowFree
                              emptyMessage="存在しません"
                              variant="unstyled"
                              text={12}
                              items={tests}
                            />
                          )}
                        />
                      </td>
                      <td>
                        <Controller
                          name={`nextTest.${index}.chapter`}
                          control={control}
                          render={({ field }) => (
                            <textarea {...field} className="table-textarea" />
                          )}
                        />
                      </td>
                      <td>
                        <Controller
                          name={`nextTest.${index}.rangeAndPages`}
                          control={control}
                          render={({ field }) => (
                            <textarea {...field} className="table-textarea" />
                          )}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="student-status">
              <table>
                <tbody>
                  <tr>
                    <th>Status</th>
                    <td>
                      <Controller
                        name="studentStatus"
                        control={control}
                        render={({ field }) => (
                          <textarea {...field} className="table-textarea" />
                        )}
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="lesson-plan">
              <table>
                <tbody>
                  <tr>
                    <th>If Test OK</th>
                    <td>
                      <Controller
                        name="lessonPlan.ifTestOK"
                        control={control}
                        render={({ field }) => (
                          <textarea {...field} className="table-textarea" />
                        )}
                      />
                    </td>
                  </tr>
                  <tr>
                    <th>If Test NG</th>
                    <td>
                      <Controller
                        name="lessonPlan.ifTestNG"
                        control={control}
                        render={({ field }) => (
                          <textarea {...field} className="table-textarea" />
                        )}
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CardBody>
          <CardFooter>
            <Button
              type="submit"
              loadingIcon="grid"
              colorScheme="primary"
              isLoading={isLoading}
              size="md"
              loadingText="登録後検索画面に戻ります"
              className="post-report"
            >
              {isEditing ? "報告書を保存" : "新しい報告書を登録"}
            </Button>
            {isEditing && (
              <Button
                variant="ghost"
                colorScheme="primary"
                size="md"
                ml={4}
                onClick={onCancelEdit}
              >
                キャンセル
              </Button>
            )}
            <ErrorMessage>
              <Alert
                status="error"
                variant="island-accent"
                size="xs"
                mt={0}
                mb={2}
                mr={0}
                ml={0}
                border="none"
              >
                <AlertDescription>登録に失敗しました</AlertDescription>
              </Alert>
            </ErrorMessage>
          </CardFooter>
        </FormControl>
      </Card>
    </form>
  );
};

export default RenderSheetDataForm;
