import PublicGoogleSheetsParser from "public-google-sheets-parser";

const fetchData = async () => {
  const spreadsheetId = "16ymFli8Nh9rO9MYM0jUcjzHIYIZLGBlZ";
  const parser = new PublicGoogleSheetsParser();
  const items = await parser.parse(spreadsheetId);
  return items;
};

export default fetchData;
