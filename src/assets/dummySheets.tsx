interface Spreadsheet {
  name: string;
  id: string;
}

const dummySheets: Spreadsheet[] = [
  { name: "スプレッドシート1", id: "1" },
  { name: "プロジェクト計画", id: "2" },
  { name: "予算管理表", id: "3" },
  { name: "会議の議事録", id: "4" },
  { name: "顧客リスト", id: "5" },
];

export default dummySheets;
