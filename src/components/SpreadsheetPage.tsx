import { useLocation } from "react-router-dom";
import "../styles/SpreadsheetPage.css";

const SpreadsheetPage = () => {
  const location = useLocation();
  const sheetData = location.state?.sheetData;

  return (
    <div>
      {sheetData ? (
        <div className="spreadsheet-container">
          <table>
            <tbody>
              <tr>
                <th>Date and Time</th>
                <td>{sheetData.basicInfo.dateAndTime}</td>
                <th>Subject Name</th>
                <td>{sheetData.basicInfo.subjectName}</td>
              </tr>
            </tbody>
          </table>
        </div>
      ) : (
        <p>スプレッドシートのデータがありません。</p>
      )}
    </div>
  );
};

export default SpreadsheetPage;
