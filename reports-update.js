import { dirname } from "path";
import { writeFile, readFile } from "fs/promises";

const [_, __, id, committedBy, branch, commitHash, time] = process.argv;

const new_report = {
  id: Number(id),
  committedBy,
  branch,
  commitHash,
  time,
};

const __dirname = dirname(fileURLToPath(import.meta.url));
const reportsPath = `${__dirname}/reports.json`;

const file = await readFile(reportsPath, "utf-8");
const parsed = JSON.parse(file);

// insert the new report at the beginning of the reports array
parsed.reports.unshift(new_report);

await writeFile(reportsPath, JSON.stringify(parsed, null, 2));
