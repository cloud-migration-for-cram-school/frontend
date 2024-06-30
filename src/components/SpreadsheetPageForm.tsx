import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import "../styles/SpreadsheetPage.css";
import dummySheetData from "../assets/dummySheetData";
import { SheetData } from "../types/SheetData";
import { HStack } from "@yamada-ui/react";

const SpreadsheetPageForm = () => {
  const [sheetData1, setSheetData1] = useState<SheetData | null>(null);
  const [sheetData2, setSheetData2] = useState<SheetData | null>(null);
  const location = useLocation();
  const sheetData: SheetData[] = location.state?.sheetData || dummySheetData;

  useEffect(() => {
    if (sheetData.length >= 2) {
      setSheetData1(sheetData[0]);
      setSheetData2(sheetData[1]);
    } else if (sheetData.length === 1) {
      setSheetData1(sheetData[0]);
    }
  }, [location]);

  const renderSheetData = (sheetData: SheetData) => {
    if (!sheetData) {
      return <p>データが取得できませんでした</p>;
    }

    return (
      <div className="spreadsheet-container">
        <div className="basic-info">
          <table>
            <tbody>
              <tr>
                <th>Date and Time</th>
                <td>{sheetData.basicInfo.dateAndTime}</td>
                <th>Subject Name</th>
                <td>{sheetData.basicInfo.subjectName}</td>
                <th>Teacher Name</th>
                <td>{sheetData.basicInfo.teacherName}</td>
              </tr>
              <tr>
                <th>Progress in School</th>
                <td>{sheetData.basicInfo.progressInSchool}</td>
                <th>Homework Progress</th>
                <td>{sheetData.basicInfo.homeworkProgress}%</td>
                <th>Homework Accuracy</th>
                <td>{sheetData.basicInfo.homeworkAccuracy}%</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="communication">
          <table>
            <tbody>
              <tr>
                <th>For Next Teacher</th>
                <td>{sheetData.communication.forNextTeacher}</td>
              </tr>
              <tr>
                <th>From Director</th>
                <td>{sheetData.communication.fromDirector}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="test-review">
          <table>
            <tbody>
              <tr>
                <th>Test Accuracy</th>
                <td>{sheetData.testReview.testAccuracy}</td>
                <th>Class Overall Status</th>
                <td>{sheetData.testReview.classOverallStatus}</td>
              </tr>
              <tr>
                <th>Rationale</th>
                <td colSpan={3}>{sheetData.testReview.rationale}</td>
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
              {sheetData.lessonDetails.lessons.map((detail, index) => (
                <tr key={index}>
                  <td>{detail.material}</td>
                  <td>{detail.chapter}</td>
                  <td>{detail.accuracy}%</td>
                </tr>
              ))}
              <tr>
                <th>Strengths and Areas for Improvement</th>
                <td colSpan={2}>
                  {sheetData.lessonDetails.strengthsAndAreasForImprovement}
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
              {sheetData.homework.assignments.map((assignment, index) => (
                <tr key={index}>
                  <td>{assignment.day}</td>
                  <td>{assignment.tasks[0].material}</td>
                  <td>{assignment.tasks[0].rangeAndPages}</td>
                  <td>{assignment.tasks[1].material}</td>
                  <td>{assignment.tasks[1].rangeAndPages}</td>
                </tr>
              ))}
              <tr>
                <th>Advice</th>
                <td colSpan={4}>{sheetData.homework.advice}</td>
              </tr>
              <tr>
                <th>Note for Next Session</th>
                <td colSpan={4}>{sheetData.homework.noteForNextSession}</td>
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
              {sheetData.nextTest.map((test, index) => (
                <tr key={index}>
                  <td>{test.material}</td>
                  <td>{test.chapter}</td>
                  <td>{test.rangeAndPages}</td>
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
                <td>{sheetData.studentStatus}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="lesson-plan">
          <table>
            <tbody>
              <tr>
                <th>If Test OK</th>
                <td>{sheetData.lessonPlan.ifTestOK}</td>
              </tr>
              <tr>
                <th>If Test NG</th>
                <td>{sheetData.lessonPlan.ifTestNG}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  return (
    <div>
      <HStack>
        {sheetData1 && renderSheetData(sheetData1)}
        {sheetData2 && renderSheetData(sheetData2)}
      </HStack>
    </div>
  );
};

export default SpreadsheetPageForm;
