import { dirname } from "path";
import { writeFile, readFile } from "fs/promises";
import { fileURLToPath } from "url";

const [_, __, id, committedBy, branch, commitHash, reportDir] = process.argv;

const timestamp = reportDir
  ?.replace("report-", "")
  .replace(/-/g, ":")
  .replace(/T(\d+):(\d+):(\d+)Z/, "T$1:$2:$3Z");

const new_report = {
  id: Number(id),
  committedBy,
  branch,
  commitHash,
  time: timestamp,
};

const __dirname = dirname(fileURLToPath(import.meta.url));
const reportsPath = `${__dirname}/reports.json`;

const file = await readFile(reportsPath, "utf-8");
const parsed = JSON.parse(file);

parsed.reports.unshift(new_report);

await writeFile(reportsPath, JSON.stringify(parsed, null, 2));
