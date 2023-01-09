import exportFromJSON from "export-from-json";

// Using the export-from-json library we convert the json object to the CSV file
export function printExcel(answers) {
  const data = answers;
  const fileName = "answers_exportExcel";
  const exportType = exportFromJSON.types.csv;
  exportFromJSON({ data, fileName, exportType });
}

// Using the export-from-json library we convert the json object to the JSON file
export function printJson(answers) {
  const data = answers;
  const fileName = "answers_exportJSON";
  const exportType = exportFromJSON.types.json;
  exportFromJSON({ data, fileName, exportType });
}
