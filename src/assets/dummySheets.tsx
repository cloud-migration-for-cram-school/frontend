interface Spreadsheet {
  label: string;
  value: string;
}

const dummySheets: Spreadsheet[] = [
  { label: "スプレッドシート1", value: "1" },
  { label: "プロジェクト計画", value: "2" },
  { label: "予算管理表", value: "3" },
  { label: "会議の議事録", value: "4" },
  { label: "顧客リスト", value: "5" },
];

export default dummySheets;
