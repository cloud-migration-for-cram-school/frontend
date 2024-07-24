import { useForm, Controller } from "react-hook-form";
import { useState } from "react";
import { SheetData } from "../types/SheetData";
import { Button, FormControl, ErrorMessage, Card, CardHeader, CardBody, CardFooter, Alert, AlertDescription } from "@yamada-ui/react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const RenderSheetDataForm = () => {
  const { control, handleSubmit } = useForm<SheetData>();
  const [isLoading, setIsLoading] = useState(false);
  const [isInvalid, setIsInvalid] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (data: SheetData) => {
    setIsLoading(true);
    setIsInvalid(false);
    try {
      await axios.post("http://localhost:8000/reports/submit", data);
      navigate("/");
    } catch (error) {
      console.error("エラーが発生しました:", error);
      setIsInvalid(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="spreadsheet-column">
      <Card>
        <FormControl isInvalid={isInvalid}>
          <CardHeader>
            <h1 className="report-header">新しい報告書</h1>
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
                        render={({ field }) => <textarea {...field} className="table-textarea" />}
                      />
                    </td>
                    <th>Subject Name</th>
                    <td>
                      <Controller
                        name="basicInfo.subjectName"
                        control={control}
                        render={({ field }) => <textarea {...field} className="table-textarea" />}
                      />
                    </td>
                    <th>Teacher Name</th>
                    <td>
                      <Controller
                        name="basicInfo.teacherName"
                        control={control}
                        render={({ field }) => <textarea {...field} className="table-textarea" />}
                      />
                    </td>
                  </tr>
                  <tr>
                    <th>Progress in School</th>
                    <td>
                      <Controller
                        name="basicInfo.progressInSchool"
                        control={control}
                        render={({ field }) => <textarea {...field} className="table-textarea" />}
                      />
                    </td>
                    <th>Homework Progress</th>
                    <td>
                      <Controller
                        name="basicInfo.homeworkProgress"
                        control={control}
                        render={({ field }) => <textarea {...field} className="table-textarea" />}
                      />
                    </td>
                    <th>Homework Accuracy</th>
                    <td>
                      <Controller
                        name="basicInfo.homeworkAccuracy"
                        control={control}
                        render={({ field }) => <textarea {...field} className="table-textarea" />}
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
                        render={({ field }) => <textarea {...field} className="table-textarea" />}
                      />
                    </td>
                  </tr>
                  <tr>
                    <th>From Director</th>
                    <td>
                      <Controller
                        name="communication.fromDirector"
                        control={control}
                        render={({ field }) => <textarea {...field} className="table-textarea" />}
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
                        render={({ field }) => <textarea {...field} className="table-textarea" />}
                      />
                    </td>
                    <th>Class Overall Status</th>
                    <td>
                      <Controller
                        name="testReview.classOverallStatus"
                        control={control}
                        render={({ field }) => <textarea {...field} className="table-textarea" />}
                      />
                    </td>
                  </tr>
                  <tr>
                    <th>Rationale</th>
                    <td colSpan={3}>
                      <Controller
                        name="testReview.rationale"
                        control={control}
                        render={({ field }) => <textarea {...field} className="table-textarea" />}
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
                          render={({ field }) => <textarea {...field} className="table-textarea" />}
                        />
                      </td>
                      <td>
                        <Controller
                          name={`lessonDetails.lessons.${index}.chapter`}
                          control={control}
                          render={({ field }) => <textarea {...field} className="table-textarea" />}
                        />
                      </td>
                      <td>
                        <Controller
                          name={`lessonDetails.lessons.${index}.accuracy`}
                          control={control}
                          render={({ field }) => <textarea {...field} className="table-textarea" />}
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
                        render={({ field }) => <textarea {...field} className="table-textarea" />}
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
                          render={({ field }) => <textarea {...field} className="table-textarea" />}
                        />
                      </td>
                      <td>
                        <Controller
                          name={`homework.assignments.${index}.tasks.0.material`}
                          control={control}
                          render={({ field }) => <textarea {...field} className="table-textarea" />}
                        />
                      </td>
                      <td>
                        <Controller
                          name={`homework.assignments.${index}.tasks.0.rangeAndPages`}
                          control={control}
                          render={({ field }) => <textarea {...field} className="table-textarea" />}
                        />
                      </td>
                      <td>
                        <Controller
                          name={`homework.assignments.${index}.tasks.1.material`}
                          control={control}
                          render={({ field }) => <textarea {...field} className="table-textarea" />}
                        />
                      </td>
                      <td>
                        <Controller
                          name={`homework.assignments.${index}.tasks.1.rangeAndPages`}
                          control={control}
                          render={({ field }) => <textarea {...field} className="table-textarea" />}
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
                        render={({ field }) => <textarea {...field} className="table-textarea" />}
                      />
                    </td>
                  </tr>
                  <tr>
                    <th>Note for Next Session</th>
                    <td colSpan={4}>
                      <Controller
                        name="homework.noteForNextSession"
                        control={control}
                        render={({ field }) => <textarea {...field} className="table-textarea" />}
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
                          render={({ field }) => <textarea {...field} className="table-textarea" />}
                        />
                      </td>
                      <td>
                        <Controller
                          name={`nextTest.${index}.chapter`}
                          control={control}
                          render={({ field }) => <textarea {...field} className="table-textarea" />}
                        />
                      </td>
                      <td>
                        <Controller
                          name={`nextTest.${index}.rangeAndPages`}
                          control={control}
                          render={({ field }) => <textarea {...field} className="table-textarea" />}
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
                        render={({ field }) => <textarea {...field} className="table-textarea" />}
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
                        render={({ field }) => <textarea {...field} className="table-textarea" />}
                      />
                    </td>
                  </tr>
                  <tr>
                    <th>If Test NG</th>
                    <td>
                      <Controller
                        name="lessonPlan.ifTestNG"
                        control={control}
                        render={({ field }) => <textarea {...field} className="table-textarea" />}
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
              variant="solid"
              size="md"
              loadingText="登録後検索画面に戻ります"
              className="post-report"
            >
              新しい報告書を登録
            </Button>
            <ErrorMessage>
              <Alert status="error" variant="island-accent" size="xs" mt={0} mb={2} mr={0} ml={0} border="none">
                <AlertDescription>
                  登録に失敗しました
                </AlertDescription>
              </Alert>
            </ErrorMessage>
          </CardFooter>
        </FormControl>
      </Card>
    </form>
  );
};

export default RenderSheetDataForm;
