import { dirname } from "path";
import { writeFile, readFile } from "fs/promises";
import { fileURLToPath } from "url";

const args = Object.fromEntries(
  process.argv.slice(2).map((arg) => arg.split("="))
);

const new_report = {
  id: Number(args.id),
  committedBy: args.by,
  branch: args.branch,
  commitHash: args.hash,
  time: args.time.replace("report-", ""),
};

const __dirname = dirname(fileURLToPath(import.meta.url));
const reportsPath = `${__dirname}/reports.json`;

const file = await readFile(reportsPath, "utf-8");
const parsed = JSON.parse(file);

parsed.reports.unshift(new_report);

await writeFile(reportsPath, JSON.stringify(parsed, null, 2));
