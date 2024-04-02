import { useLocation, useParams } from "react-router-dom";

const SpreadsheetPage = () => {
  const { sheetId } = useParams();
  const location = useLocation();
  const sheetData = location.state?.sheetData;

  return (
    <div>
      {sheetData ? (
        <>
          <h2>{sheetData.name}</h2>
          {/* その他のスプレッドシートの情報を表示 */}
        </>
      ) : (
        <p>スプレッドシートのデータがありません。</p>
      )}
    </div>
  );
};

export default SpreadsheetPage;
