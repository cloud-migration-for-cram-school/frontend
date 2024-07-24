import { SheetData } from "../types/SheetData";
import { Button, Box } from "@yamada-ui/react";

export const RenderSheetData = ({ sheetData }: { sheetData: SheetData }) => (
  <div className="spreadsheet-column">
    <h1 className="report-header">
      過去の報告書
      <span className="edit">
      <Button colorScheme="primary" variant="link" size={"md"}>(編集する)</Button>
      </span>
    </h1>
    <Box p="md" rounded="md" border="2px solid" boxShadow="xl">
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
              <td colSpan={2}>{sheetData.lessonDetails.strengthsAndAreasForImprovement}</td>
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
    </Box>
  </div>
);
