import { useLocation } from "react-router-dom";
import "../styles/SpreadsheetPage.css";
import dummySheetData from "../assets/dummySheetData";

const SpreadsheetPage = () => {
  const location = useLocation();
  const sheetData = location.state?.sheetData || dummySheetData;

  return (
    <div>
      {sheetData ? (
        <div className="spreadsheet-container">
          <div className="basic-info">
            <strong>Basic Information</strong>
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
            <strong>Communication</strong>
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
            <strong>Test Review</strong>
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
            <strong>Lesson Details</strong>
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
                  <th colSpan={3}>Strengths and Areas for Improvement</th>
                </tr>
                <tr>
                  <td colSpan={3}>
                    {sheetData.lessonDetails.strengthsAndAreasForImprovement}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="homework-assignments">
            <strong>Homework Assignments</strong>
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
            <strong>Next Test</strong>
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
            <strong>Student Status</strong>
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
            <strong>Lesson Plan</strong>
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
      ) : (
        <p>スプレッドシートのデータがありません。</p>
      )}
    </div>
  );
};

export default SpreadsheetPage;
